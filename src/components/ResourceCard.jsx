import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { ImagePlaceholder } from './placeholders/Scenes.jsx'

const TYPE_STYLES = {
  Calculator: 'bg-orange text-white',
  Tool: 'bg-orange text-white',
  Checklist: 'bg-teal text-white',
  Guide: 'bg-[#5bb47e] text-white',
}

export default function ResourceCard({ resource }) {
  const typeClass = TYPE_STYLES[resource.type] || 'bg-navy text-white'
  const inner = (
    <>
      <div className="relative aspect-[5/4] overflow-hidden">
        <ImagePlaceholder
          name={resource.image}
          src={resource.imageSrc}
          alt={resource.imageAlt}
          label={resource.title}
        />
        <span
          className={`absolute z-20 top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide shadow-soft ring-2 ring-white/90 ${typeClass}`}
        >
          {resource.type}
        </span>
        {resource.comingSoon && (
          <span className="absolute z-20 top-3 right-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-white text-navy/70 border border-navy/10 shadow-soft">
            Coming soon
          </span>
        )}
      </div>
      <div className="px-5 py-5 flex flex-col flex-1">
        <h3 className="font-display text-lg text-navy leading-tight">
          {resource.title}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
          {resource.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            <Icon name="clock" className="w-3.5 h-3.5" />
            {resource.time}
          </span>
          <span className="relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-orange/15 text-orange group-hover:bg-orange group-hover:text-white transition-colors">
            <Icon name="arrowRight" className="w-4 h-4" />
          </span>
        </div>
      </div>
    </>
  )

  const baseClass =
    'group card hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange/30 flex flex-col'

  if (resource.comingSoon) {
    return (
      <div className={`${baseClass} opacity-95`} aria-disabled>
        {inner}
      </div>
    )
  }

  return (
    <Link to={resource.href} className={baseClass}>
      {inner}
    </Link>
  )
}
