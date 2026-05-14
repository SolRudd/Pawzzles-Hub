import React, { useEffect, useState } from 'react'
import { Icon } from './icons/Icons.jsx'
import { SITE } from '../data/site.js'
import {
  applyCookieConsent,
  defaultCookieConsent,
  readCookieConsent,
  saveCookieConsent,
} from '../lib/cookieConsent.js'
import { trackEvent } from '../lib/googleTagManager.js'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [preferences, setPreferences] = useState(defaultCookieConsent)

  useEffect(() => {
    const saved = readCookieConsent()
    if (saved) {
      applyCookieConsent(saved)
      setPreferences(saved)
      return
    }
    setVisible(true)
  }, [])

  useEffect(() => {
    function openSettings() {
      const saved = readCookieConsent()
      setPreferences(saved || defaultCookieConsent)
      setVisible(true)
      setManageOpen(true)
    }

    window.addEventListener('pawzzles:open-cookie-settings', openSettings)
    return () => {
      window.removeEventListener('pawzzles:open-cookie-settings', openSettings)
    }
  }, [])

  function commit(next, eventName) {
    const saved = saveCookieConsent(next)
    setPreferences(saved)
    setVisible(false)
    setManageOpen(false)

    trackEvent(eventName, {
      source_page: window.location.pathname,
      source_component: 'cookie_banner',
      consent_analytics: Boolean(saved.analytics),
      consent_marketing: Boolean(saved.marketing),
    })
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto max-w-5xl mx-auto rounded-[1.75rem] bg-cream shadow-card ring-1 ring-navy/10 overflow-hidden">
        <div className="grid md:grid-cols-[1fr_auto] gap-5 p-4 sm:p-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-teal text-white shadow-soft shrink-0">
                <Icon name="paw" className="w-5 h-5" />
              </span>
              <div>
                <p className="font-display text-xl text-navy">Cookie choices</p>
                <p className="text-sm text-muted">
                  Necessary cookies keep the site working. Analytics and
                  marketing stay off unless you allow them.
                </p>
              </div>
            </div>

            {manageOpen && (
              <div className="mt-5 grid sm:grid-cols-3 gap-3">
                <CookieToggle
                  title="Necessary"
                  copy="Always on for core site features."
                  checked
                  disabled
                />
                <CookieToggle
                  title="Analytics"
                  copy="Helps us understand what resources are useful."
                  checked={preferences.analytics}
                  onChange={(checked) =>
                    setPreferences((current) => ({ ...current, analytics: checked }))
                  }
                />
                <CookieToggle
                  title="Marketing"
                  copy="Reserved for future ad or shop measurement."
                  checked={preferences.marketing}
                  onChange={(checked) =>
                    setPreferences((current) => ({ ...current, marketing: checked }))
                  }
                />
              </div>
            )}

            <p className="mt-4 text-xs text-muted">
              Read more in the{' '}
              <a href={SITE.privacyPolicyUrl} className="font-bold text-teal hover:text-teal-deep">
                privacy policy
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:min-w-[190px]">
            <button
              type="button"
              className="btn-primary whitespace-nowrap"
              onClick={() =>
                commit(
                  { analytics: true, marketing: true },
                  'cookie_consent_accept_all',
                )
              }
            >
              Accept all
            </button>
            <button
              type="button"
              className="btn-secondary whitespace-nowrap"
              onClick={() =>
                commit(
                  { analytics: false, marketing: false },
                  'cookie_consent_reject',
                )
              }
            >
              Reject non-essential
            </button>
            {manageOpen ? (
              <button
                type="button"
                className="btn-ghost whitespace-nowrap"
                onClick={() => commit(preferences, 'cookie_consent_update')}
              >
                Save preferences
              </button>
            ) : (
              <button
                type="button"
                className="btn-ghost whitespace-nowrap"
                onClick={() => setManageOpen(true)}
              >
                Manage preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function CookieToggle({ title, copy, checked, disabled = false, onChange }) {
  return (
    <label
      className={`rounded-2xl border bg-white p-4 shadow-soft ${
        checked ? 'border-teal/25' : 'border-navy/10'
      } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="font-bold text-navy">{title}</span>
        <input
          type="checkbox"
          className="h-5 w-5 accent-teal"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
        />
      </span>
      <span className="mt-2 block text-xs text-muted leading-relaxed">{copy}</span>
    </label>
  )
}
