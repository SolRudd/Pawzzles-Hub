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

const LIFE_STAGES = [
  { id: 'puppy-young', label: 'Puppy (under 4 months)', factor: 3.0 },
  { id: 'puppy-old', label: 'Puppy (4 to 12 months)', factor: 2.0 },
  { id: 'adult-neutered', label: 'Adult, neutered', factor: 1.6 },
  { id: 'adult-intact', label: 'Adult, intact', factor: 1.8 },
  { id: 'senior', label: 'Senior (7+ years)', factor: 1.4 },
]

const ACTIVITY = [
  { id: 'low', label: 'Low, mostly indoors', mult: 0.9 },
  { id: 'medium', label: 'Medium, daily walks', mult: 1.0 },
  { id: 'high', label: 'High, long walks or runs', mult: 1.2 },
  { id: 'very-high', label: 'Very high, sports or working', mult: 1.4 },
]

const GOAL = [
  { id: 'maintain', label: 'Maintain weight', mult: 1.0 },
  { id: 'lose', label: 'Lose weight gently', mult: 0.85 },
  { id: 'gain', label: 'Gain weight gently', mult: 1.15 },
]

const FOOD_TYPES = [
  { id: 'dry_kibble', label: 'Dry food / kibble', fallbackKcalPer100g: 360 },
  { id: 'wet_pouch_tray', label: 'Wet food / pouches / trays', fallbackKcalPer100g: 100 },
  { id: 'complete_raw', label: 'Complete raw food', fallbackKcalPer100g: 150 },
  { id: 'mixed_feeding', label: 'Mixed feeding' },
  { id: 'known_kcal', label: 'I know the kcal per 100g' },
]

const FOOD_ENERGY_NOTE =
  'Food energy varies by brand and recipe. For the most accurate result, use the kcal per 100g from your dog food packaging or the manufacturer’s website.'

const MIXED_FEEDING_MESSAGE =
  'Mixed feeding varies too much for a single grams/day estimate. Use the kcal per 100g from your products, or calculate each food separately.'

