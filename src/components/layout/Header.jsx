import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from '../icons/Icons.jsx'
import { SITE } from '../../data/site.js'

const NAV = [
  { label: 'Resources', to: '/resources' },
  { label: 'Feeding Calculator', to: '/calculators/dog-feeding-calculator' },
  { label: 'Enrichment Finder', to: '/calculators/enrichment-finder' },
  { label: 'About', to: '/about' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/75 border-b border-navy/5">
      <div className="max-w-7xl mx-auto container-px py-3 sm:py-4 flex items-center gap-4">
        <Link to="/" className="flex items-center shrink-0" aria-label="Pawzzles home">
          <img
            src="/pawzzles-logo.svg"
            alt="Pawzzles"
            className="h-12 sm:h-14 w-auto"
            draggable="false"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 mx-auto" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-full text-sm font-bold transition-colors ${
                  isActive
                    ? 'text-orange bg-orange/10'
                    : 'text-navy/85 hover:text-orange hover:bg-orange/5'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/resources"
            aria-label="Browse resources"
            className="hidden sm:inline-flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 hover:border-orange/40 hover:text-orange text-navy/70 shadow-soft transition-colors"
          >
            <Icon name="search" className="w-5 h-5" />
          </Link>
          <a href={SITE.shopUrl} className="btn-primary shadow-glow">
            Visit Shop
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 text-navy"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M6 18 18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-navy/5 bg-cream">
          <nav className="max-w-7xl mx-auto container-px py-3 flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="py-2.5 text-base font-bold text-navy/85 hover:text-orange"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
