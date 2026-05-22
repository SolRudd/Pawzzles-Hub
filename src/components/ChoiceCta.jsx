import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { SITE } from '../data/site.js'
import { trackVisitShop } from '../lib/tracking.js'

export default function ChoiceCta({ className = '' }) {
  return (
    <div className={`rounded-[2rem] bg-white ring-1 ring-navy/5 shadow-card p-6 sm:p-8 ${className}`}>
      <p className="eyebrow">Need a steer?</p>
      <div className="mt-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl text-navy">
            Need help choosing the right enrichment routine?
          </h2>
          <p className="mt-2 text-muted">
            Use our tools, browse the guides, or head back to the Pawzzles shop
            to find products that fit your dog&apos;s routine.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/resources/" className="btn-secondary">
            Browse resources
          </Link>
          <a
            href={SITE.shopUrl}
            className="btn-primary"
            onClick={() => trackVisitShop('choice_cta')}
          >
            Visit Shop
            <Icon name="arrowRight" className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
