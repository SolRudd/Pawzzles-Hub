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

function getSignatureAssetBaseUrl() {
  return `${getSiteUrl()}/email-signature/images`
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

  const gramsValue = resultData.grams ?? resultData.gramsPerDay

  return {
    rows: [
      ['Estimated daily calories', resultData.daily ? `${resultData.daily} kcal` : ''],
      gramsValue !== null && gramsValue !== undefined
        ? [resultData.gramsLabel || 'Estimated grams per day', `${gramsValue} g`]
        : null,
      ['Food type', resultData.foodTypeLabel],
      [
        'Kcal per 100g used',
        resultData.kcalPer100gUsed
          ? `${resultData.kcalPer100gUsed} kcal/100g (${resultData.kcalSourceLabel || 'From food label'})`
          : resultData.kcalSourceLabel || 'No single value used',
      ],
      ['Life stage', resultData.stage],
      ['Activity level', resultData.activity],
      ['Goal', resultData.goal],
    ].filter((row) => row && cleanValue(row[1])),
    activities: [],
    supportIdeas: [],
    reminder: [
      resultData.gramsMessage,
      resultData.foodEnergyNote ||
        'Food energy varies by brand and recipe. For the most accurate result, use the kcal per 100g from your dog food packaging or the manufacturer’s website.',
    ]
      .filter(Boolean)
      .join(' '),
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

export function buildEmailSignatureHtml() {
  const shopUrl = getShopUrl()
  const resourcesUrl = `${getSiteUrl()}/resources`
  const privacyUrl = getPrivacyUrl()
  const termsUrl = getTermsUrl()
  const assetBaseUrl = getSignatureAssetBaseUrl()

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="width:520px;max-width:520px;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#26313f;">
      <tr>
        <td style="padding:0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="width:520px;border-collapse:separate;border-spacing:0;background:#fff8ee;border:1px solid #f1dfcf;border-radius:14px;">
            <tr>
              <td style="padding:18px 20px 12px 20px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" style="width:480px;border-collapse:collapse;">
                  <tr>
                    <td width="146" style="width:146px;padding:0 16px 0 0;vertical-align:middle;">
                      <a href="${escapeHtml(shopUrl)}" style="text-decoration:none;border:0;">
                        <img src="${escapeHtml(`${assetBaseUrl}/pawzzles-logo.png`)}" alt="Pawzzles" width="128" style="display:block;width:128px;max-width:128px;height:auto;border:0;outline:none;text-decoration:none;">
                      </a>
                    </td>
                    <td width="2" style="width:2px;padding:0;vertical-align:middle;">
                      <div style="width:2px;height:96px;background:#f39a5b;font-size:1px;line-height:1px;">&nbsp;</div>
                    </td>
                    <td width="288" style="width:288px;padding:0 14px 0 18px;vertical-align:middle;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
                        <tr>
                          <td style="padding:0;font-family:Arial,Helvetica,sans-serif;">
                            <div style="font-size:20px;line-height:23px;font-weight:800;color:#d7834c;">Pawzzles Team</div>
                            <div style="padding-top:2px;font-size:13px;line-height:17px;font-weight:800;color:#5b8fa2;">Enriching Play for Happier Pets</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:10px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#26313f;">
                            <span style="color:#d7834c;font-weight:800;">E:</span>
                            <a href="mailto:hello@pawzzles.co.uk" style="color:#26313f;text-decoration:none;font-weight:700;">hello@pawzzles.co.uk</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:1px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:18px;color:#26313f;">
                            <span style="color:#d7834c;font-weight:800;">W:</span>
                            <a href="${escapeHtml(shopUrl)}" style="color:#26313f;text-decoration:none;font-weight:700;">pawzzles.co.uk</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:5px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:16px;">
                            <a href="${escapeHtml(resourcesUrl)}" style="color:#5bb6b2;text-decoration:none;font-weight:800;">Resource Hub</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="30" style="width:30px;padding:0;vertical-align:middle;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="30" style="width:30px;border-collapse:collapse;">
                        <tr>
                          <td style="padding:0 0 6px 0;text-align:center;">
                            <a href="https://www.instagram.com/pawzzlesuk/" style="text-decoration:none;border:0;">
                              <img src="${escapeHtml(`${assetBaseUrl}/instagram.png`)}" alt="Instagram" width="30" style="display:block;width:30px;max-width:30px;height:auto;border:0;outline:none;text-decoration:none;">
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 6px 0;text-align:center;">
                            <a href="https://www.facebook.com/people/pawzzlesuk/61550677147838/" style="text-decoration:none;border:0;">
                              <img src="${escapeHtml(`${assetBaseUrl}/facebook.png`)}" alt="Facebook" width="30" style="display:block;width:30px;max-width:30px;height:auto;border:0;outline:none;text-decoration:none;">
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0;text-align:center;">
                            <a href="https://www.tiktok.com/@pawzzlesuk" style="text-decoration:none;border:0;">
                              <img src="${escapeHtml(`${assetBaseUrl}/tiktok.png`)}" alt="TikTok" width="30" style="display:block;width:30px;max-width:30px;height:auto;border:0;outline:none;text-decoration:none;">
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 20px 14px 20px;">
                <a href="${escapeHtml(shopUrl)}" style="text-decoration:none;border:0;">
                  <img src="${escapeHtml(`${assetBaseUrl}/signature-banner.png`)}" alt="Shop Pawzzles enrichment toys" width="480" style="display:block;width:480px;max-width:480px;height:auto;border:0;outline:none;text-decoration:none;border-radius:12px;">
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 4px 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;line-height:13px;color:#6f5a50;">
          This email and any attachments are intended only for the person they are addressed to and may contain confidential information. If you have received this email in error, please delete it and let us know. Pawzzles respects your privacy. You can view our Privacy Policy at
          <a href="${escapeHtml(privacyUrl)}" style="color:#5bb6b2;text-decoration:none;font-weight:700;">${escapeHtml(privacyUrl)}</a>.
        </td>
      </tr>
      <tr>
        <td style="padding:5px 4px 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:9.5px;line-height:13px;color:#6f5a50;">
          <a href="${escapeHtml(privacyUrl)}" style="color:#6f5a50;text-decoration:none;font-weight:700;">Privacy Policy</a>
          <span style="color:#f39a5b;">&nbsp;|&nbsp;</span>
          <a href="${escapeHtml(termsUrl)}" style="color:#6f5a50;text-decoration:none;font-weight:700;">Terms</a>
        </td>
      </tr>
    </table>
  `
}

export function buildEmailSignatureText() {
  return [
    'Pawzzles Team',
    'Enriching Play for Happier Pets',
    'E: hello@pawzzles.co.uk',
    `W: ${getShopUrl()}`,
    `Resource Hub: ${getSiteUrl()}/resources`,
    'Instagram: https://www.instagram.com/pawzzlesuk/',
    'Facebook: https://www.facebook.com/people/pawzzlesuk/61550677147838/',
    'TikTok: https://www.tiktok.com/@pawzzlesuk',
    '',
    'This email and any attachments are intended only for the person they are addressed to and may contain confidential information. If you have received this email in error, please delete it and let us know. Pawzzles respects your privacy.',
    `Privacy Policy: ${getPrivacyUrl()}`,
    `Terms: ${getTermsUrl()}`,
  ].join('\n')
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
                    : '<p style="margin:10px 0 0;color:#5d6878;font-size:14px;line-height:1.55;">Use the kcal per 100g on your dog food packaging for the most useful gram estimate.</p>'
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
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;">
            <tr>
              <td align="center" style="padding:18px 0 0;">
                ${buildEmailSignatureHtml()}
              </td>
            </tr>
          </table>
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
    '',
    buildEmailSignatureText(),
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
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;">
            <tr>
              <td align="center" style="padding:18px 0 0;">
                ${buildEmailSignatureHtml()}
              </td>
            </tr>
          </table>
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
    '',
    buildEmailSignatureText(),
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
          emailSignatureHtml: buildEmailSignatureHtml(),
          emailSignatureText: buildEmailSignatureText(),
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
          emailSignatureHtml: buildEmailSignatureHtml(),
          emailSignatureText: buildEmailSignatureText(),
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
