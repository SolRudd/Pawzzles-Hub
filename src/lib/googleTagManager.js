import { SITE } from '../data/site.js'

export const GTM_CONTAINER_ID = SITE.gtmContainerId

let consentDefaultsInitialised = false
let googleTagManagerLoaded = false
let currentConsent = {
  analytics: false,
  marketing: false,
}

function canUseDom() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function ensureDataLayer() {
  if (!canUseDom()) return null

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }

  return window.dataLayer
}

export function initialiseConsentDefaults() {
  if (!canUseDom() || consentDefaultsInitialised) return

  ensureDataLayer()
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })

  consentDefaultsInitialised = true
}

export function loadGoogleTagManager(containerId = GTM_CONTAINER_ID) {
  if (!canUseDom() || !containerId) return false

  const dataLayer = ensureDataLayer()
  const existing = document.querySelector(`script[data-pawzzles-gtm="${containerId}"]`)

  if (googleTagManagerLoaded || existing) {
    googleTagManagerLoaded = true
    window.pawzzlesGtmLoaded = true
    return true
  }

  dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
    containerId,
  )}`
  script.dataset.pawzzlesGtm = containerId

  document.head.appendChild(script)
  googleTagManagerLoaded = true
  window.pawzzlesGtmLoaded = true

  return true
}

export function updateGoogleConsent(preferences = {}) {
  if (!canUseDom()) return

  initialiseConsentDefaults()

  currentConsent = {
    analytics: Boolean(preferences.analytics),
    marketing: Boolean(preferences.marketing),
  }

  window.gtag('consent', 'update', {
    analytics_storage: currentConsent.analytics ? 'granted' : 'denied',
    ad_storage: currentConsent.marketing ? 'granted' : 'denied',
    ad_user_data: currentConsent.marketing ? 'granted' : 'denied',
    ad_personalization: currentConsent.marketing ? 'granted' : 'denied',
  })

  if (currentConsent.analytics || currentConsent.marketing) {
    loadGoogleTagManager()
  }
}

export function isGoogleTagManagerLoaded() {
  return googleTagManagerLoaded || Boolean(canUseDom() && window.pawzzlesGtmLoaded)
}

export function trackEvent(eventName, params = {}) {
  if (!canUseDom() || !eventName) return false
  if (!isGoogleTagManagerLoaded()) return false
  if (!currentConsent.analytics && !currentConsent.marketing) return false

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })

  return true
}
