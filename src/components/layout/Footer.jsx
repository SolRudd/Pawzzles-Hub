import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../icons/Icons.jsx'
import { SITE } from '../../data/site.js'
import { trackVisitShop } from '../../lib/tracking.js'

const LINKS = [
  { label: 'Resources', to: '/resources' },
  { label: 'Feeding Calculator', to: '/calculators/dog-feeding-calculator' },
  { label: 'Enrichment Finder', to: '/calculators/enrichment-finder' },
  { label: 'About', to: '/about' },
  { label: 'Visit Shop', external: SITE.shopUrl },
  { label: 'Privacy Policy', external: SITE.privacyPolicyUrl },
]

export default function Footer() {
  function openCookieSettings() {
    window.dispatchEvent(new Event('pawzzles:open-cookie-settings'))
  }

  return (
    <footer className="bg-teal-deep text-white">
      <div className="max-w-7xl mx-auto container-px py-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="lg:w-[280px]">
            <Link to="/" className="inline-flex items-center" aria-label="Pawzzles home">
              <img
                src="/pawzzles-logo.svg"
                alt="Pawzzles"
                className="h-14 w-auto bg-white rounded-2xl p-1.5"
                draggable="false"
              />
            </Link>
            <p className="mt-4 text-sm text-white/85 max-w-xs">
              Making every day better for dogs and their people.
            </p>
          </div>

          <nav className="flex-1" aria-label="Footer">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.external}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-white/85 hover:text-white"
                      onClick={() => {
                        if (link.external === SITE.shopUrl) trackVisitShop('footer_link')
                      }}
                    >
                      {link.label}
                      {link.external === SITE.shopUrl && (
                        <Icon name="arrowRight" className="w-3.5 h-3.5" />
                      )}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="inline-flex text-sm font-bold text-white/85 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-left text-sm font-bold text-white/85 hover:text-white"
                >
                  Cookie settings
                </button>
              </li>
            </ul>
          </nav>

          <a
            href={SITE.shopUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-teal-deep hover:bg-cream transition-colors"
            onClick={() => trackVisitShop('footer_cta')}
          >
            Visit Shop
            <Icon name="arrowRight" className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-white/70">
          <p>© {new Date().getFullYear()} Pawzzles. General guidance only.</p>
          <p>Always supervise dogs with new toys or feeding products.</p>
        </div>
      </div>
    </footer>
  )
}
