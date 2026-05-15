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

export function parseListId(value) {
  if (!value) return null
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function uniqueListIds(listIds) {
  return [...new Set(listIds.map(parseListId).filter(Boolean))]
}

export function getBrevoMarketingListId() {
  return parseListId(process.env.BREVO_MARKETING_LIST_ID || 8)
}

function getInterestListIds(interests = []) {
  const normalised = new Set(
    (Array.isArray(interests) ? interests : [])
      .map((item) => String(item || '').trim().toLowerCase())
      .filter(Boolean),
  )
  const listIds = []

  if (
    normalised.has('feeding') ||
    normalised.has('mealtime_routines') ||
    normalised.has('slow_feeders')
  ) {
    listIds.push(process.env.BREVO_FEEDING_LIST_ID)
  }

  if (
    normalised.has('enrichment') ||
    normalised.has('toy_safety') ||
    normalised.has('play')
  ) {
    listIds.push(process.env.BREVO_ENRICHMENT_LIST_ID)
  }

  if (normalised.has('puppy') || normalised.has('training')) {
    listIds.push(process.env.BREVO_PUPPY_LIST_ID)
  }

  if (normalised.has('calculator_users')) {
    listIds.push(process.env.BREVO_CALCULATOR_USERS_LIST_ID)
  }

  return uniqueListIds(listIds)
}

export function getBrevoListIds({
  includeMarketing = false,
  includeCalculatorUsers = false,
  interests = [],
} = {}) {
  const listIds = []

  if (includeMarketing) listIds.push(getBrevoMarketingListId())
  if (includeCalculatorUsers) listIds.push(process.env.BREVO_CALCULATOR_USERS_LIST_ID)
  listIds.push(...getInterestListIds(interests))

  return uniqueListIds(listIds)
}

export function getBrevoMarketingListIds(options = {}) {
  return getBrevoListIds({ includeMarketing: true, ...options })
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

export async function upsertBrevoContact({ email, listIds = [], attributes = {} }) {
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
      attributes,
      updateEnabled: true,
    }),
  })
}

export async function addOrUpdateMarketingContact({
  email,
  interests = [],
  includeCalculatorUsers = false,
  attributes = {},
} = {}) {
  const cleanEmail = String(email || '').trim().toLowerCase()
  const listIds = getBrevoMarketingListIds({ interests, includeCalculatorUsers })

  if (!cleanEmail) {
    const error = new Error('Brevo contact email is required.')
    error.status = 400
    throw error
  }

  return upsertBrevoContact({ email: cleanEmail, listIds, attributes })
}

export async function addOrUpdateContact(email) {
  return addOrUpdateMarketingContact({ email })
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_TYPES = {
  CALCULATOR_RESULT: 'calculator_result',
  NEWSLETTER_WELCOME: 'newsletter_welcome',
  RESOURCE_GUIDE: 'resource_guide',
  CHECKLIST: 'checklist',
}

function getSiteUrl() {
  return (process.env.SITE_URL || 'https://resources.pawzzles.co.uk').replace(/\/$/, '')
}

function getShopUrl() {
  return process.env.SHOP_URL || 'https://pawzzles.co.uk'
}

function getPrivacyUrl() {
  return process.env.PRIVACY_URL || 'https://pawzzles.co.uk/privacy-policy'
}

function getTermsUrl() {
  return process.env.TERMS_URL || 'https://pawzzles.co.uk/terms-and-conditions'
}

function getSender() {
  return {
    email: process.env.BREVO_SENDER_EMAIL || 'hello@pawzzles.co.uk',
    name: process.env.BREVO_SENDER_NAME || 'Pawzzles',
  }
}

function getCalculatorEmailMeta(calculatorType) {
  if (calculatorType === 'enrichment_finder') {
    return {
      title: 'Enrichment Plan',
      subject: 'Your Pawzzles enrichment plan',
      intro:
        "Thanks for using the Pawzzles Enrichment Finder. Here is a simple plan to help you choose activities that fit your dog's routine.",
      accent: '#138fa1',
    }
  }

  return {
    title: 'Dog Feeding Result',
    subject: 'Your Pawzzles feeding result',
    intro:
      'Thanks for using the Pawzzles Feeding Calculator. Here is your general guide based on the details you entered.',
    accent: '#f58232',
  }
}

function cleanValue(value) {
  if (value === null || value === undefined || value === '') return ''
  return String(value)
}

function formatList(items = []) {
  return Array.isArray(items)
    ? items.map(cleanValue).filter(Boolean).slice(0, 6)
    : []
}

export function formatCalculatorResultSummary({ calculatorType, resultData = {} } = {}) {
  if (calculatorType === 'enrichment_finder') {
    const activities = formatList(resultData.ideas)
    const supportIdeas = formatList(resultData.supportIdeas)

    return {
      rows: [
        ['Recommended focus', resultData.primary],
        ['Suggested toy category', resultData.toy],
        ['Routine note', resultData.intensity],
        ['Life stage note', resultData.stageNote],
      ].filter(([, value]) => cleanValue(value)),
      activities,
      supportIdeas,
      reminder: 'Always supervise dogs with new toys, chews and feeding products.',
    }
  }

  return {
    rows: [
      ['Estimated daily calories', resultData.daily ? `${resultData.daily} kcal` : ''],
      ['Estimated grams per day', resultData.grams ? `${resultData.grams} g` : 'Add calories per 100g for this estimate'],
      ['Life stage', resultData.stage],
      ['Activity level', resultData.activity],
      ['Goal', resultData.goal],
    ].filter(([, value]) => cleanValue(value)),
    activities: [],
    supportIdeas: [],
    reminder: 'Check your dog food packaging for calorie information and use this as general guidance only.',
  }
}

function buildSummaryRows(rows = []) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f2dfcf;color:#5d6878;font-size:14px;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #f2dfcf;color:#142033;font-size:14px;font-weight:700;text-align:right;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join('')
}

