import { getBrevoListIds, sendCalculatorResultEmail, upsertBrevoContact } from '../_lib/brevo.js'
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

function cleanInterests(interests) {
  if (!Array.isArray(interests)) return []
  return interests
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .slice(0, 12)
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
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

  const calculatorType = String(body.calculatorType || '').trim()
  if (!ALLOWED_CALCULATORS.has(calculatorType)) {
    return sendJson(res, 400, { ok: false, error: 'Invalid calculator type.' })
  }

  if (!isPlainObject(body.resultData) || Object.keys(body.resultData).length === 0) {
    return sendJson(res, 400, { ok: false, error: 'Missing result data.' })
  }

  const interests = cleanInterests(body.interests)
  const analyticsConsent = Boolean(body.consentAnalytics)
  const marketingConsent = Boolean(body.consentMarketing)
  const sourcePage = String(body.sourcePage || '').slice(0, 300)
  const sourceComponent = String(body.sourceComponent || '').slice(0, 120)
  const dogName = String(body.dogName || '').slice(0, 120)

  try {
    const saved = await insertCalculatorResult({
      email,
      dog_name: dogName || null,
      calculator_type: calculatorType,
      input_data: isPlainObject(body.inputData) ? body.inputData : {},
      result_data: body.resultData,
      source_page: sourcePage,
      source_component: sourceComponent,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
    })

    await insertConsentEvent({
      email,
      source_page: sourcePage,
      source_component: sourceComponent,
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
      consent_text: CONSENT_TEXT,
      consent_version: CONSENT_VERSION,
    })

    const siteUrl = process.env.SITE_URL || 'https://resources.pawzzles.co.uk'
    const resultUrl = `${siteUrl.replace(/\/$/, '')}/results/${saved.public_token}`

    await sendCalculatorResultEmail({
      email,
      dogName,
      calculatorType,
      resultData: body.resultData,
      resultUrl,
    })

    if (marketingConsent) {
      try {
        const listIds = getBrevoListIds({
          interests,
          includeMarketing: true,
          includeCalculator: true,
        })
        await upsertBrevoContact({ email, listIds })
      } catch (marketingError) {
        console.error('Brevo marketing sync failed after result email', marketingError)
      }
    }

    return sendJson(res, 200, { ok: true, resultUrl })
  } catch (error) {
    console.error('Calculator result email failed', error)
    return sendJson(res, 500, {
      ok: false,
      error: 'Could not email your result. Please try again.',
    })
  }
}
