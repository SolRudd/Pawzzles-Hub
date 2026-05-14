import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { getConsentPreferences, trackAppEvent } from '../lib/tracking.js'
import { emailCalculatorResult, isValidResultEmail } from '../lib/results.js'

export default function ResultEmailCapture({
  calculatorType,
  dogName = '',
  inputData = {},
  resultData,
  sourceComponent,
  interests = [],
  title = 'Email this result',
  body = 'Send a copy to your inbox so you can come back to it later.',
  buttonLabel = 'Email my result',
}) {
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const location = useLocation()
  const inputId = `result-email-${sourceComponent}`

  async function handleSubmit(event) {
    event.preventDefault()

    const cleanEmail = email.trim()
    if (!isValidResultEmail(cleanEmail)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    const preferences = getConsentPreferences()
    const payload = {
      email: cleanEmail,
      dogName,
      calculatorType,
      inputData,
      resultData,
      sourcePage: location.pathname,
      sourceComponent,
      consentAnalytics: Boolean(preferences.analytics),
      consentMarketing: marketingConsent,
      interests,
    }

    setStatus('loading')
    setMessage('')
    setResultUrl('')

    try {
      const response = await emailCalculatorResult(payload)
      if (!response.ok) throw new Error(response.error)

      setStatus('success')
      setMessage('Done. Your result has been emailed.')
      setResultUrl(response.resultUrl || '')
      setEmail('')
      trackAppEvent('calculator_result_email_success', {
        source_component: sourceComponent,
        calculator_type: calculatorType,
      })
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Could not email your result. Please try again.')
      trackAppEvent('calculator_result_email_error', {
        source_component: sourceComponent,
        calculator_type: calculatorType,
      })
    }
  }

  return (
    <div className="rounded-2xl bg-cream border border-navy/5 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-teal text-white shrink-0">
          <Icon name="mail" className="w-5 h-5" />
        </span>
        <div>
          <p className="font-display text-xl text-navy">{title}</p>
          <p className="mt-1 text-sm text-muted">{body}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'loading') setStatus('idle')
            setMessage('')
          }}
          placeholder="Enter your email address"
          disabled={status === 'loading'}
          className="w-full rounded-full bg-white border border-navy/10 px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:border-orange/40"
        />

        <label className="flex items-start gap-3 rounded-2xl bg-white border border-navy/5 p-3 text-left">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-teal shrink-0"
            checked={marketingConsent}
            onChange={(event) => setMarketingConsent(event.target.checked)}
          />
          <span className="text-xs text-navy/80">
            Yes, send me Pawzzles tips, guides and product updates.
          </span>
        </label>

        <p className="text-[11px] leading-relaxed text-muted">
          By submitting, you agree we can email this to you. Marketing emails
          are only sent if you opt in.
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

      {resultUrl && (
        <a
          href={resultUrl}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-teal-deep"
        >
          Open saved result
          <Icon name="arrowRight" className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}
