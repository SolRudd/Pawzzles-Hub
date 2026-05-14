import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import SEOHead from '../components/SEOHead.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { ImagePlaceholder } from '../components/placeholders/Scenes.jsx'
import { PawMark } from '../components/PawAccent.jsx'
import { getResource } from '../data/resources.js'
import { resourceHubImages } from '../data/imageAssets.js'
import { SITE, absoluteUrl } from '../data/site.js'
import { trackAppEvent, trackVisitShop } from '../lib/tracking.js'

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

function calculate({ weight, stageId, activityId, goalId, kcalPer100g }) {
  const w = parseFloat(weight)
  if (!w || w <= 0) return null
  const stage = LIFE_STAGES.find((s) => s.id === stageId) || LIFE_STAGES[2]
  const activity = ACTIVITY.find((a) => a.id === activityId) || ACTIVITY[1]
  const goal = GOAL.find((g) => g.id === goalId) || GOAL[0]

  const rer = 70 * Math.pow(w, 0.75)
  const mer = rer * stage.factor * activity.mult * goal.mult

  const kcal = parseFloat(kcalPer100g)
  const grams = kcal > 0 ? Math.round((mer / kcal) * 100) : null

  return {
    rer: Math.round(rer),
    daily: Math.round(mer),
    grams,
    stage: stage.label,
    activity: activity.label,
    goal: goal.label,
  }
}

function FormGroup({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-extrabold text-navy">{label}</span>
      {hint && <span className="block text-xs text-muted mt-0.5">{hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  )
}

const inputCls =
  'w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:border-orange/40'

export default function DogFeedingCalculator() {
  const [dogName, setDogName] = useState('')
  const [weight, setWeight] = useState('')
  const [stageId, setStageId] = useState('adult-neutered')
  const [activityId, setActivityId] = useState('medium')
  const [goalId, setGoalId] = useState('maintain')
  const [kcalPer100g, setKcalPer100g] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Dog Feeding Calculator | Pawzzles'
    return () => {
      document.title = 'Pawzzles Resource Hub | Practical Tools for Dog Owners'
    }
  }, [])

  const result = useMemo(
    () => calculate({ weight, stageId, activityId, goalId, kcalPer100g }),
    [weight, stageId, activityId, goalId, kcalPer100g],
  )

  function onSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (result) {
      trackAppEvent('feeding_calculator_completed', {
        source_component: 'feeding_calculator_form',
        calculator_type: 'dog_feeding',
      })
    }
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const next = ['best-dog-enrichment-ideas', 'puppy-socialisation-checklist', 'toy-safety-guide']
    .map((id) => getResource(id))
    .filter(Boolean)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Dog Feeding Calculator',
    url: absoluteUrl('/calculators/dog-feeding-calculator'),
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
        canonical="/calculators/dog-feeding-calculator"
        structuredData={schema}
      />
      <PageHero
        eyebrow="Calculator"
        title="Dog Feeding Calculator"
        intro="A practical starting point for daily portions. Pop in your dog's details below and we'll suggest daily calories, plus grams per day if you know your food's energy density."
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Resources', to: '/resources' },
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
                  <FormGroup label="Dog name" hint="Optional, just for friendlier results">
                    <input
                      type="text"
                      value={dogName}
                      onChange={(e) => setDogName(e.target.value)}
                      placeholder="e.g. Cooper"
                      className={inputCls}
                    />
                  </FormGroup>

                  <FormGroup label="Weight (kg)" hint="Your dog's current weight">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      required
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 12"
                      className={inputCls}
                    />
                  </FormGroup>

                  <FormGroup label="Age / life stage">
                    <select
                      value={stageId}
                      onChange={(e) => setStageId(e.target.value)}
                      className={inputCls}
                    >
                      {LIFE_STAGES.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup label="Activity level">
                    <select
                      value={activityId}
                      onChange={(e) => setActivityId(e.target.value)}
                      className={inputCls}
                    >
                      {ACTIVITY.map((a) => (
                        <option key={a.id} value={a.id}>{a.label}</option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup label="Body condition goal">
                    <select
                      value={goalId}
                      onChange={(e) => setGoalId(e.target.value)}
                      className={inputCls}
                    >
                      {GOAL.map((g) => (
                        <option key={g.id} value={g.id}>{g.label}</option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup
                    label="Food kcal per 100g"
                    hint="Optional, check the food packaging. Adds grams per day to your result."
                  >
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={kcalPer100g}
                      onChange={(e) => setKcalPer100g(e.target.value)}
                      placeholder="e.g. 360"
                      className={inputCls}
                    />
                  </FormGroup>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn-primary">
                    Calculate portion
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDogName('')
                      setWeight('')
                      setStageId('adult-neutered')
                      setActivityId('medium')
                      setGoalId('maintain')
                      setKcalPer100g('')
                      setSubmitted(false)
                    }}
                    className="btn-ghost"
                  >
                    Reset
                  </button>
                </div>
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
                  <li>If you add food kcal/100g, we convert to grams per day.</li>
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
                  Based on {result.stage.toLowerCase()}, {result.activity.toLowerCase()}, goal: {result.goal.toLowerCase()}.
                </p>

                <div className="mt-6 grid sm:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-orange/10 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-orange">Daily calories</p>
                    <p className="mt-1 font-display text-3xl text-navy">{result.daily} <span className="text-base font-body font-bold text-muted">kcal</span></p>
                  </div>
                  <div className="rounded-2xl bg-teal/10 p-5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-teal">Grams per day</p>
                    <p className="mt-1 font-display text-3xl text-navy">
                      {result.grams ? <>{result.grams} <span className="text-base font-body font-bold text-muted">g</span></> : <span className="text-base font-body text-muted">Add food kcal/100g</span>}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-cream p-5 border border-navy/5">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-muted">Resting energy</p>
                    <p className="mt-1 font-display text-3xl text-navy">{result.rer} <span className="text-base font-body font-bold text-muted">kcal</span></p>
                  </div>
                </div>

                <div className="mt-7">
                  <Disclaimer />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/resources?category=feeding" className="btn-primary">
                    Explore feeding guides
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/resources?category=enrichment" className="btn-secondary">
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

                <NewsletterSignup
                  variant="compact"
                  sourceComponent="feeding_calculator_result"
                  interests={['feeding', 'calculator']}
                  className="mt-8"
                />
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
              <Link to="/resources" className="text-sm font-bold text-teal hover:text-teal-deep inline-flex items-center gap-1.5">
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
