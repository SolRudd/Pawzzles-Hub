import {
  addOrUpdateMarketingContact,
  getBrevoMarketingListId,
  sendNewsletterWelcomeEmail,
} from '../_lib/brevo.js'
import {
  insertConsentEvent,
  insertNewsletterSignup,
  updateNewsletterSignup,
  validateSupabaseEnv,
} from '../_lib/supabase.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CONSENT_VERSION = 'pawzzles-consent-v1'
const CONSENT_METHOD = 'checkbox'
const CONSENT_TEXT =
  'Yes, send me Pawzzles tips, guides and product updates. I agree to the Privacy Policy and Terms.'
const PRIVACY_URL = process.env.PRIVACY_URL || 'https://pawzzles.co.uk/privacy-policy'
const TERMS_URL = process.env.TERMS_URL || 'https://pawzzles.co.uk/terms-and-conditions'

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

function logBrevoSyncStatus({
  consentMarketing,
  privacyAccepted,
  termsAccepted,
  brevoSyncAttempted = false,
  brevoSyncSuccess = false,
} = {}) {
  console.info('Newsletter Brevo sync status', {
    provider: process.env.NEWSLETTER_PROVIDER || 'brevo',
    hasBrevoKey: Boolean(process.env.BREVO_API_KEY),
    marketingListId: getBrevoMarketingListId(),
    consentMarketing,
    privacyAccepted,
    termsAccepted,
    brevoSyncAttempted,
    brevoSyncSuccess,
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

function cleanText(value, fallback, maxLength = 500) {
  return String(value || fallback || '').slice(0, maxLength)
}

function getClientIp(req) {
  const forwardedFor = String(req.headers['x-forwarded-for'] || '')
  if (forwardedFor) return forwardedFor.split(',')[0].trim().slice(0, 120)
  return String(req.headers['x-real-ip'] || req.socket?.remoteAddress || '').slice(0, 120) || null
}

function cleanTimestamp(value) {
  const date = new Date(value || Date.now())
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
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
  const privacyAccepted = Boolean(body.privacyAccepted)
  const termsAccepted = Boolean(body.termsAccepted)
  const sourcePage = String(body.sourcePage || '').slice(0, 300) || null
  const sourceComponent = String(body.sourceComponent || '').slice(0, 120) || null
  const consentText = cleanText(body.consentText, CONSENT_TEXT)
  const consentVersion = cleanText(body.consentVersion, CONSENT_VERSION, 120)
  const consentMethod = cleanText(body.consentMethod, CONSENT_METHOD, 60)
  const privacyUrl = cleanText(body.privacyUrl, PRIVACY_URL, 300)
  const termsUrl = cleanText(body.termsUrl, TERMS_URL, 300)
  const submittedAt = cleanTimestamp(body.timestamp)
  const userAgent = String(req.headers['user-agent'] || '').slice(0, 500) || null
  const ipAddress = getClientIp(req)

  if (!marketingConsent) {
    logBrevoSyncStatus({ consentMarketing: false, privacyAccepted, termsAccepted })
    return sendJson(res, 400, {
      ok: false,
      error: 'Please tick the box so we can send you Pawzzles emails.',
    })
  }

  if (!privacyAccepted || !termsAccepted) {
    logBrevoSyncStatus({ consentMarketing: marketingConsent, privacyAccepted, termsAccepted })
    return sendJson(res, 400, {
      ok: false,
      error: 'Please tick the box so we can send you Pawzzles emails.',
    })
  }

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

  let signup
  step = 'supabase_newsletter_signup'
  try {
    signup = await insertNewsletterSignup({
      email,
      source_page: sourcePage,
      source_component: sourceComponent,
      interests,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
      privacy_accepted: privacyAccepted,
      terms_accepted: termsAccepted,
      consent_text: consentText,
      consent_version: consentVersion,
      consent_method: consentMethod,
      privacy_url: privacyUrl,
      terms_url: termsUrl,
      user_agent: userAgent,
      ip_address: ipAddress,
      submitted_at: submittedAt,
      brevo_synced: false,
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
      privacy_accepted: privacyAccepted,
      terms_accepted: termsAccepted,
      result_email_consent: false,
      consent_text: consentText,
      consent_version: consentVersion,
      consent_method: consentMethod,
      privacy_url: privacyUrl,
      terms_url: termsUrl,
      user_agent: userAgent,
      ip_address: ipAddress,
      submitted_at: submittedAt,
    })
  } catch (error) {
    logSubscribeError(step, error)
    return sendJson(res, 500, {
      ok: false,
      error: 'We could not save your signup just now. Please try again.',
    })
  }

  step = 'brevo_contact_sync'
  logBrevoSyncStatus({
    consentMarketing: marketingConsent,
    privacyAccepted,
    termsAccepted,
    brevoSyncAttempted: true,
    brevoSyncSuccess: false,
  })

  try {
    await addOrUpdateMarketingContact({ email, interests })
    await sendNewsletterWelcomeEmail({ email, interests })
    await updateNewsletterSignup(signup?.id, {
      brevo_synced: true,
      brevo_sync_error: null,
    })
    logBrevoSyncStatus({
      consentMarketing: marketingConsent,
      privacyAccepted,
      termsAccepted,
      brevoSyncAttempted: true,
      brevoSyncSuccess: true,
    })
  } catch (error) {
    logSubscribeError(step, error)
    try {
      await updateNewsletterSignup(signup?.id, {
        brevo_synced: false,
        brevo_sync_error: String(error?.message || 'Brevo sync failed.').slice(0, 1000),
      })
    } catch (updateError) {
      logSubscribeError('supabase_newsletter_brevo_status', updateError)
    }
    return sendJson(res, 502, {
      ok: false,
      error: 'We could not complete your signup just yet. Please try again.',
    })
  }

  return sendJson(res, 200, { ok: true })
}
