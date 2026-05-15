const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidResultEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim())
}

export const RESULT_EMAIL_ENDPOINT = '/api/results/email'

export async function emailCalculatorResult(payload) {
  if (!isValidResultEmail(payload?.email)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }

  try {
    const response = await fetch(RESULT_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        email: payload.email.trim(),
        timestamp: payload.timestamp || new Date().toISOString(),
      }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data?.error || 'Could not email your result. Please try again.',
      }
    }

    return { ok: true, resultUrl: data.resultUrl }
  } catch {
    return {
      ok: false,
      error: 'We could not reach the server. Please try again in a moment.',
    }
  }
}
