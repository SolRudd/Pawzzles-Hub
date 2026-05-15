import { addOrUpdateContact, sendCalculatorResultEmail } from '../_lib/brevo.js'
import { insertCalculatorResult, insertConsentEvent } from '../_lib/supabase.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ALLOWED_CALCULATORS = new Set(['dog_feeding', 'enrichment_finder'])
const CONSENT_VERSION = 'resource-hub-forms-v1'
const CONSENT_TEXT =
  'By submitting, you agree we can email this to you. Marketing emails are only sent if you opt in.'

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
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

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
}

function cleanDogGender(value) {
  const gender = String(value || '').trim().toLowerCase()
  return ['female', 'male', 'unknown', 'prefer_not_to_say'].includes(gender) ? gender : ''
}

function logResultEmailError(step, error) {
  console.error('Calculator result email failed', {
    step,
    message: error?.message,
    status: error?.status || error?.code,
    details: error?.details,
    hint: error?.hint,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  let step = 'start'
  let body

  try {
    step = 'parse_body'
    body = await readBody(req)
  } catch (error) {
    logResultEmailError(step, error)
    return sendJson(res, 400, { ok: false, error: 'Invalid request body.' })
  }

  step = 'validate_email'
  const email = String(body.email || '').trim().toLowerCase()
  if (!email || !EMAIL_PATTERN.test(email)) {
    return sendJson(res, 400, { ok: false, error: 'Please enter a valid email address.' })
  }

  step = 'validate_result'
  const calculatorType = String(body.calculatorType || '').trim()
  if (!ALLOWED_CALCULATORS.has(calculatorType)) {
    return sendJson(res, 400, { ok: false, error: 'Invalid calculator type.' })
  }

  if (!isPlainObject(body.resultData) || Object.keys(body.resultData).length === 0) {
    return sendJson(res, 400, { ok: false, error: 'Missing result data.' })
  }

  const analyticsConsent = Boolean(body.consentAnalytics)
  const marketingConsent = Boolean(body.consentMarketing)
  const sourcePage = String(body.sourcePage || '').slice(0, 300)
  const sourceComponent = String(body.sourceComponent || '').slice(0, 120)
  const dogName = String(body.dogName || '').slice(0, 120)
  const dogGender = cleanDogGender(body.dogGender || body.inputData?.dogGender)
  const inputData = isPlainObject(body.inputData)
    ? {
        ...body.inputData,
        ...(dogGender ? { dogGender } : {}),
      }
    : dogGender
      ? { dogGender }
      : {}

  try {
    step = 'supabase_insert'
    const saved = await insertCalculatorResult({
      email,
      dog_name: dogName || null,
      calculator_type: calculatorType,
      input_data: inputData,
      result_data: body.resultData,
      source_page: sourcePage,
      source_component: sourceComponent,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
    })

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
    } catch (consentError) {
      logResultEmailError(step, consentError)
    }

    const siteUrl = process.env.SITE_URL || 'https://resources.pawzzles.co.uk'
    const resultUrl = `${siteUrl.replace(/\/$/, '')}/results/${saved.public_token}`

    step = 'brevo_send_email'
    await sendCalculatorResultEmail({
      email,
      dogName,
      calculatorType,
      resultData: body.resultData,
      resultUrl,
      marketingConsent,
    })

    let warning
    step = 'brevo_contact_sync'
    try {
      await addOrUpdateContact(email)
    } catch (syncError) {
      logResultEmailError(step, syncError)
      warning = 'Saved and emailed, but Brevo sync failed.'
    }

    step = 'response'
    return sendJson(res, 200, warning ? { ok: true, resultUrl, warning } : { ok: true, resultUrl })
  } catch (error) {
    logResultEmailError(step, error)
    return sendJson(res, 500, {
      ok: false,
      error: 'Could not email your result. Please try again.',
    })
  }
}
