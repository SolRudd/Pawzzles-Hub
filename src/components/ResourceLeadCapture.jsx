import React, { useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { CheckboxField, InputField } from './forms/FormFields.jsx'
import { getConsentPreferences, trackAppEvent } from '../lib/tracking.js'
import { isValidEmail, subscribeToNewsletter } from '../lib/newsletter.js'
import {
  CONSENT_METHOD,
  CONSENT_VERSION,
  NEWSLETTER_CONSENT_ERROR,
  NEWSLETTER_CONSENT_TEXT,
  consentLinkProps,
} from '../lib/consent.js'

export default function ResourceLeadCapture({
  title = 'Get dog care tips by email',
  body = 'Join the Pawzzles Pack for practical guides, routines and dog-friendly ideas.',
  buttonLabel = 'Join the pack',
  sourceComponent = 'resource_article_signup',
  interests = [],
  className = '',
}) {
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const location = useLocation()
  const formId = useId().replace(/:/g, '')
  const emailInputId = `resource-lead-email-${formId}`
  const marketingInputId = `resource-lead-marketing-${formId}`
  const { privacyUrl, termsUrl } = consentLinkProps()

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanEmail = email.trim()
    if (!isValidEmail(cleanEmail)) {
      setError('Please enter a valid email address.')
      setStatus('error')
      setMessage('')
      return
    }

    if (!marketingConsent) {
      setStatus('error')
      setMessage(NEWSLETTER_CONSENT_ERROR)
      return
    }

    const preferences = getConsentPreferences()
    const payload = {
      email: cleanEmail,
      sourcePage: location.pathname,
      sourceComponent,
      consentAnalytics: Boolean(preferences.analytics),
      consentMarketing: true,
      privacyAccepted: true,
      termsAccepted: true,
      consentText: NEWSLETTER_CONSENT_TEXT,
      consentVersion: CONSENT_VERSION,
      consentMethod: CONSENT_METHOD,
      privacyUrl,
      termsUrl,
      interests,
      timestamp: new Date().toISOString(),
    }

    setStatus('loading')
    setError('')
    setMessage('')

    trackAppEvent('newsletter_signup_submit', {
      source_component: sourceComponent,
    })

    const response = await subscribeToNewsletter(payload)

    if (!response.ok) {
      setStatus('error')
      setMessage(response.error || 'Something went wrong. Please try again in a moment.')
      trackAppEvent('newsletter_signup_error', {
        source_component: sourceComponent,
      })
      return
    }

    setStatus('success')
    setEmail('')
    setMessage("You’re in. We’ll send useful Pawzzles tips and guides your way.")
    trackAppEvent('newsletter_signup_success', {
      source_component: sourceComponent,
    })
  }

  return (
    <aside className={`rounded-[2rem] bg-cream ring-1 ring-orange/10 p-5 sm:p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal text-white">
          <Icon name="mail" className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-2xl text-navy">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <InputField
          id={emailInputId}
          label="Email address"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
            if (status !== 'loading') setStatus('idle')
            setMessage('')
          }}
          helper="We will send useful Pawzzles ideas to your inbox."
          placeholder="you@example.com"
          error={error}
          disabled={status === 'loading'}
        />

        <CheckboxField
          id={marketingInputId}
          label={
            <>
              Yes, send me Pawzzles tips, guides and product updates. I agree to the{' '}
              <a
                href={privacyUrl}
                className="font-bold text-teal hover:text-teal-deep"
                target="_blank"
                rel="noopener"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href={termsUrl}
                className="font-bold text-teal hover:text-teal-deep"
                target="_blank"
                rel="noopener"
              >
                Terms
              </a>
              .
            </>
          }
          helper="Cookie preferences are separate from Pawzzles email consent."
          checked={marketingConsent}
          onChange={(checked) => {
            setMarketingConsent(checked)
            if (status !== 'loading') setStatus('idle')
            setMessage('')
          }}
          disabled={status === 'loading'}
          className="bg-white"
        />

        <p className="text-[11px] leading-relaxed text-muted">
          We only add you to Pawzzles email lists when you tick the box.
        </p>

        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : buttonLabel}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm font-bold ${
            status === 'error' ? 'text-orange' : 'text-teal'
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </aside>
  )
}
