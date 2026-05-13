import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../icons/Icons.jsx'
import { PawMark } from '../PawAccent.jsx'
import { SITE } from '../../data/site.js'

const COLUMNS = [
  {
    title: 'Calculators',
    links: [
      { label: 'Feeding Calculator', to: '/calculators/dog-feeding-calculator' },
      { label: 'Enrichment Finder', to: '/calculators/enrichment-finder' },
      { label: 'All resources', to: '/resources' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'All resources', to: '/resources' },
      { label: 'Puppy checklist', to: '/resources/puppy-socialisation-checklist' },
      { label: 'Enrichment ideas', to: '/resources/best-dog-enrichment-ideas' },
      { label: 'Toy safety', to: '/resources/toy-safety-guide' },
    ],
  },
  {
    title: 'Topics',
    links: [
      { label: 'Feeding', to: '/resources?category=feeding' },
      { label: 'Enrichment', to: '/resources?category=enrichment' },
      { label: 'Puppy', to: '/resources?category=puppy' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Pawzzles', to: '/about' },
      { label: 'Our approach', to: '/about' },
      { label: 'Contact us', to: '/resources' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Visit shop', external: SITE.shopUrl },
    ],
  },
]

function Social({ children, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  function openCookieSettings() {
    window.dispatchEvent(new Event('pawzzles:open-cookie-settings'))
  }

  return (
    <footer className="relative bg-teal-deep text-white">
      <PawMark className="absolute top-10 right-10 opacity-10" color="#fff" size={36} />
      <PawMark className="absolute bottom-20 left-6 opacity-10" color="#fff" size={28} />

      <div className="max-w-7xl mx-auto container-px py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center" aria-label="Pawzzles home">
              <img
                src="/pawzzles-logo.svg"
                alt="Pawzzles"
                className="h-14 w-auto bg-white/95 rounded-2xl p-1.5"
                draggable="false"
              />
            </Link>
            <p className="mt-4 text-white/85 text-sm max-w-xs">
              Practical tools and dog-friendly guidance built for everyday dog care.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Social label="Instagram">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                </svg>
              </Social>
              <Social label="Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M13.5 22V13h3l.5-3.5h-3.5V7.4c0-1 .3-1.7 1.8-1.7H17V2.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.7H7V13h3.3v9h3.2Z" />
                </svg>
              </Social>
              <Social label="TikTok">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M16 3c.4 2.2 1.9 3.7 4 3.9V10c-1.5 0-2.9-.4-4-1.2V15a6 6 0 1 1-6-6v3.1a3 3 0 1 0 3 3V3h3Z" />
                </svg>
              </Social>
              <Social label="YouTube">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M22 12c0-1.7-.2-3.4-.5-4.2-.2-.7-.8-1.2-1.4-1.4C18.6 6 12 6 12 6s-6.6 0-8.1.4c-.7.2-1.2.7-1.4 1.4C2.2 8.6 2 10.3 2 12s.2 3.4.5 4.2c.2.7.8 1.2 1.4 1.4 1.5.4 8.1.4 8.1.4s6.6 0 8.1-.4c.7-.2 1.2-.7 1.4-1.4.3-.8.5-2.5.5-4.2Zm-12 3V9l5 3-5 3Z" />
                </svg>
              </Social>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-base text-white">{col.title}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) =>
                    l.external ? (
                      <li key={l.label}>
                        <a href={l.external} className="text-sm text-white/80 hover:text-white">
                          {l.label}
                        </a>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <Link to={l.to} className="text-sm text-white/80 hover:text-white">
                          {l.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-lg">Questions about your dog?</h3>
            <p className="text-sm text-white/80 mt-1">We&apos;re building this hub for owners like you.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/resources"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-white/30 hover:border-white text-white font-bold text-sm transition-colors"
              >
                Explore resources
                <Icon name="arrowRight" className="w-4 h-4" />
              </Link>
              <a
                href={SITE.shopUrl}
                className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-white text-teal-deep font-bold text-sm transition-colors hover:bg-cream"
              >
                Visit Shop
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto container-px py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/75">
          <p>© {new Date().getFullYear()} Pawzzles. General guidance only.</p>
          <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <li className="inline-flex items-center gap-1.5"><Icon name="brain" className="w-3.5 h-3.5" />Behaviour-led</li>
            <li className="inline-flex items-center gap-1.5"><Icon name="wrench" className="w-3.5 h-3.5" />Practical tools</li>
            <li className="inline-flex items-center gap-1.5"><Icon name="heart" className="w-3.5 h-3.5" />Built for everyday care</li>
            <li>
              <button
                type="button"
                onClick={openCookieSettings}
                className="font-bold text-white/85 hover:text-white"
              >
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
