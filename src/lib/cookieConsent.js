import { updateGoogleConsent } from './googleTagManager.js'

export const COOKIE_CONSENT_KEY = 'pawzzles_cookie_consent_v1'

export const defaultCookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
}

export function readCookieConsent() {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    return stored ? { ...defaultCookieConsent, ...JSON.parse(stored), necessary: true } : null
  } catch {
    return null
  }
}

export function saveCookieConsent(preferences) {
  const next = { ...defaultCookieConsent, ...preferences, necessary: true }
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(next))
  applyCookieConsent(next)
  return next
}

export function applyCookieConsent(preferences) {
  const next = { ...defaultCookieConsent, ...preferences, necessary: true }

  updateGoogleConsent(next)

  window.pawzzlesCookieConsent = next
  window.dispatchEvent(
    new CustomEvent('pawzzles:cookie-consent-updated', {
      detail: next,
    }),
  )
}
