import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import PageHero from '../components/PageHero.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { SITE } from '../data/site.js'
import { trackVisitShop } from '../lib/tracking.js'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function FeedingSummary({ result }) {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <SummaryTile label="Daily calories" value={result.daily} suffix="kcal" tone="orange" />
      <SummaryTile
        label="Grams per day"
        value={result.grams || 'Add food calories'}
        suffix={result.grams ? 'g' : ''}
        tone="teal"
      />
      <SummaryTile label="Resting energy" value={result.rer} suffix="kcal" tone="cream" />
    </div>
  )
}

function EnrichmentSummary({ result }) {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className="rounded-2xl bg-orange/10 p-6">
        <p className="text-xs font-extrabold uppercase tracking-wide text-orange">Primary focus</p>
        <h2 className="mt-1 font-display text-2xl text-navy">{result.primary}</h2>
        {Array.isArray(result.ideas) && (
          <ul className="mt-3 space-y-2">
            {result.ideas.map((idea) => (
              <li key={idea} className="flex items-start gap-3 text-sm text-navy/85">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                {idea}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="rounded-2xl bg-teal/10 p-6">
        <p className="text-xs font-extrabold uppercase tracking-wide text-teal">Supporting mix</p>
        <h2 className="mt-1 font-display text-2xl text-navy">{result.supportLabel}</h2>
        {Array.isArray(result.supportIdeas) && (
          <ul className="mt-3 space-y-2">
            {result.supportIdeas.map((idea) => (
              <li key={idea} className="flex items-start gap-3 text-sm text-navy/85">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {idea}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function SummaryTile({ label, value, suffix, tone }) {
  const toneClass =
    tone === 'teal'
      ? 'bg-teal/10 text-teal'
      : tone === 'cream'
        ? 'bg-cream text-muted'
        : 'bg-orange/10 text-orange'

  return (
    <div className={`rounded-2xl p-5 ${toneClass}`}>
      <p className="text-xs font-extrabold uppercase tracking-wide">{label}</p>
      <p className="mt-1 font-display text-3xl text-navy">
        {value}{' '}
        {suffix && <span className="text-base font-body font-bold text-muted">{suffix}</span>}
      </p>
    </div>
  )
}

function GenericSummary({ result }) {
  return (
    <dl className="grid sm:grid-cols-2 gap-4">
      {Object.entries(result || {})
        .filter(([, value]) => value !== null && value !== undefined && typeof value !== 'object')
        .map(([key, value]) => (
          <div key={key} className="rounded-2xl bg-cream p-5 border border-navy/5">
            <dt className="text-xs font-extrabold uppercase tracking-wide text-muted">
              {key.replace(/_/g, ' ')}
            </dt>
            <dd className="mt-1 font-bold text-navy">{String(value)}</dd>
          </div>
        ))}
    </dl>
  )
}

function ResultBody({ data }) {
  if (data.calculatorType === 'dog_feeding') {
    return <FeedingSummary result={data.resultData} />
  }

  if (data.calculatorType === 'enrichment_finder') {
    return <EnrichmentSummary result={data.resultData} />
  }

  return <GenericSummary result={data.resultData} />
}

export default function SavedResult() {
  const { token } = useParams()
  const [state, setState] = useState({ status: 'loading', data: null, error: '' })

  useEffect(() => {
    let cancelled = false

    async function loadResult() {
      try {
        const response = await fetch(`/api/results/get?token=${encodeURIComponent(token)}`)
        const data = await response.json().catch(() => ({}))

        if (!response.ok || !data.ok) {
          throw new Error(data.error || 'Result not found.')
        }

        if (!cancelled) {
          setState({ status: 'success', data: data.result, error: '' })
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: 'error',
            data: null,
            error: error.message || 'Result not found.',
          })
        }
      }
    }

    loadResult()
    return () => {
      cancelled = true
    }
  }, [token])

  const title =
    state.data?.calculatorType === 'enrichment_finder'
      ? 'Saved enrichment plan'
      : 'Saved feeding result'

  return (
    <>
      <SEOHead title={`${title} | Pawzzles`} canonical={`/results/${token}`} noindex />
      <PageHero
        eyebrow="Saved result"
        title={title}
        intro="A saved Pawzzles result you can revisit, print or use as a starting point for everyday routines."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Saved result' }]}
      />

      <section className="pb-24 sm:pb-28">
        <div className="max-w-4xl mx-auto container-px">
          {state.status === 'loading' && (
            <div className="rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 p-8 text-muted">
              Loading your result...
            </div>
          )}

          {state.status === 'error' && (
            <div className="rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 p-8">
              <h2 className="font-display text-3xl text-navy">We could not find that result</h2>
              <p className="mt-2 text-muted">{state.error}</p>
              <Link to="/resources" className="btn-primary mt-6">
                Browse resources
              </Link>
            </div>
          )}

          {state.status === 'success' && state.data && (
            <div className="rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <p className="eyebrow">Pawzzles result</p>
                  <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                    {state.data.dogName ? `${state.data.dogName}'s result` : title}
                  </h2>
                  {state.data.createdAt && (
                    <p className="mt-2 text-sm text-muted">
                      Saved on {formatDate(state.data.createdAt)}
                    </p>
                  )}
                </div>
                <button type="button" className="btn-secondary" onClick={() => window.print()}>
                  Print result
                </button>
              </div>

              <div className="mt-8">
                <ResultBody data={state.data} />
              </div>

              <Disclaimer className="mt-8" />

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/resources" className="btn-primary">
                  Browse resources
                  <Icon name="arrowRight" className="w-4 h-4" />
                </Link>
                <a
                  href={SITE.shopUrl}
                  className="btn-secondary"
                  onClick={() => trackVisitShop('saved_result')}
                >
                  Visit Shop
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
