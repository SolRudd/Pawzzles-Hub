const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    .slice(0, 10)
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

  const provider = process.env.NEWSLETTER_PROVIDER || 'sendgrid'
  if (provider !== 'sendgrid') {
    return sendJson(res, 500, { ok: false, error: 'Newsletter signup is not configured.' })
  }

  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    return sendJson(res, 500, { ok: false, error: 'Newsletter signup is not configured.' })
  }

  const contact = { email }
  const customFields = {}
  const source = [body.sourcePage, body.sourceComponent]
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .join(' | ')
  const interests = cleanInterests(body.interests)

  if (process.env.SENDGRID_CUSTOM_FIELD_SOURCE && source) {
    customFields[process.env.SENDGRID_CUSTOM_FIELD_SOURCE] = source
  }

  if (process.env.SENDGRID_CUSTOM_FIELD_INTERESTS && interests.length > 0) {
    customFields[process.env.SENDGRID_CUSTOM_FIELD_INTERESTS] = interests.join(', ')
  }

  if (Object.keys(customFields).length > 0) {
    contact.custom_fields = customFields
  }

  const payload = {
    contacts: [contact],
  }

  if (process.env.SENDGRID_MARKETING_LIST_ID) {
    payload.list_ids = [process.env.SENDGRID_MARKETING_LIST_ID]
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const responseText = await response.text()
      console.error('SendGrid newsletter signup failed', response.status, responseText)
      return sendJson(res, 502, {
        ok: false,
        error: 'Could not save newsletter signup. Please try again.',
      })
    }

    return sendJson(res, 200, { ok: true })
  } catch (error) {
    console.error('Newsletter signup request failed', error)
    return sendJson(res, 502, {
      ok: false,
      error: 'Could not save newsletter signup. Please try again.',
    })
  }
}
