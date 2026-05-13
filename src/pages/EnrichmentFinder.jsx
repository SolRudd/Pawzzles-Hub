import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { ImagePlaceholder } from '../components/placeholders/Scenes.jsx'
import { PawMark } from '../components/PawAccent.jsx'
import { getResource } from '../data/resources.js'
import { resourceHubImages } from '../data/imageAssets.js'

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
  { id: 'boredom', label: 'Stop boredom' },
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
      'Hide-and-find treat games inside boxes',
    ],
  },
  solver: {
    primary: 'Puzzles and problem-solving',
    toy: 'Puzzle feeders & treat-dispensers',
    ideas: [
      'Stacked cardboard puzzles (start easy)',
      'Treat-dispensing balls during quiet time',
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
    stage === 'senior' ? 'Choose low-impact options — sniffing and soft chewing are excellent.' :
    stage === 'adolescent' ? 'Predictable routine helps — variety inside the same time slots.' :
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

const inputCls =
  'w-full rounded-2xl border border-navy/10 bg-white px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:border-orange/40'

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
        active
          ? 'bg-orange text-white border-orange'
          : 'bg-white text-navy/80 border-navy/10 hover:border-orange/40 hover:text-orange'
      }`}
    >
      {children}
    </button>
  )
}

export default function EnrichmentFinder() {
  const [stage, setStage] = useState('adult')
  const [energy, setEnergy] = useState('medium')
  const [goal, setGoal] = useState('boredom')
  const [style, setStyle] = useState('sniffer')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Enrichment Finder — Pawzzles'
    return () => {
      document.title = 'Pawzzles Resource Hub — Practical Tools for Dog Owners'
    }
  }, [])

  const plan = useMemo(
    () => recommend({ stage, energy, goal, style }),
    [stage, energy, goal, style],
  )

  function onSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const next = ['best-dog-enrichment-ideas', 'toy-safety-guide', 'puppy-socialisation-checklist']
    .map((id) => getResource(id))
    .filter(Boolean)

  return (
    <>
      <PageHero
        eyebrow="Tool"
        title="Enrichment Finder"
        intro="Answer four quick questions and we'll suggest enrichment ideas matched to your dog."
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Resources', to: '/resources' },
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

                <div>
                  <p className="text-sm font-extrabold text-navy">Life stage</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {STAGES.map((s) => (
                      <Chip key={s.id} active={stage === s.id} onClick={() => setStage(s.id)}>
                        {s.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-navy">Energy level</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ENERGY.map((e) => (
                      <Chip key={e.id} active={energy === e.id} onClick={() => setEnergy(e.id)}>
                        {e.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-navy">Main goal</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {GOALS.map((g) => (
                      <Chip key={g.id} active={goal === g.id} onClick={() => setGoal(g.id)}>
                        {g.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-extrabold text-navy">Play style</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {STYLES.map((s) => (
                      <Chip key={s.id} active={style === s.id} onClick={() => setStyle(s.id)}>
                        {s.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button type="submit" className="btn-primary">
                    Get my plan
                  </button>
                  <Link to="/resources/best-dog-enrichment-ideas" className="btn-ghost">
                    See all enrichment ideas
                  </Link>
                </div>
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
          <div id="result" className="mt-12">
            {submitted && plan && (
              <div className="rounded-[2rem] bg-white ring-1 ring-navy/5 shadow-card p-7 sm:p-10">
                <p className="eyebrow">Your enrichment plan</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                  Start with {plan.primary.toLowerCase()}
                </h2>
                <p className="mt-2 text-muted">{plan.intensity} {plan.stageNote}</p>

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
                  <Link to="/resources/best-dog-enrichment-ideas" className="btn-primary">
                    Read the full enrichment guide
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                  <Link to="/resources/toy-safety-guide" className="btn-secondary">
                    Check toy safety
                  </Link>
                </div>
              </div>
            )}
          </div>

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
