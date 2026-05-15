import React from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../../data/site.js'
import { trackVisitShop } from '../../lib/tracking.js'

const FOOTER_GROUPS = [
  {
    title: 'Resource Hub',
    links: [
      { label: 'Resources', to: '/resources' },
      { label: 'About', to: '/about' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Feeding', to: '/resources?category=feeding' },
      { label: 'Enrichment', to: '/resources?category=enrichment' },
      { label: 'Puppy', to: '/resources?category=puppy' },
      { label: 'Guides', to: '/resources?category=guides' },
    ],
  },
  {
    title: 'Calculators',
    links: [
      { label: 'Feeding Calculator', to: '/calculators/dog-feeding-calculator' },
      { label: 'Enrichment Finder', to: '/calculators/enrichment-finder' },
    ],
  },
  {
    title: 'Main Pawzzles Site',
    links: [
      { label: 'Visit Shop', external: SITE.shopUrl, track: 'footer_shop_link' },
      { label: 'Main Website', external: SITE.shopUrl, track: 'footer_home_link' },
      { label: 'Privacy Policy', external: SITE.privacyPolicyUrl },
    ],
  },
]

export default function Footer() {
  function openCookieSettings() {
    window.dispatchEvent(new Event('pawzzles:open-cookie-settings'))
  }

  return (
    <footer className="bg-teal-deep text-white">
      <div className="max-w-7xl mx-auto container-px py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr_auto] lg:items-start">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label="Pawzzles home">
              <img
                src="/pawzzles-logo.svg"
                alt="Pawzzles"
                className="h-14 w-auto"
                draggable="false"
              />
            </Link>
            <p className="mt-4 text-sm text-white/85 max-w-xs">
              Making every day better for dogs and their people.
            </p>
          </div>

          <nav className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" aria-label="Footer">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-extrabold uppercase tracking-wide text-orange">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.external}
                          className="text-sm font-bold text-white/80 hover:text-white"
                          onClick={() => {
                            if (link.track) trackVisitShop(link.track)
                          }}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-sm font-bold text-white/80 hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href={SITE.shopUrl}
              className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white hover:bg-orange-deep transition-colors"
              onClick={() => trackVisitShop('footer_cta')}
            >
              Visit Shop
            </a>
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-left text-sm font-bold text-white/80 hover:text-white lg:text-right"
            >
              Cookie settings
            </button>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between text-xs text-white/70">
          <p>© {new Date().getFullYear()} Pawzzles. General guidance only.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <p>Always supervise dogs with new toys or feeding products.</p>
            <a href="https://buzzboost.co.uk" className="font-bold text-white/80 hover:text-white">
              Built by BuzzBoost Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
