import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'
import TrustPoints from './TrustPoints.jsx'
import { ImagePlaceholder } from './placeholders/Scenes.jsx'
import { PawMark } from './PawAccent.jsx'
import { resourceHubImages } from '../data/imageAssets.js'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#fff8ef_0%,#fff3e6_100%)]" aria-hidden>
        <PawMark className="absolute top-24 left-8 opacity-15 rotate-[-18deg]" size={28} color="#138fa1" />
        <PawMark className="absolute top-40 right-1/4 opacity-10 rotate-[8deg]" size={20} color="#f58232" />
      </div>

      <div className="max-w-7xl mx-auto container-px pt-12 lg:pt-20 pb-14 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">Pawzzles Resource Hub</p>
            <h1
              id="hero-heading"
              className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-navy"
            >
              Dog tools and guides for{' '}
              <span className="text-orange">everyday</span>{' '}
              <span className="text-teal">dog care</span>
            </h1>
            <p className="mt-5 text-lg text-muted max-w-xl">
              Behaviour-led guidance, practical tools and dog-friendly advice
              designed to support enrichment, routine and wellbeing.
            </p>

            <div className="mt-8 max-w-xl">
              <SearchBar />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to="/calculators/dog-feeding-calculator"
                className="btn-primary"
              >
                Try the feeding calculator
              </Link>
              <Link to="/resources" className="btn-secondary">
                Browse resources
              </Link>
            </div>

            <div className="mt-10 max-w-xl">
              <TrustPoints />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 -z-10" aria-hidden>
                <div className="absolute top-6 left-6 right-6 bottom-6 rounded-[42%_58%_44%_56%/52%_42%_58%_48%] bg-teal-soft" />
              </div>

              <div className="relative aspect-[5/5] sm:aspect-[6/6] rounded-[2.25rem] overflow-hidden ring-1 ring-navy/5 shadow-card bg-white">
                <ImagePlaceholder
                  name="hero-resource-hub"
                  src={resourceHubImages['hero-resource-hub']}
                  alt="Happy dog in warm outdoor light with cream, orange and teal accents"
                  label="Happy dog in a Pawzzles resource hub scene"
                  loading="eager"
                  imgClassName="absolute inset-0 w-full h-full object-cover object-[62%_50%]"
                />
              </div>

              <div className="absolute z-20 -left-3 sm:-left-6 bottom-8 bg-white rounded-2xl px-4 py-3 shadow-card flex items-center gap-3 max-w-[240px]">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-orange text-white">
                  <PawMark size={18} />
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-extrabold text-navy">Puppy → Senior</p>
                  <p className="text-[11px] text-muted">Made for every life stage</p>
                </div>
              </div>

              <div className="absolute z-20 -right-2 sm:-right-4 top-6 bg-white rounded-2xl px-4 py-3 shadow-card flex items-center gap-3">
                <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-teal text-white">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v3M3 12h3M21 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-extrabold text-navy">2 working tools</p>
                  <p className="text-[11px] text-muted">Feeding & enrichment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
