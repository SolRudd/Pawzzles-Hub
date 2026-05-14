const BREVO_API_BASE = 'https://api.brevo.com/v3'

function getApiKey() {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) throw new Error('Brevo is not configured.')
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

export function getBrevoListIds({ interests = [], includeMarketing = false, includeCalculator = false } = {}) {
  const interestSet = new Set(interests)
  const listIds = []

  if (includeMarketing) listIds.push(process.env.BREVO_MARKETING_LIST_ID)
  if (includeCalculator) listIds.push(process.env.BREVO_CALCULATOR_USERS_LIST_ID)

  if (
    interestSet.has('feeding') ||
    interestSet.has('slow_feeders') ||
    interestSet.has('mealtime_routines')
  ) {
    listIds.push(process.env.BREVO_FEEDING_LIST_ID)
  }

  if (interestSet.has('enrichment') || interestSet.has('toy_safety')) {
    listIds.push(process.env.BREVO_ENRICHMENT_LIST_ID)
  }

  if (interestSet.has('puppy') || interestSet.has('training')) {
    listIds.push(process.env.BREVO_PUPPY_LIST_ID)
  }

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
    throw new Error(`Brevo request failed: ${response.status} ${body}`)
  }

  if (response.status === 204) return null
  return response.json().catch(() => null)
}

export async function upsertBrevoContact({ email, listIds = [] }) {
  return brevoRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      email,
      listIds: uniqueListIds(listIds),
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

function formatResultRows(resultData = {}) {
  return Object.entries(resultData)
    .filter(([, value]) => value !== null && value !== undefined && typeof value !== 'object')
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #f0e3d6;color:#5b6577;">${escapeHtml(
          key.replace(/_/g, ' '),
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #f0e3d6;color:#142033;font-weight:700;">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join('')
}

export function buildFallbackResultEmail({
  dogName,
  calculatorType,
  resultData,
  resultUrl,
}) {
  const title =
    calculatorType === 'enrichment_finder'
      ? 'Your Pawzzles enrichment plan'
      : 'Your Pawzzles feeding result'
  const nameLine = dogName ? ` for ${escapeHtml(dogName)}` : ''
  const rows = formatResultRows(resultData)

  return `
    <div style="font-family:Arial,sans-serif;background:#fff8ef;padding:24px;color:#142033;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:24px;padding:28px;border:1px solid #f3dac4;">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.1;color:#142033;">${title}${nameLine}</h1>
        <p style="margin:0 0 20px;color:#5b6577;">Here is your saved Pawzzles result. Keep it handy as general guidance for everyday routines.</p>
        <table style="width:100%;border-collapse:collapse;margin:18px 0;">${rows}</table>
        <p style="margin:24px 0;">
          <a href="${escapeHtml(resultUrl)}" style="display:inline-block;background:#f58232;color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:700;">View saved result</a>
        </p>
        <p style="font-size:13px;line-height:1.5;color:#5b6577;">General guidance only. Always supervise dogs with new toys or feeding products.</p>
      </div>
    </div>
  `
}

export async function sendCalculatorResultEmail({
  email,
  dogName,
  calculatorType,
  resultData,
  resultUrl,
}) {
  const templateId = parseListId(process.env.BREVO_RESULT_TEMPLATE_ID)
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'hello@pawzzles.co.uk'
  const senderName = process.env.BREVO_SENDER_NAME || 'Pawzzles'

  const body = templateId
    ? {
        sender: { name: senderName, email: senderEmail },
        to: [{ email }],
        templateId,
        params: {
          dogName,
          calculatorType,
          resultData,
          resultUrl,
        },
      }
    : {
        sender: { name: senderName, email: senderEmail },
        to: [{ email }],
        subject:
          calculatorType === 'enrichment_finder'
            ? 'Your Pawzzles enrichment plan'
            : 'Your Pawzzles feeding result',
        htmlContent: buildFallbackResultEmail({
          dogName,
          calculatorType,
          resultData,
          resultUrl,
        }),
      }

  return brevoRequest('/smtp/email', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
