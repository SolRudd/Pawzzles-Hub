import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { ImagePlaceholder } from './placeholders/Scenes.jsx'
import { PawMark } from './PawAccent.jsx'
import { hubs } from '../data/hubs.js'

const ACCENTS = {
  orange: { badge: 'bg-orange text-white', link: 'text-orange', dot: 'bg-orange' },
  teal: { badge: 'bg-teal text-white', link: 'text-teal', dot: 'bg-teal' },
  green: { badge: 'bg-[#5bb47e] text-white', link: 'text-[#3f8a5e]', dot: 'bg-[#5bb47e]' },
}

function HubCard({ hub }) {
  const accent = ACCENTS[hub.accent] || ACCENTS.teal
  return (
    <Link
      to={hub.href}
      className="group card hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange/30 flex flex-col"
    >
      <div className="relative z-20">
        <div className="aspect-[5/3] overflow-hidden">
          <ImagePlaceholder
            name={hub.image}
            src={hub.imageSrc}
            alt={hub.imageAlt}
            label={hub.title}
          />
        </div>
        <span
          className={`absolute z-30 -bottom-6 left-6 inline-flex w-14 h-14 items-center justify-center rounded-2xl shadow-card ring-4 ring-white ${accent.badge}`}
        >
          <Icon name={hub.icon} className="w-5 h-5" />
        </span>
      </div>
      <div className="relative z-10 px-6 pt-11 pb-7 flex flex-col flex-1">
        <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-muted">
          {hub.eyebrow}
        </p>
        <h3 className="mt-1 font-display text-2xl text-navy leading-tight">
          {hub.title}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          {hub.description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {hub.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-navy/85">
              <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
              {b}
            </li>
          ))}
        </ul>
        <span
          className={`mt-6 inline-flex items-center gap-1.5 font-bold text-sm ${accent.link} group-hover:gap-2.5 transition-all`}
        >
          {hub.cta}
          <Icon name="arrowRight" className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

export default function HubCards() {
  return (
    <section id="hubs" className="relative py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Explore the hub</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-navy inline-flex items-center justify-center gap-3">
            Where would you like to start
            <PawMark size={26} color="#f58232" />
          </h2>
          <p className="mt-3 text-muted text-base sm:text-lg">
            Three simple ways into the hub. Pick what feels most useful today.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
          {hubs.map((h) => (
            <HubCard key={h.id} hub={h} />
          ))}
        </div>
      </div>
    </section>
  )
}
