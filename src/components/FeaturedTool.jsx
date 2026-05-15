import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { ImagePlaceholder } from './placeholders/Scenes.jsx'
import { PawMark } from './PawAccent.jsx'
import { resourceHubImages } from '../data/imageAssets.js'

const BULLETS = [
  'Helpful starting portion estimate',
  'Adjusts for life stage and activity',
  'Uses food type or label kcal for grams per day',
  'General guidance only',
]

export default function FeaturedTool() {
  return (
    <section id="feeding-calculator" className="py-24 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto container-px">
        <div className="relative isolate rounded-[2.25rem] bg-gradient-to-br from-soft-blue via-white to-orange-soft/60 overflow-hidden ring-1 ring-teal/10 shadow-card">
          <PawMark className="absolute top-6 left-8 opacity-20 rotate-[-12deg]" color="#138fa1" size={26} />
          <PawMark className="absolute bottom-8 right-10 opacity-20 rotate-[18deg]" color="#138fa1" size={32} />

          <div className="relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center p-7 sm:p-10 lg:p-16">
            <div className="lg:col-span-5">
              <p className="eyebrow inline-flex items-center gap-2">
                <Icon name="sparkle" className="w-3.5 h-3.5" />
                Featured tool
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-navy">
                Dog Feeding Calculator
              </h2>
              <p className="mt-4 text-muted text-base sm:text-lg max-w-xl">
                Get a helpful starting point for daily portions based on your
                dog&apos;s weight, life stage and activity.
              </p>
              <ul className="mt-6 space-y-2.5">
                {BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-navy/90">
                    <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-teal text-white shrink-0">
                      <Icon name="check" className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm sm:text-base">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/calculators/dog-feeding-calculator"
                  className="btn-primary"
                >
                  Launch calculator
                </Link>
                <Link
                  to="/calculators/enrichment-finder"
                  className="btn-ghost inline-flex items-center gap-1.5"
                >
                  Try the Enrichment Finder
                  <Icon name="arrowRight" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative pb-10 lg:pb-0">
                <div className="relative aspect-[5/4] rounded-3xl overflow-hidden ring-1 ring-navy/5 shadow-card bg-white">
                  <ImagePlaceholder
                    name="calculator-feeding"
                    src={resourceHubImages['calculator-feeding']}
                    alt="Dog beside a food bowl and blank calculator props"
                    label="Dog feeding calculator"
                    imgClassName="absolute inset-0 w-full h-full object-cover object-[60%_50%]"
                  />
                </div>

                <div className="absolute z-40 -left-2 sm:-left-6 -top-5 sm:top-7 bg-white rounded-3xl shadow-card px-5 py-4 ring-4 ring-soft-blue max-w-[205px]">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-teal">
                    What you get
                  </p>
                  <p className="mt-1 text-sm text-navy font-bold leading-tight">
                    Daily calories &amp; grams per day
                  </p>
                </div>

                <div className="relative z-40 -mt-8 lg:mt-0 lg:absolute lg:right-4 lg:-bottom-9 bg-white rounded-2xl shadow-card p-5 max-w-sm lg:max-w-xs mx-auto lg:mx-0">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-orange">
                    Owner tip
                  </p>
                  <p className="mt-2 text-sm text-navy leading-relaxed">
                    Food type changes the estimate. Use your dog food's kcal
                    per 100g when you have it.
                  </p>
                  <Link
                    to="/calculators/dog-feeding-calculator"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-teal-deep"
                  >
                    Try it now
                    <Icon name="arrowRight" className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
