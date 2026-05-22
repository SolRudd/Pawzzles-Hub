import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import SEOHead from '../components/SEOHead.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import {
  CheckboxField,
  FormError,
  InputField,
  SelectField,
} from '../components/forms/FormFields.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { ImagePlaceholder } from '../components/placeholders/Scenes.jsx'
import { PawMark } from '../components/PawAccent.jsx'
import { getResource } from '../data/resources.js'
import { resourceHubImages } from '../data/imageAssets.js'
import { SITE, absoluteUrl } from '../data/site.js'
import { getConsentPreferences, trackAppEvent, trackVisitShop } from '../lib/tracking.js'
import { emailCalculatorResult, isValidResultEmail } from '../lib/results.js'
import {
  CONSENT_METHOD,
  CONSENT_VERSION,
  MARKETING_CONSENT_TEXT,
  RESULT_EMAIL_CONSENT_ERROR,
  RESULT_EMAIL_CONSENT_TEXT,
} from '../lib/consent.js'

const STAGES = [
  { id: 'puppy', label: 'Puppy' },
  { id: 'adolescent', label: 'Adolescent' },
  { id: 'adult', label: 'Adult' },
  { id: 'senior', label: 'Senior' },
]

const ENERGY = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
]

const GOALS = [
  { id: 'boredom', label: 'Ease boredom' },
  { id: 'calming', label: 'Calmer evenings' },
  { id: 'training', label: 'Build training & focus' },
  { id: 'exercise', label: 'Burn energy' },
  { id: 'bonding', label: 'Bond together' },
]

const STYLES = [
  { id: 'chewer', label: 'Chewer' },
  { id: 'chaser', label: 'Chaser' },
  { id: 'sniffer', label: 'Sniffer' },
  { id: 'solver', label: 'Problem-solver' },
]

const PLAN = {
  chewer: {
    primary: 'Long-lasting chews & lickmats',
    toy: 'Durable chew toys',
    ideas: [
      'Frozen filled rubber toys for after dinner',
      'Lickmats with soft food before bedtime',
      'Supervised long-lasting chews on a settle mat',
    ],
  },
  chaser: {
    primary: 'Tug, fetch and chase-style games',
    toy: 'Rope toys & flirt poles',
    ideas: [
      'Short fetch sessions with a clear end signal',
      'Two-toy swap games to build calm in arousal',
      'Flirt pole bursts followed by a settle',
    ],
  },
  sniffer: {
    primary: 'Sniff-led enrichment',
    toy: 'Snuffle mats & scatter feeders',
    ideas: [
      'Scatter feeding in the garden or kitchen',
      'A slow “sniffari” walk with no destination',
      'Hide-and-find food games inside boxes',
    ],
  },
  solver: {
    primary: 'Puzzles and problem-solving',
    toy: 'Puzzle feeders & food dispensers',
    ideas: [
      'Stacked cardboard puzzles (start easy)',
      'Food-dispensing balls during quiet time',
      'Trick training in 2-minute bursts',
    ],
  },
}

const GOAL_MIX = {
  boredom: ['sniffer', 'solver'],
  calming: ['chewer', 'sniffer'],
  training: ['solver', 'chaser'],
  exercise: ['chaser', 'sniffer'],
  bonding: ['solver', 'chaser'],
}

function recommend({ stage, energy, goal, style }) {
  if (!stage || !energy || !goal || !style) return null

  const base = PLAN[style]
  const supportStyle = (GOAL_MIX[goal] || []).find((s) => s !== style) || 'sniffer'
  const support = PLAN[supportStyle]

  const intensity =
    energy === 'high' ? 'Aim for two short bursts a day, with calm rests in between.' :
    energy === 'low' ? 'Keep sessions short and gentle, with plenty of rest.' :
    'A short morning session and a relaxed evening one works well.'

  const stageNote =
    stage === 'puppy' ? 'Stick to brief, easy activities and reward calm.' :
    stage === 'senior' ? 'Choose low-impact options. Sniffing and soft chewing are excellent.' :
    stage === 'adolescent' ? 'Predictable routine helps. Keep variety inside the same time slots.' :
    'Mix things up to keep activities feeling fresh.'

  return {
    primary: base.primary,
    toy: base.toy,
    ideas: base.ideas,
    supportLabel: support.primary,
    supportIdeas: support.ideas.slice(0, 2),
    intensity,
    stageNote,
  }
}

