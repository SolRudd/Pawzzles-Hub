import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'
import { PawMark } from './PawAccent.jsx'

export default function PageHero({
  eyebrow,
  title,
  intro,
  meta = [],
  crumbs = [],
  align = 'left',
  children,
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cream" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-px bg-navy/5" />
        <PawMark className="absolute top-16 left-10 opacity-15" size={22} color="#f58232" />
        <PawMark className="absolute top-28 right-1/4 opacity-10" size={18} color="#138fa1" />
      </div>

      <div className="max-w-7xl mx-auto container-px pt-10 lg:pt-14 pb-10 lg:pb-12">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="inline-flex items-center gap-1.5">
                  {c.to ? (
                    <Link to={c.to} className="hover:text-orange">{c.label}</Link>
                  ) : (
                    <span className="text-navy/70">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && (
                    <Icon name="arrowRight" className="w-3 h-3 opacity-60" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-navy">
            {title}
          </h1>
          {intro && <p className="mt-5 text-lg text-muted">{intro}</p>}
          {meta.length > 0 && (
            <ul className={`mt-5 flex flex-wrap gap-x-4 gap-y-2 ${align === 'center' ? 'justify-center' : ''}`}>
              {meta.map((m) => (
                <li key={m.label} className="inline-flex items-center gap-2 text-xs font-bold text-navy/70">
                  <Icon name={m.icon || 'clock'} className="w-3.5 h-3.5 text-teal" />
                  {m.label}
                </li>
              ))}
            </ul>
          )}
          {children && <div className={`mt-7 ${align === 'center' ? 'flex justify-center' : ''}`}>{children}</div>}
        </div>
      </div>
    </section>
  )
}
