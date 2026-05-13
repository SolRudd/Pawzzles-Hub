import React from 'react'
import { Link } from 'react-router-dom'
import ResourceCard from './ResourceCard.jsx'
import { featuredResources } from '../data/resources.js'
import { Icon } from './icons/Icons.jsx'
import { PawMark } from './PawAccent.jsx'

export default function PopularResources() {
  return (
    <section id="resources" className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto container-px">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl text-navy inline-flex items-center gap-3">
              Start with these
              <PawMark size={24} color="#f58232" />
            </h2>
            <p className="mt-2 text-muted text-base sm:text-lg">
              A small, hand-picked set of practical resources to begin with.
            </p>
          </div>
          <Link
            to="/resources"
            className="inline-flex items-center gap-1.5 font-bold text-teal hover:text-teal-deep"
          >
            See all resources <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
          {featuredResources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
