import { addOrUpdateMarketingContact, sendCalculatorResultEmail } from '../_lib/brevo.js'
import { insertCalculatorResult, insertConsentEvent, updateCalculatorResult } from '../_lib/supabase.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const ALLOWED_CALCULATORS = new Set(['dog_feeding', 'enrichment_finder'])
const CONSENT_VERSION = 'pawzzles-consent-v1'
const CONSENT_METHOD = 'checkbox'
const CONSENT_TEXT =
  'I agree to Pawzzles emailing this result to me and understand my details will be handled in line with the Privacy Policy and Terms.'
const MARKETING_CONSENT_TEXT = 'Yes, send me Pawzzles tips, guides and product updates.'
const PRIVACY_URL = process.env.PRIVACY_URL || 'https://pawzzles.co.uk/privacy-policy'
const TERMS_URL = process.env.TERMS_URL || 'https://pawzzles.co.uk/terms-and-conditions'

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

function cleanTimestamp(value) {
  const date = new Date(value || Date.now())
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString()
}

function getClientIp(req) {
  const forwardedFor = String(req.headers['x-forwarded-for'] || '')
  if (forwardedFor) return forwardedFor.split(',')[0].trim().slice(0, 120)
  return String(req.headers['x-real-ip'] || req.socket?.remoteAddress || '').slice(0, 120) || null
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
  const privacyAccepted = Boolean(body.privacyAccepted)
  const termsAccepted = Boolean(body.termsAccepted)
  const resultEmailConsent = Boolean(body.resultEmailConsent)
  const sourcePage = String(body.sourcePage || '').slice(0, 300)
  const sourceComponent = String(body.sourceComponent || '').slice(0, 120)
  const dogName = String(body.dogName || '').slice(0, 120)
  const interests = cleanInterests(body.interests)
  const consentText = cleanText(body.consentText, CONSENT_TEXT)
  const marketingConsentText = cleanText(body.marketingConsentText, MARKETING_CONSENT_TEXT)
  const consentVersion = cleanText(body.consentVersion, CONSENT_VERSION, 120)
  const consentMethod = cleanText(body.consentMethod, CONSENT_METHOD, 60)
  const privacyUrl = cleanText(body.privacyUrl, PRIVACY_URL, 300)
  const termsUrl = cleanText(body.termsUrl, TERMS_URL, 300)
  const submittedAt = cleanTimestamp(body.timestamp)
  const userAgent = String(req.headers['user-agent'] || '').slice(0, 500) || null
  const ipAddress = getClientIp(req)
  const dogGender = cleanDogGender(body.dogGender || body.inputData?.dogGender)
  const inputData = isPlainObject(body.inputData)
    ? {
        ...body.inputData,
        ...(dogGender ? { dogGender } : {}),
      }
    : dogGender
      ? { dogGender }
      : {}

  if (!resultEmailConsent) {
    return sendJson(res, 400, {
      ok: false,
      error: 'Please confirm you are happy for us to email this result to you.',
    })
  }

  if (!privacyAccepted || !termsAccepted) {
    return sendJson(res, 400, {
      ok: false,
      error: 'Please confirm you are happy for us to email this result to you.',
    })
  }

  let saved
  try {
    step = 'supabase_insert'
    saved = await insertCalculatorResult({
      email,
      dog_name: dogName || null,
      dog_gender: dogGender || null,
      calculator_type: calculatorType,
      input_data: inputData,
      result_data: body.resultData,
      source_page: sourcePage,
      source_component: sourceComponent,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
      privacy_accepted: privacyAccepted,
      terms_accepted: termsAccepted,
      result_email_consent: resultEmailConsent,
      consent_text: consentText,
      marketing_consent_text: marketingConsent ? marketingConsentText : null,
      consent_version: consentVersion,
      consent_method: consentMethod,
      privacy_url: privacyUrl,
      terms_url: termsUrl,
      user_agent: userAgent,
      ip_address: ipAddress,
      submitted_at: submittedAt,
      brevo_marketing_synced: false,
      result_email_sent: false,
    })

    step = 'supabase_consent_event'
    await insertConsentEvent({
      email,
      source_page: sourcePage,
      source_component: sourceComponent,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
      privacy_accepted: privacyAccepted,
      terms_accepted: termsAccepted,
      result_email_consent: resultEmailConsent,
      consent_text: consentText,
      marketing_consent_text: marketingConsent ? marketingConsentText : null,
      consent_version: consentVersion,
      consent_method: consentMethod,
      privacy_url: privacyUrl,
      terms_url: termsUrl,
      user_agent: userAgent,
      ip_address: ipAddress,
      submitted_at: submittedAt,
    })

    const siteUrl = process.env.SITE_URL || 'https://resources.pawzzles.co.uk'
    const resultUrl = `${siteUrl.replace(/\/$/, '')}/results/${saved.public_token}`

    step = 'brevo_send_email'
    try {
      await sendCalculatorResultEmail({
        email,
        dogName,
        calculatorType,
        resultData: body.resultData,
        resultUrl,
        marketingConsent,
      })
      await updateCalculatorResult(saved.id, {
        result_email_sent: true,
        result_email_error: null,
      })
    } catch (emailError) {
      logResultEmailError(step, emailError)
      try {
        await updateCalculatorResult(saved.id, {
          result_email_sent: false,
          result_email_error: String(emailError?.message || 'Result email failed.').slice(0, 1000),
        })
      } catch (updateError) {
        logResultEmailError('supabase_result_email_status', updateError)
      }
      return sendJson(res, 500, {
        ok: false,
        error: 'Could not email your result. Please try again.',
      })
    }

    if (marketingConsent) {
      step = 'brevo_marketing_sync'
      try {
        await addOrUpdateMarketingContact({
          email,
          interests,
          includeCalculatorUsers: true,
        })
        await updateCalculatorResult(saved.id, {
          brevo_marketing_synced: true,
          brevo_marketing_error: null,
        })
      } catch (syncError) {
        logResultEmailError(step, syncError)
        try {
          await updateCalculatorResult(saved.id, {
            brevo_marketing_synced: false,
            brevo_marketing_error: String(syncError?.message || 'Brevo marketing sync failed.').slice(0, 1000),
          })
        } catch (updateError) {
          logResultEmailError('supabase_brevo_marketing_status', updateError)
        }
      }
    }

    step = 'response'
    return sendJson(res, 200, { ok: true, resultUrl })
  } catch (error) {
    logResultEmailError(step, error)
    return sendJson(res, 500, {
      ok: false,
      error: 'Could not email your result. Please try again.',
    })
  }
}
