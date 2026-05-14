const BREVO_API_BASE = 'https://api.brevo.com/v3'

function getApiKey() {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    const error = new Error('Brevo is not configured.')
    error.status = 500
    throw error
  }
  return apiKey
}

function parseListId(value) {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function uniqueListIds(listIds) {
  return [...new Set(listIds.map(parseListId).filter(Boolean))]
}

export function getBrevoListIds({ includeMarketing = false } = {}) {
  const listIds = []

  if (includeMarketing) listIds.push(process.env.BREVO_MARKETING_LIST_ID || 8)

  return uniqueListIds(listIds)
}

async function brevoRequest(path, options = {}) {
  const response = await fetch(`${BREVO_API_BASE}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': getApiKey(),
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const body = await response.text()
    const error = new Error(`Brevo request failed: ${response.status} ${body}`)
    error.status = response.status
    throw error
  }

  if (response.status === 204) return null
  return response.json().catch(() => null)
}

export async function upsertBrevoContact({ email, listIds = [] }) {
  const cleanListIds = uniqueListIds(listIds)

  if (cleanListIds.length === 0) {
    const error = new Error('Brevo marketing list is not configured.')
    error.status = 500
    throw error
  }

  return brevoRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      email,
      listIds: cleanListIds,
      updateEnabled: true,
    }),
  })
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildFallbackResultEmail() {
  const shopUrl = process.env.SHOP_URL || 'https://pawzzles.co.uk'

  return `
    <div style="font-family:Arial,sans-serif;background:#fff8ef;padding:24px;color:#142033;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:24px;padding:28px;border:1px solid #f3dac4;">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.1;color:#142033;">Your Pawzzles result is ready</h1>
        <p style="margin:0 0 20px;color:#5b6577;">Thanks for using the Pawzzles Resource Hub. Your result has been created and saved securely by Pawzzles.</p>
        <p style="margin:24px 0;">
          <a href="${escapeHtml(shopUrl)}" style="display:inline-block;background:#f58232;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:700;">Visit Pawzzles</a>
        </p>
        <p style="font-size:13px;line-height:1.5;color:#5b6577;">General guidance only. Always supervise dogs with new toys or feeding products.</p>
      </div>
    </div>
  `
}

export async function sendCalculatorResultEmail({
  email,
}) {
  const templateId = parseListId(process.env.BREVO_RESULT_TEMPLATE_ID)
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'hello@pawzzles.co.uk'
  const senderName = process.env.BREVO_SENDER_NAME || 'Pawzzles'
  const shopUrl = process.env.SHOP_URL || 'https://pawzzles.co.uk'

  const body = templateId
    ? {
        sender: { name: senderName, email: senderEmail },
        to: [{ email }],
        templateId,
        params: {
          shopUrl,
        },
      }
    : {
        sender: { name: senderName, email: senderEmail },
        to: [{ email }],
        subject: 'Your Pawzzles result is ready',
        htmlContent: buildFallbackResultEmail(),
      }

  return brevoRequest('/smtp/email', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
