import { defaultCookieConsent, readCookieConsent } from './cookieConsent.js'
import { trackEvent } from './googleTagManager.js'

export function getConsentPreferences() {
  if (typeof window === 'undefined') return defaultCookieConsent
  return window.pawzzlesCookieConsent || readCookieConsent() || defaultCookieConsent
}

export function getTrackingConsentParams() {
  const preferences = getConsentPreferences()
  return {
    consent_analytics: Boolean(preferences.analytics),
    consent_marketing: Boolean(preferences.marketing),
  }
}

export function trackAppEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return false

  return trackEvent(eventName, {
    source_page: window.location.pathname,
    ...getTrackingConsentParams(),
    ...params,
  })
}

export function trackVisitShop(sourceComponent = 'shop_link') {
  return trackAppEvent('visit_shop_clicked', {
    source_component: sourceComponent,
  })
}
