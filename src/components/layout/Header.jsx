import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from '../icons/Icons.jsx'
import { SITE } from '../../data/site.js'
import { trackVisitShop } from '../../lib/tracking.js'

const NAV = [
  { label: 'Resources', to: '/resources/' },
  { label: 'All Guides', to: '/all-guides/' },
  { label: 'Feeding Calculator', to: '/calculators/dog-feeding-calculator/' },
  { label: 'Enrichment Finder', to: '/calculators/enrichment-finder/' },
  { label: 'About', to: '/about/' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const mobileMenuId = 'site-header-mobile-menu'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">
          <Link
            to="/"
            className="inline-flex items-center shrink-0"
            aria-label="Pawzzles Resource Hub home"
          >
            <img
              src="/pawzzles-logo.svg"
              alt="Pawzzles"
              className="h-11 sm:h-12 w-auto"
              draggable="false"
            />
          </Link>
        </div>

        <nav className="site-header__nav" aria-label="Primary">
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

        <div className="site-header__actions">
          <Link
            to="/resources/"
            aria-label="Browse resources"
            className="hidden lg:inline-flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 hover:border-orange/40 hover:text-orange text-navy/70 shadow-soft transition-colors"
          >
            <Icon name="search" className="w-5 h-5" />
          </Link>
          <a
            href={SITE.shopUrl}
            rel="noopener"
            className="hidden lg:inline-flex btn-primary shadow-glow"
            onClick={() => trackVisitShop('header')}
          >
            Visit Shop
          </a>
          <button
            type="button"
            className="site-header__menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={mobileMenuId}
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

      <div
        id={mobileMenuId}
        className={`site-header__mobile-panel ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <nav
          className="max-w-7xl mx-auto container-px py-4 flex flex-col"
          aria-label="Mobile"
        >
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
          <a
            href={SITE.shopUrl}
            rel="noopener"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-base font-bold text-white"
            onClick={() => {
              setOpen(false)
              trackVisitShop('header_mobile')
            }}
          >
            Visit Shop
          </a>
        </nav>
      </div>
    </header>
  )
}
