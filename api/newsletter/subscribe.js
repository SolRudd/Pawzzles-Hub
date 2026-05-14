import { getBrevoListIds, upsertBrevoContact } from '../_lib/brevo.js'
import {
  insertConsentEvent,
  insertNewsletterSignup,
  validateSupabaseEnv,
} from '../_lib/supabase.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CONSENT_VERSION = 'resource-hub-forms-v1'
const CONSENT_TEXT =
  'By submitting, you agree we can email this to you. Marketing emails are only sent if you opt in.'

function newsletterProviderIsBrevo() {
  const provider = String(process.env.NEWSLETTER_PROVIDER || 'brevo').trim().toLowerCase()
  return provider === 'brevo'
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function logSubscribeError(step, error) {
  console.error('Newsletter subscribe error', {
    step,
    message: error?.message,
    status: error?.status || error?.code,
    details: error?.details,
    hint: error?.hint,
  })
}

async function readBody(req) {
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8') || '{}')
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}')

  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  return raw ? JSON.parse(raw) : {}
}

function cleanInterests(interests) {
  if (!Array.isArray(interests)) return []
  return interests
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .slice(0, 12)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  let body
  try {
    body = await readBody(req)
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid request body.' })
  }

  const email = String(body.email || '').trim().toLowerCase()
  if (!email || !EMAIL_PATTERN.test(email)) {
    return sendJson(res, 400, { ok: false, error: 'Please enter a valid email address.' })
  }

  const interests = cleanInterests(body.interests)
  const analyticsConsent = Boolean(body.consentAnalytics)
  const marketingConsent = Boolean(body.consentMarketing)
  const sourcePage = String(body.sourcePage || '').slice(0, 300) || null
  const sourceComponent = String(body.sourceComponent || '').slice(0, 120) || null

  let step = 'supabase_env'
  try {
    validateSupabaseEnv()
  } catch (error) {
    logSubscribeError(step, error)
    return sendJson(res, 500, {
      ok: false,
      error: 'We could not save your signup just now. Please try again.',
    })
  }

  step = 'supabase_newsletter_signup'
  try {
    await insertNewsletterSignup({
      email,
      source_page: sourcePage,
      source_component: sourceComponent,
      interests,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
    })
  } catch (error) {
    logSubscribeError(step, error)
    return sendJson(res, 500, {
      ok: false,
      error: 'We could not save your signup just now. Please try again.',
    })
  }

  step = 'supabase_consent_event'
  try {
    await insertConsentEvent({
      email,
      source_page: sourcePage,
      source_component: sourceComponent,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
      consent_text: CONSENT_TEXT,
      consent_version: CONSENT_VERSION,
    })
  } catch (error) {
    logSubscribeError(step, error)
  }

  let marketingWarning = false

  if (marketingConsent) {
    if (!newsletterProviderIsBrevo()) {
      const error = new Error('Newsletter provider is not configured.')
      error.status = 500
      logSubscribeError('brevo_provider', error)
      marketingWarning = true
    } else {
      step = 'brevo_contact_sync'
      try {
        const listIds = getBrevoListIds({ includeMarketing: true })
        await upsertBrevoContact({ email, listIds })
      } catch (error) {
        logSubscribeError(step, error)
        marketingWarning = true
      }
    }
  }

  if (marketingWarning) {
    return sendJson(res, 200, { ok: true, warning: 'Saved, but marketing sync failed.' })
  }

  return sendJson(res, 200, { ok: true })
}
