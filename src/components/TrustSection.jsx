import React from 'react'
import { Icon } from './icons/Icons.jsx'
import { trustCards } from '../data/trust.js'
import { PawMark } from './PawAccent.jsx'

const ICON_BG = {
  brain: 'bg-teal/10 text-teal',
  leaf: 'bg-[#5bb47e]/10 text-[#3f8a5e]',
  tools: 'bg-orange/15 text-orange',
  heart: 'bg-orange/15 text-orange',
}

export default function TrustSection() {
  return (
    <section id="trust" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">About Pawzzles</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-navy inline-flex items-center gap-3">
              Why trust Pawzzles?
              <PawMark size={24} color="#f58232" />
            </h2>
            <p className="mt-2 text-muted">
              Built by dog people, for dog people — with care, simplicity and a
              lot of love.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {trustCards.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl bg-cream border border-navy/5 p-7 hover:shadow-card hover:-translate-y-0.5 transition-all"
            >
              <span
                className={`inline-flex w-12 h-12 items-center justify-center rounded-2xl ${ICON_BG[c.icon] || 'bg-teal/10 text-teal'}`}
              >
                <Icon name={c.icon} className="w-5 h-5" />
              </span>
              <h3 className="mt-4 font-display text-lg text-navy leading-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {c.copy}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted text-center max-w-3xl mx-auto">
          The information on Pawzzles is general guidance only and is not
          medical or veterinary advice. Always speak to a qualified
          professional if your dog has health issues or special needs.
        </p>
      </div>
    </section>
  )
}
