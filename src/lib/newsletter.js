/**
 * Frontend newsletter helper.
 *
 * Talks to /api/newsletter/subscribe, which is the only place the Brevo API
 * key is allowed to live. Returns a plain { ok, error? } object so UI states
 * stay simple.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim())
}

export const NEWSLETTER_ENDPOINT = '/api/newsletter/subscribe'

export async function subscribeToNewsletter(payload) {
  if (!isValidEmail(payload?.email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  try {
    const response = await fetch(NEWSLETTER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        email: payload.email.trim(),
        timestamp: payload.timestamp || new Date().toISOString(),
      }),
    })

    let data = {}
    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (!response.ok) {
      return {
        ok: false,
        error:
          data?.error ||
          'Something went wrong. Please try again in a moment.',
      }
    }

    return { ok: true, data }
  } catch {
    return {
      ok: false,
      error: 'Something went wrong. Please try again in a moment.',
    }
  }
}