export default function EnrichmentFinder() {
  const location = useLocation()
  const [dogName, setDogName] = useState('')
  const [stage, setStage] = useState('adult')
  const [energy, setEnergy] = useState('medium')
  const [goal, setGoal] = useState('boredom')
  const [style, setStyle] = useState('sniffer')
  const [email, setEmail] = useState('')
  const [resultEmailConsent, setResultEmailConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [resultUrl, setResultUrl] = useState('')

  useEffect(() => {
    document.title = 'Enrichment Finder | Pawzzles'
    return () => {
      document.title = 'Pawzzles Resource Hub | Practical Tools for Dog Owners'
    }
  }, [])

  const plan = useMemo(
    () => recommend({ stage, energy, goal, style }),
    [stage, energy, goal, style],
  )

  function validateForm(generatedPlan) {
    const nextErrors = {}

    if (!stage) nextErrors.stage = 'Please choose a life stage.'
    if (!energy) nextErrors.energy = 'Please choose an energy level.'
    if (!goal) nextErrors.goal = 'Please choose a main goal.'
    if (!style) nextErrors.style = 'Please choose a play style.'
    if (!isValidResultEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!resultEmailConsent) {
      nextErrors.resultEmailConsent = RESULT_EMAIL_CONSENT_ERROR
    }
    if (!generatedPlan) {
      nextErrors.form = 'Please check the details above to create a plan.'
    }

    return nextErrors
  }

  async function onSubmit(e) {
    e.preventDefault()
    const nextErrors = validateForm(plan)
    setFieldErrors(nextErrors)
    setSubmitMessage('')
    setResultUrl('')

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('error')
      setSubmitted(false)
      return
    }

    setSubmitStatus('loading')
    setSubmitted(true)
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)

    trackAppEvent('enrichment_finder_completed', {
      source_component: 'enrichment_finder_result',
      calculator_type: 'enrichment_finder',
    })

    const preferences = getConsentPreferences()
    const response = await emailCalculatorResult({
      email,
      dogName,
      calculatorType: 'enrichment_finder',
      inputData: {
        dogName,
        stage,
        energy,
        goal,
        style,
      },
      resultData: plan,
      sourcePage: location.pathname,
      sourceComponent: 'enrichment_finder_result',
      consentAnalytics: Boolean(preferences.analytics),
      consentMarketing: marketingConsent,
      privacyAccepted: resultEmailConsent,
      termsAccepted: resultEmailConsent,
      resultEmailConsent,
      consentText: RESULT_EMAIL_CONSENT_TEXT,
      marketingConsentText: MARKETING_CONSENT_TEXT,
      consentVersion: CONSENT_VERSION,
      consentMethod: CONSENT_METHOD,
      privacyUrl: SITE.privacyPolicyUrl,
      termsUrl: SITE.termsUrl,
      interests: ['enrichment', 'toy_safety'],
      timestamp: new Date().toISOString(),
    })

    if (response.ok) {
      setSubmitStatus('success')
      setSubmitMessage('Your plan has been emailed. You can also view it below.')
      setResultUrl(response.resultUrl || '')
      return
    }

    setSubmitStatus('warning')
    setSubmitMessage('Your result is shown below, but we could not email it. Please try again.')
  }

  const next = ['best-dog-enrichment-ideas', 'toy-safety-guide', 'puppy-socialisation-checklist']
    .map((id) => getResource(id))
    .filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Enrichment Finder',
    url: absoluteUrl('/calculators/enrichment-finder/'),
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    description:
      'A Pawzzles tool that suggests dog enrichment ideas for everyday routines.',
    publisher: {
      '@type': 'Organization',
      name: SITE.brandName,
    },
  }

  return (
    <>
      <SEOHead
        title="Dog Enrichment Finder | Pawzzles Practical Tool"
        description="Use the Pawzzles Enrichment Finder to choose dog-friendly enrichment ideas by life stage, energy, goal and play style."
        canonical="/calculators/enrichment-finder/"
        structuredData={schema}
      />
      <PageHero
        eyebrow="Tool"
        title="Enrichment Finder"
        intro="Answer four quick questions and we'll suggest enrichment ideas matched to your dog."
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Resources', to: '/resources/' },
          { label: 'Enrichment Finder' },
        ]}
        meta={[
          { icon: 'clock', label: '1 min tool' },
          { icon: 'paw', label: 'General guidance' },
        ]}
      />

      <section className="pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-7">
              <form
                onSubmit={onSubmit}
                className="rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 p-6 sm:p-8 lg:p-10 space-y-7"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-teal/15 text-teal">
                    <Icon name="sparkle" className="w-5 h-5" />
                  </span>
                  <h2 className="font-display text-2xl text-navy">Your dog</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    id="enrichment-dog-name"
                    label="Dog name"
                    helper="Optional. Just for friendlier results."
                    type="text"
                    value={dogName}
                    onChange={(event) => setDogName(event.target.value)}
                    placeholder="e.g. Cooper"
                    disabled={submitStatus === 'loading'}
                  />

                  <SelectField
                    id="enrichment-stage"
                    label="Life stage"
                    helper="Choose the option that best fits your dog."
                    value={stage}
                    onChange={(event) => setStage(event.target.value)}
                    error={fieldErrors.stage}
                    disabled={submitStatus === 'loading'}
                  >
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </SelectField>

                  <SelectField
                    id="enrichment-energy"
                    label="Energy level"
                    helper="Pick your dog's usual daily energy."
                    value={energy}
                    onChange={(event) => setEnergy(event.target.value)}
                    error={fieldErrors.energy}
                    disabled={submitStatus === 'loading'}
                  >
                    {ENERGY.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </SelectField>

                  <SelectField
                    id="enrichment-goal"
                    label="Main goal"
                    helper="Choose what you want the activity to support."
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    error={fieldErrors.goal}
                    disabled={submitStatus === 'loading'}
                  >
                    {GOALS.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </SelectField>

                  <SelectField
                    id="enrichment-style"
                    label="Play style"
                    helper="Pick the play style your dog enjoys most."
                    value={style}
                    onChange={(event) => setStyle(event.target.value)}
                    error={fieldErrors.style}
                    disabled={submitStatus === 'loading'}
                  >
                    {STYLES.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </SelectField>

                  <InputField
                    id="enrichment-email"
                    label="Email address"
                    helper="We will email your result so you can come back to it later."
                    type="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      setFieldErrors((current) => ({ ...current, email: '' }))
                    }}
                    placeholder="you@example.com"
                    error={fieldErrors.email}
                    disabled={submitStatus === 'loading'}
                    wrapperClassName="sm:col-span-2"
                  />

                  <div className="sm:col-span-2">
                    <CheckboxField
                      id="enrichment-result-email-consent"
                      label={
                        <>
                          I agree to Pawzzles emailing this result to me and understand my details will be handled in line with the{' '}
                          <a href={SITE.privacyPolicyUrl} className="font-bold text-teal hover:text-teal-deep" target="_blank" rel="noopener">
                            Privacy Policy
                          </a>{' '}
                          and{' '}
                          <a href={SITE.termsUrl} className="font-bold text-teal hover:text-teal-deep" target="_blank" rel="noopener">
                            Terms
                          </a>
                          .
                        </>
                      }
                      checked={resultEmailConsent}
                      onChange={(checked) => {
                        setResultEmailConsent(checked)
                        setFieldErrors((current) => ({ ...current, resultEmailConsent: '' }))
                      }}
                      disabled={submitStatus === 'loading'}
                    />
                    <FormError id="enrichment-result-email-consent-error">
                      {fieldErrors.resultEmailConsent}
                    </FormError>
                  </div>

                  <CheckboxField
                    id="enrichment-marketing"
                    label="Yes, send me Pawzzles tips, guides and product updates."
                    helper="Optional. Marketing emails are only sent if you opt in."
                    checked={marketingConsent}
                    onChange={setMarketingConsent}
                    disabled={submitStatus === 'loading'}
                    className="sm:col-span-2"
                  />
                </div>

                <FormError id="enrichment-form-error">{fieldErrors.form}</FormError>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button type="submit" className="btn-primary" disabled={submitStatus === 'loading'}>
                    {submitStatus === 'loading' ? 'Emailing plan...' : 'Get and email my plan'}
                  </button>
                  <Link to="/resources/best-dog-enrichment-ideas/" className="btn-ghost">
                    See all enrichment ideas
                  </Link>
                </div>

                <p className="text-[11px] leading-relaxed text-muted">
                  The result email is transactional. Marketing emails are only sent if you opt in.
                </p>
              </form>
            </div>

            <aside className="lg:col-span-5">
              <div className="rounded-[2rem] bg-soft-blue ring-1 ring-teal/10 p-6 sm:p-8 sticky top-28">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-navy/5 bg-white">
                  <ImagePlaceholder
                    name="calculator-enrichment"
                    src={resourceHubImages['calculator-enrichment']}
                    alt="Dog exploring a teal and orange puzzle toy"
                    label="Enrichment finder"
                    imgClassName="absolute inset-0 w-full h-full object-cover object-[50%_55%]"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-navy flex items-center gap-2">
                  <PawMark size={16} color="#f58232" />
                  How it works
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-navy/85 list-disc pl-5">
                  <li>We match activities to play style and energy.</li>
                  <li>We adjust for life stage so suggestions are age-friendly.</li>
                  <li>You get a primary focus plus a supporting mix.</li>
                </ul>
                <Disclaimer className="mt-5">
                  Enrichment is meant to be enjoyable. Stop and reset if your
                  dog seems stressed, over-excited or frustrated.
                </Disclaimer>
              </div>
            </aside>
          </div>

          {/* result */}
          <div id="result" className="scroll-mt-28 mt-12">
            {submitted && plan && (
              <div className="rounded-[2rem] bg-white ring-1 ring-navy/5 shadow-card p-7 sm:p-10">
                <p className="eyebrow">Your enrichment plan</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                  {dogName ? `${dogName}'s plan starts with ` : 'Start with '}
                  {plan.primary.toLowerCase()}
                </h2>
                <p className="mt-2 text-muted">{plan.intensity} {plan.stageNote}</p>

                {submitMessage && (
                  <div
                    className={`mt-5 rounded-2xl border p-4 text-sm font-bold ${
                      submitStatus === 'success'
                        ? 'border-teal/20 bg-teal/10 text-teal'
                        : 'border-orange/20 bg-orange/10 text-orange'
                    }`}
                    aria-live="polite"
                  >
                    {submitMessage}
                    {resultUrl && (
                      <a
                        href={resultUrl}
                        className="ml-2 inline-flex text-teal underline underline-offset-4"
                      >
                        Open saved result
                      </a>
                    )}
                  </div>
                )}

                <div className="mt-7 grid lg:grid-cols-2 gap-5">
                  <div className="rounded-2xl bg-orange/10 p-6">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-orange">Primary focus</p>
                    <h3 className="mt-1 font-display text-2xl text-navy">{plan.primary}</h3>
                    <ul className="mt-3 space-y-2">
                      {plan.ideas.map((i) => (
                        <li key={i} className="flex items-start gap-3 text-navy/85 text-sm">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-teal/10 p-6">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-teal">Add a little of</p>
                    <h3 className="mt-1 font-display text-2xl text-navy">{plan.supportLabel}</h3>
                    <ul className="mt-3 space-y-2">
                      {plan.supportIdeas.map((i) => (
                        <li key={i} className="flex items-start gap-3 text-navy/85 text-sm">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-cream p-5 border border-navy/5 flex items-start gap-3">
                  <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-orange/15 text-orange shrink-0">
                    <Icon name="bowl" className="w-4 h-4" />
                  </span>
                  <p className="text-sm text-navy/85">
                    <strong className="text-navy">Toy category to look at:</strong> {plan.toy}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/resources/?category=enrichment" className="btn-primary">
                    Browse enrichment ideas
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/resources/?category=feeding" className="btn-secondary">
                    Explore feeding guides
                  </Link>
                  <a
                    href={SITE.shopUrl}
                    className="btn-ghost"
                    onClick={() => trackVisitShop('enrichment_finder_result')}
                  >
                    Visit Shop
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="mt-16">
            <div className="flex items-end justify-between gap-3 mb-6">
              <h2 className="font-display text-2xl sm:text-3xl text-navy">Helpful next steps</h2>
              <Link to="/resources/" className="text-sm font-bold text-teal hover:text-teal-deep inline-flex items-center gap-1.5">
                See all resources <Icon name="arrowRight" className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {next.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