function buildListItems(items = []) {
  if (items.length === 0) return ''

  return `
    <ul style="margin:10px 0 0;padding:0 0 0 18px;color:#142033;font-size:14px;line-height:1.55;">
      ${items.map((item) => `<li style="margin:0 0 6px;">${escapeHtml(item)}</li>`).join('')}
    </ul>
  `
}

function buildButton(label, href, background = '#f58232') {
  if (!href) return ''

  return `
    <td style="padding:0 8px 10px 0;">
      <a href="${escapeHtml(href)}" style="display:inline-block;background:${background};color:#ffffff;text-decoration:none;border-radius:999px;padding:12px 18px;font-size:14px;font-weight:700;">
        ${escapeHtml(label)}
      </a>
    </td>
  `
}

export function buildResultEmailHtml({
  dogName,
  calculatorType,
  resultData,
  resultUrl,
  marketingConsent = false,
} = {}) {
  const siteUrl = getSiteUrl()
  const shopUrl = getShopUrl()
  const resourcesUrl = `${siteUrl}/resources`
  const privacyUrl = getPrivacyUrl()
  const termsUrl = getTermsUrl()
  const logoUrl = `${siteUrl}/pawzzles-logo.svg`
  const meta = getCalculatorEmailMeta(calculatorType)
  const summary = formatCalculatorResultSummary({ calculatorType, resultData })
  const dogLine = dogName ? `Result for ${escapeHtml(dogName)}` : 'Your Pawzzles result'
  const listHeading =
    calculatorType === 'enrichment_finder'
      ? 'Suggested activities'
      : 'Useful reminder'
  const marketingLine = marketingConsent
    ? 'You can unsubscribe from marketing emails at any time using the link in those emails.'
    : 'Marketing emails are only sent if you opt in.'

  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(meta.subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#fff8ef;color:#142033;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#fff8ef;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #f2dfcf;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#087b86;padding:22px 26px;">
                <img src="${escapeHtml(logoUrl)}" width="138" alt="Pawzzles" style="display:block;max-width:138px;height:auto;border:0;color:#ffffff;font-size:24px;font-weight:700;">
                <p style="margin:12px 0 0;color:#d8f4f7;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;">${escapeHtml(dogLine)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 26px 10px;">
                <h1 style="margin:0;color:#142033;font-size:30px;line-height:1.15;font-weight:800;">${escapeHtml(meta.title)}</h1>
                <p style="margin:14px 0 0;color:#5d6878;font-size:16px;line-height:1.6;">${escapeHtml(meta.intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 26px 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#fff8ef;border:1px solid #f2dfcf;border-radius:18px;">
                  <tr>
                    <td style="padding:20px;">
                      <p style="margin:0 0 8px;color:${meta.accent};font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;">Result summary</p>
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;">
                        ${buildSummaryRows(summary.rows)}
                      </table>
                      <p style="margin:14px 0 0;color:#5d6878;font-size:13px;line-height:1.55;">${escapeHtml(summary.reminder)}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 26px 0;">
                <h2 style="margin:0;color:#142033;font-size:19px;line-height:1.3;">${escapeHtml(listHeading)}</h2>
                ${
                  calculatorType === 'enrichment_finder'
                    ? `${buildListItems(summary.activities)}${summary.supportIdeas.length ? `<p style="margin:14px 0 0;color:#5d6878;font-size:14px;font-weight:700;">Add a little of:</p>${buildListItems(summary.supportIdeas)}` : ''}`
                    : '<p style="margin:10px 0 0;color:#5d6878;font-size:14px;line-height:1.55;">Use the calories per 100g on your dog food packaging for the most useful gram estimate.</p>'
                }
              </td>
            </tr>
            <tr>
              <td style="padding:24px 26px 8px;">
                <p style="margin:0 0 12px;color:#142033;font-size:16px;font-weight:800;">Useful next steps</p>
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    ${buildButton('View saved result', resultUrl, '#138fa1')}
                    ${buildButton('Browse resources', resourcesUrl, '#f58232')}
                    ${buildButton('Visit shop', shopUrl, '#ff7a1a')}
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 26px 28px;">
                <p style="margin:0;color:#5d6878;font-size:12px;line-height:1.6;">General guidance only. Always supervise dogs with new toys or feeding products.</p>
                <p style="margin:10px 0 0;color:#5d6878;font-size:12px;line-height:1.6;">This email was sent because you asked Pawzzles to email your result. ${escapeHtml(marketingLine)}</p>
                <p style="margin:10px 0 0;color:#5d6878;font-size:12px;line-height:1.6;"><a href="${escapeHtml(privacyUrl)}" style="color:#087b86;font-weight:700;">Privacy Policy</a> | <a href="${escapeHtml(termsUrl)}" style="color:#087b86;font-weight:700;">Terms</a></p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;color:#5d6878;font-size:11px;">Pawzzles Resource Hub</p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function buildResultEmailText({
  dogName,
  calculatorType,
  resultData,
  resultUrl,
  marketingConsent = false,
} = {}) {
  const siteUrl = getSiteUrl()
  const shopUrl = getShopUrl()
  const resourcesUrl = `${siteUrl}/resources`
  const privacyUrl = getPrivacyUrl()
  const termsUrl = getTermsUrl()
  const meta = getCalculatorEmailMeta(calculatorType)
  const summary = formatCalculatorResultSummary({ calculatorType, resultData })
  const rows = summary.rows.map(([label, value]) => `${label}: ${value}`).join('\n')
  const activities = [...summary.activities, ...summary.supportIdeas]
    .map((item) => `- ${item}`)
    .join('\n')
  const marketingLine = marketingConsent
    ? 'You can unsubscribe from marketing emails at any time using the link in those emails.'
    : 'Marketing emails are only sent if you opt in.'

  return [
    `Pawzzles ${meta.title}`,
    '',
    dogName ? `Result for ${dogName}` : 'Your Pawzzles result',
    '',
    meta.intro,
    '',
    rows,
    activities ? `\nSuggested activities:\n${activities}` : '',
    '',
    summary.reminder,
    '',
    `View saved result: ${resultUrl || siteUrl}`,
    `Browse resources: ${resourcesUrl}`,
    `Visit shop: ${shopUrl}`,
    '',
    'General guidance only. Always supervise dogs with new toys or feeding products.',
    `This email was sent because you asked Pawzzles to email your result. ${marketingLine}`,
    `Privacy Policy: ${privacyUrl}`,
    `Terms: ${termsUrl}`,
  ]
    .filter(Boolean)
    .join('\n')
}

export function buildFallbackResultEmail(options) {
  return buildResultEmailHtml(options)
}

export function buildNewsletterWelcomeHtml() {
  const siteUrl = getSiteUrl()
  const shopUrl = getShopUrl()
  const privacyUrl = getPrivacyUrl()
  const termsUrl = getTermsUrl()
  const resourcesUrl = `${siteUrl}/resources`
  const logoUrl = `${siteUrl}/pawzzles-logo.svg`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to the Pawzzles Pack</title>
  </head>
  <body style="margin:0;padding:0;background:#fff8ef;color:#142033;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;background:#fff8ef;">
      <tr>
        <td align="center" style="padding:28px 14px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #f2dfcf;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="background:#087b86;padding:22px 26px;">
                <img src="${escapeHtml(logoUrl)}" width="138" alt="Pawzzles" style="display:block;max-width:138px;height:auto;border:0;color:#ffffff;font-size:24px;font-weight:700;">
                <p style="margin:12px 0 0;color:#d8f4f7;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;">Newsletter signup</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 26px 12px;">
                <h1 style="margin:0;color:#142033;font-size:30px;line-height:1.15;font-weight:800;">Welcome to the Pawzzles Pack</h1>
                <p style="margin:14px 0 0;color:#5d6878;font-size:16px;line-height:1.6;">Thanks for signing up. We will send practical dog care tips, enrichment ideas, feeding guidance and Pawzzles product updates.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 26px 8px;">
                <table role="presentation" cellspacing="0" cellpadding="0">
                  <tr>
                    ${buildButton('Browse resources', resourcesUrl, '#138fa1')}
                    ${buildButton('Visit shop', shopUrl, '#f58232')}
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 26px 28px;">
                <p style="margin:0;color:#5d6878;font-size:12px;line-height:1.6;">You are receiving this because you asked Pawzzles to send you emails. You can unsubscribe at any time using the link in our marketing emails.</p>
                <p style="margin:10px 0 0;color:#5d6878;font-size:12px;line-height:1.6;"><a href="${escapeHtml(privacyUrl)}" style="color:#087b86;font-weight:700;">Privacy Policy</a> | <a href="${escapeHtml(termsUrl)}" style="color:#087b86;font-weight:700;">Terms</a></p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;color:#5d6878;font-size:11px;">Pawzzles Resource Hub</p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function buildNewsletterWelcomeText() {
  return [
    'Welcome to the Pawzzles Pack',
    '',
    'Thanks for signing up. We will send practical dog care tips, enrichment ideas, feeding guidance and Pawzzles product updates.',
    '',
    `Browse resources: ${getSiteUrl()}/resources`,
    `Visit shop: ${getShopUrl()}`,
    '',
    'You are receiving this because you asked Pawzzles to send you emails. You can unsubscribe at any time using the link in our marketing emails.',
    `Privacy Policy: ${getPrivacyUrl()}`,
    `Terms: ${getTermsUrl()}`,
  ].join('\n')
}

export async function sendNewsletterWelcomeEmail({ email, interests = [] } = {}) {
  const templateId = parseListId(process.env.BREVO_NEWSLETTER_TEMPLATE_ID)
  const sender = getSender()
  const siteUrl = getSiteUrl()
  const shopUrl = getShopUrl()
  const resourcesUrl = `${siteUrl}/resources`
  const emailType = EMAIL_TYPES.NEWSLETTER_WELCOME

  const body = templateId
    ? {
        sender: { name: sender.name, email: sender.email },
        to: [{ email }],
        templateId,
        params: {
          emailType,
          interests,
          resourcesUrl,
          shopUrl,
          privacyUrl: getPrivacyUrl(),
          termsUrl: getTermsUrl(),
        },
      }
    : {
        sender: { name: sender.name, email: sender.email },
        to: [{ email }],
        subject: 'Welcome to the Pawzzles Pack',
        htmlContent: buildNewsletterWelcomeHtml(),
        textContent: buildNewsletterWelcomeText(),
      }

  return brevoRequest('/smtp/email', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function sendCalculatorResultEmail({
  email,
  dogName,
  calculatorType,
  resultData,
  resultUrl,
  marketingConsent = false,
}) {
  const templateId = parseListId(process.env.BREVO_RESULT_TEMPLATE_ID)
  const sender = getSender()
  const shopUrl = getShopUrl()
  const resourcesUrl = `${getSiteUrl()}/resources`
  const meta = getCalculatorEmailMeta(calculatorType)
  const emailType = EMAIL_TYPES.CALCULATOR_RESULT

  const body = templateId
    ? {
        sender: { name: sender.name, email: sender.email },
        to: [{ email }],
        templateId,
        params: {
          emailType,
          dogName,
          calculatorType,
          resultData,
          resultUrl,
          resourcesUrl,
          shopUrl,
          privacyUrl: getPrivacyUrl(),
          termsUrl: getTermsUrl(),
        },
      }
    : {
        sender: { name: sender.name, email: sender.email },
        to: [{ email }],
        subject: meta.subject,
        htmlContent: buildResultEmailHtml({
          dogName,
          calculatorType,
          resultData,
          resultUrl,
          marketingConsent,
        }),
        textContent: buildResultEmailText({
          dogName,
          calculatorType,
          resultData,
          resultUrl,
          marketingConsent,
        }),
      }

  return brevoRequest('/smtp/email', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