function getManualKcal(value) {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

function resolveFoodEnergy({ foodTypeId, kcalPer100g }) {
  const foodType = FOOD_TYPES.find((item) => item.id === foodTypeId) || FOOD_TYPES[0]
  const manualKcal = getManualKcal(kcalPer100g)

  if (manualKcal) {
    return {
      foodTypeId: foodType.id,
      foodTypeLabel: foodType.label,
      kcalPer100gUsed: manualKcal,
      kcalSource: 'food_label',
      kcalSourceLabel: 'From food label',
      gramsLabel: 'Estimated grams per day using your food’s kcal value',
      gramsMessage: '',
      kcalIsEstimated: false,
    }
  }

  if (foodType.fallbackKcalPer100g) {
    return {
      foodTypeId: foodType.id,
      foodTypeLabel: foodType.label,
      kcalPer100gUsed: foodType.fallbackKcalPer100g,
      kcalSource: 'estimated_fallback',
      kcalSourceLabel: 'Estimated fallback',
      gramsLabel: 'Estimated grams per day',
      gramsMessage: '',
      kcalIsEstimated: true,
    }
  }

  return {
    foodTypeId: foodType.id,
    foodTypeLabel: foodType.label,
    kcalPer100gUsed: null,
    kcalSource: foodType.id === 'mixed_feeding' ? 'mixed_feeding' : 'not_provided',
    kcalSourceLabel: foodType.id === 'mixed_feeding' ? 'Mixed feeding' : 'Not provided',
    gramsLabel: 'Estimated grams per day',
    gramsMessage:
      foodType.id === 'mixed_feeding'
        ? MIXED_FEEDING_MESSAGE
        : 'Add the kcal per 100g from your dog food label to estimate grams per day.',
    kcalIsEstimated: false,
  }
}

function calculate({ weight, stageId, activityId, goalId, foodTypeId, kcalPer100g }) {
  const w = parseFloat(weight)
  if (!w || w <= 0) return null
  const stage = LIFE_STAGES.find((s) => s.id === stageId) || LIFE_STAGES[2]
  const activity = ACTIVITY.find((a) => a.id === activityId) || ACTIVITY[1]
  const goal = GOAL.find((g) => g.id === goalId) || GOAL[0]
  const foodEnergy = resolveFoodEnergy({ foodTypeId, kcalPer100g })

  const rer = 70 * Math.pow(w, 0.75)
  const mer = rer * stage.factor * activity.mult * goal.mult
  const dailyCalories = Math.round(mer)

  const grams =
    foodEnergy.kcalPer100gUsed > 0
      ? Math.round((dailyCalories / foodEnergy.kcalPer100gUsed) * 100)
      : null

  return {
    rer: Math.round(rer),
    daily: dailyCalories,
    grams,
    gramsPerDay: grams,
    stage: stage.label,
    activity: activity.label,
    goal: goal.label,
    foodTypeId: foodEnergy.foodTypeId,
    foodTypeLabel: foodEnergy.foodTypeLabel,
    kcalPer100gUsed: foodEnergy.kcalPer100gUsed,
    kcalSource: foodEnergy.kcalSource,
    kcalSourceLabel: foodEnergy.kcalSourceLabel,
    kcalIsEstimated: foodEnergy.kcalIsEstimated,
    gramsLabel: foodEnergy.gramsLabel,
    gramsMessage: foodEnergy.gramsMessage,
    foodEnergyNote: FOOD_ENERGY_NOTE,
  }
}

export default function DogFeedingCalculator() {
  const location = useLocation()
  const [dogName, setDogName] = useState('')
  const [weight, setWeight] = useState('')
  const [stageId, setStageId] = useState('adult-neutered')
  const [activityId, setActivityId] = useState('medium')
  const [goalId, setGoalId] = useState('maintain')
  const [foodTypeId, setFoodTypeId] = useState('dry_kibble')
  const [kcalPer100g, setKcalPer100g] = useState('')
  const [email, setEmail] = useState('')
  const [resultEmailConsent, setResultEmailConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [resultUrl, setResultUrl] = useState('')

  useEffect(() => {
    document.title = 'Dog Feeding Calculator | Pawzzles'
    return () => {
      document.title = 'Pawzzles Resource Hub | Practical Tools for Dog Owners'
    }
  }, [])

  const result = useMemo(
    () => calculate({ weight, stageId, activityId, goalId, foodTypeId, kcalPer100g }),
    [weight, stageId, activityId, goalId, foodTypeId, kcalPer100g],
  )

  function validateForm(calculatedResult) {
    const nextErrors = {}
    const numericWeight = parseFloat(weight)

    if (!numericWeight || numericWeight <= 0) {
      nextErrors.weight = "Please enter your dog's weight."
    }

    if (!isValidResultEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!resultEmailConsent) {
      nextErrors.resultEmailConsent = RESULT_EMAIL_CONSENT_ERROR
    }

    if (!calculatedResult) {
      nextErrors.form = 'Please check the details above to calculate a result.'
    }

    return nextErrors
  }

  async function onSubmit(e) {
    e.preventDefault()
    const nextErrors = validateForm(result)
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

    trackAppEvent('feeding_calculator_completed', {
      source_component: 'feeding_calculator_result',
      calculator_type: 'dog_feeding',
    })

    const preferences = getConsentPreferences()
    const response = await emailCalculatorResult({
      email,
      dogName,
      calculatorType: 'dog_feeding',
      inputData: {
        dogName,
        weight,
        stageId,
        activityId,
        goalId,
        foodTypeId,
        kcalPer100g,
      },
      resultData: result,
      sourcePage: location.pathname,
      sourceComponent: 'feeding_calculator_result',
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
      interests: ['feeding', 'mealtime_routines'],
      timestamp: new Date().toISOString(),
    })

    if (response.ok) {
      setSubmitStatus('success')
      setSubmitMessage('Your result has been emailed. You can also view it below.')
      setResultUrl(response.resultUrl || '')
      return
    }

    setSubmitStatus('warning')
    setSubmitMessage('Your result is shown below, but we could not email it. Please try again.')
  }

  const next = ['how-to-read-dog-food-feeding-labels', 'slow-feeder-guide', 'mealtime-enrichment-ideas']
    .map((id) => getResource(id))
    .filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Dog Feeding Calculator',
    url: absoluteUrl('/calculators/dog-feeding-calculator/'),
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Web',
    description:
      'A Pawzzles practical feeding calculator for everyday dog portion planning.',
    publisher: {
      '@type': 'Organization',
      name: SITE.brandName,
    },
  }

  return (
    <>
      <SEOHead
        title="Dog Feeding Calculator | Pawzzles Practical Feeding Tool"
        description="Use the Pawzzles dog feeding calculator as a practical starting point for daily portions, calories and mealtime planning."
        canonical="/calculators/dog-feeding-calculator/"
        structuredData={schema}
      />
      <PageHero
        eyebrow="Calculator"
        title="Dog Feeding Calculator"
        intro="A practical starting point for daily portions. Food type matters because dry, wet, pouch, tray and raw foods have different moisture levels and calorie density."
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Resources', to: '/resources/' },
          { label: 'Dog Feeding Calculator' },
        ]}
        meta={[
          { icon: 'clock', label: '2 min tool' },
          { icon: 'paw', label: 'General guidance' },
        ]}
      />

      <section className="pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            {/* form */}
            <div className="lg:col-span-7">
              <form
                onSubmit={onSubmit}
                className="rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 p-6 sm:p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-orange/15 text-orange">
                    <Icon name="bowl" className="w-5 h-5" />
                  </span>
                  <h2 className="font-display text-2xl text-navy">Your dog</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <InputField
                    id="feeding-dog-name"
                    label="Dog name"
                    helper="Optional. Just for friendlier results."
                    type="text"
                    value={dogName}
                    onChange={(e) => setDogName(e.target.value)}
                    placeholder="e.g. Cooper"
                    disabled={submitStatus === 'loading'}
                  />

                  <InputField
                    id="feeding-weight"
                    label="Weight (kg)"
                    helper="Your dog's current weight in kilograms."
                    type="number"
                    min="0"
                    step="0.1"
                    required
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value)
                      setFieldErrors((current) => ({ ...current, weight: '' }))
                    }}
                    placeholder="e.g. 12"
                    error={fieldErrors.weight}
                    disabled={submitStatus === 'loading'}
                  />

                  <SelectField
                    id="feeding-stage"
                    label="Age / life stage"
                    helper="Choose the option that best fits your dog."
                    value={stageId}
                    onChange={(e) => setStageId(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  >
                    {LIFE_STAGES.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </SelectField>

                  <SelectField
                    id="feeding-activity"
                    label="Activity level"
                    helper="Pick the closest everyday activity level."
                    value={activityId}
                    onChange={(e) => setActivityId(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  >
                    {ACTIVITY.map((a) => (
                      <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                  </SelectField>

                  <SelectField
                    id="feeding-goal"
                    label="Body condition goal"
                    helper="Use the option that matches your current routine."
                    value={goalId}
                    onChange={(e) => setGoalId(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  >
                    {GOAL.map((g) => (
                      <option key={g.id} value={g.id}>{g.label}</option>
                    ))}
                  </SelectField>

                  <SelectField
                    id="feeding-food-type"
                    label="Food type"
                    helper="Choose the closest food type. A food label kcal value overrides the fallback estimate."
                    value={foodTypeId}
                    onChange={(e) => setFoodTypeId(e.target.value)}
                    disabled={submitStatus === 'loading'}
                  >
                    {FOOD_TYPES.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </SelectField>

                  <InputField
                    id="feeding-calories"
                    label="Kcal per 100g from food label"
                    helper={
                      foodTypeId === 'mixed_feeding'
                        ? 'For mixed feeding, enter a kcal value from your products if you want a grams/day estimate.'
                        : 'Optional. Manual kcal is used before any food type fallback.'
                    }
                    type="number"
                    min="0"
                    step="1"
                    value={kcalPer100g}
                    onChange={(e) => setKcalPer100g(e.target.value)}
                    placeholder="e.g. 360"
                    disabled={submitStatus === 'loading'}
                  />

                  <InputField
                    id="feeding-email"
                    label="Email address"
                    helper="We will email your result so you can come back to it later."
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setFieldErrors((current) => ({ ...current, email: '' }))
                    }}
                    placeholder="you@example.com"
                    error={fieldErrors.email}
                    disabled={submitStatus === 'loading'}
                    wrapperClassName="sm:col-span-2"
                  />

                  <div className="sm:col-span-2">
                    <CheckboxField
                      id="feeding-result-email-consent"
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
                    <FormError id="feeding-result-email-consent-error">
                      {fieldErrors.resultEmailConsent}
                    </FormError>
                  </div>

                  <CheckboxField
                    id="feeding-marketing"
                    label="Yes, send me Pawzzles tips, guides and product updates."
                    helper="Optional. Marketing emails are only sent if you opt in."
                    checked={marketingConsent}
                    onChange={setMarketingConsent}
                    disabled={submitStatus === 'loading'}
                    className="sm:col-span-2"
                  />
                </div>

                <FormError id="feeding-form-error">{fieldErrors.form}</FormError>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn-primary" disabled={submitStatus === 'loading'}>
                    {submitStatus === 'loading' ? 'Emailing result...' : 'Calculate and email result'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDogName('')
                      setWeight('')
                      setStageId('adult-neutered')
                      setActivityId('medium')
                      setGoalId('maintain')
                      setFoodTypeId('dry_kibble')
                      setKcalPer100g('')
                      setEmail('')
                      setResultEmailConsent(false)
                      setMarketingConsent(false)
                      setSubmitted(false)
                      setFieldErrors({})
                      setSubmitStatus('idle')
                      setSubmitMessage('')
                      setResultUrl('')
                    }}
                    className="btn-ghost"
                    disabled={submitStatus === 'loading'}
                  >
                    Reset
                  </button>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-muted">
                  The result email is transactional. Marketing emails are only sent if you opt in.
                </p>
              </form>
            </div>

            {/* sidebar / visual */}
            <aside className="lg:col-span-5">
              <div className="rounded-[2rem] bg-soft-blue ring-1 ring-teal/10 p-6 sm:p-8 sticky top-28">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-navy/5 bg-white">
                  <ImagePlaceholder
                    name="calculator-feeding"
                    src={resourceHubImages['calculator-feeding']}
                    alt="Dog beside a food bowl and blank calculator props"
                    label="Dog feeding calculator"
                    imgClassName="absolute inset-0 w-full h-full object-cover object-[62%_50%]"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-navy flex items-center gap-2">
                  <PawMark size={16} color="#f58232" />
                  How it works
                </h3>
                <ol className="mt-3 space-y-2 text-sm text-navy/85 list-decimal pl-5">
                  <li>We estimate resting energy from weight.</li>
                  <li>We adjust for life stage, activity and goal.</li>
                  <li>Food type changes the grams estimate because moisture levels and calorie density vary.</li>
                  <li>If you enter kcal per 100g, we use that before any fallback estimate.</li>
                  <li>Mixed feeding shows daily calories only unless you enter a custom kcal per 100g.</li>
                </ol>
                <Disclaimer className="mt-5" />
              </div>
            </aside>
          </div>

          {/* result */}
          <div id="result" className="scroll-mt-28 mt-12">
            {submitted && result ? (
              <div className="rounded-[2rem] bg-white ring-1 ring-navy/5 shadow-card p-7 sm:p-10">
                <p className="eyebrow">Your result</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                  {dogName ? `${dogName}'s daily portion` : 'Daily portion estimate'}
                </h2>
                <p className="mt-2 text-muted max-w-2xl">
                  Based on {result.stage.toLowerCase()}, {result.activity.toLowerCase()}, goal: {result.goal.toLowerCase()}, food type: {result.foodTypeLabel.toLowerCase()}.
                </p>

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

                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-2xl bg-orange/10 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-orange">Daily calories</p>
                    <p className="mt-1 font-display text-3xl text-navy">{result.daily} <span className="text-base font-body font-bold text-muted">kcal</span></p>
                  </div>
                  {result.grams !== null && (
                    <div className="rounded-2xl bg-teal/10 p-5">
                      <p className="text-xs font-extrabold uppercase tracking-wide text-teal">{result.gramsLabel}</p>
                      <p className="mt-1 font-display text-3xl text-navy">{result.grams} <span className="text-base font-body font-bold text-muted">g</span></p>
                    </div>
                  )}
                  <div className="rounded-2xl bg-soft-blue p-5 border border-teal/10">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-teal">Kcal per 100g used</p>
                    <p className="mt-1 font-display text-2xl text-navy">
                      {result.kcalPer100gUsed ? `${result.kcalPer100gUsed} kcal` : 'No single value'}
                    </p>
                    <p className="mt-1 text-xs font-bold text-muted">{result.kcalSourceLabel}</p>
                  </div>
                  <div className="rounded-2xl bg-cream p-5 border border-navy/5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-muted">Resting energy</p>
                    <p className="mt-1 font-display text-3xl text-navy">{result.rer} <span className="text-base font-body font-bold text-muted">kcal</span></p>
                  </div>
                </div>

                {result.gramsMessage && (
                  <div className="mt-5 rounded-2xl border border-orange/20 bg-orange/10 p-4 text-sm font-bold text-orange">
                    {result.gramsMessage}
                  </div>
                )}

                <p className="mt-5 rounded-2xl bg-cream border border-navy/5 p-4 text-sm leading-relaxed text-navy/85">
                  {result.foodEnergyNote}{' '}
                  <Link to="/resources/how-to-read-dog-food-feeding-labels/" className="font-bold text-teal hover:text-teal-deep">
                    Read the food label guide
                  </Link>
                </p>

                <div className="mt-7">
                  <Disclaimer />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/resources/?category=feeding" className="btn-primary">
                    Explore feeding guides
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/resources/?category=enrichment" className="btn-secondary">
                    Browse enrichment ideas
                  </Link>
                  <a
                    href={SITE.shopUrl}
                    className="btn-ghost"
                    onClick={() => trackVisitShop('feeding_calculator_result')}
                  >
                    Visit Shop
                  </a>
                </div>
              </div>
            ) : submitted ? (
              <div className="rounded-2xl bg-white ring-1 ring-navy/5 p-6 text-center text-muted">
                Please enter your dog&apos;s weight to see a result.
              </div>
            ) : null}
          </div>

          {/* next resources */}
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
