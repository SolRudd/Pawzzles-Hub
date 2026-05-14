import React, { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import SearchBar from '../components/SearchBar.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { resources, categories, filterResources } from '../data/resources.js'
import { SITE, absoluteUrl } from '../data/site.js'

export default function Resources() {
  const [params, setParams] = useSearchParams()
  const initialCat = params.get('category') || 'all'
  const initialQuery = params.get('q') || ''
  const [active, setActive] = useState(initialCat)
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setActive(params.get('category') || 'all')
    setQuery(params.get('q') || '')
  }, [params])

  function setCategory(id) {
    setActive(id)
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('category')
    else next.set('category', id)
    setParams(next, { replace: true })
  }

  const visible = useMemo(() => {
    const byCat = filterResources(active)
    if (!query.trim()) return byCat
    const q = query.toLowerCase()
    return byCat.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q),
    )
  }, [active, query])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pawzzles Resource Hub',
    url: absoluteUrl('/resources'),
    description:
      'Pawzzles practical calculators, dog-friendly guides and checklists for enrichment, feeding and everyday routines.',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
  }

  return (
    <>
      <SEOHead
        title="Dog Enrichment, Feeding & Puppy Resources | Pawzzles Resource Hub"
        description="Browse Pawzzles dog-friendly guides, feeding tools, slow feeder advice, enrichment ideas and practical checklists built for everyday dog care."
        canonical="/resources"
        ogType="website"
        structuredData={schema}
      />
      <PageHero
        eyebrow="Resources"
        title="Browse the Pawzzles Resource Hub"
        intro="Practical calculators, easy-to-follow guides and helpful checklists, all in one place."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Resources' }]}
      >
        <div className="w-full max-w-2xl">
          <SearchBar placeholder="Search resources..." />
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto container-px">
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  active === c.id
                    ? 'bg-orange text-white border-orange shadow-soft'
                    : 'bg-white text-navy/80 border-navy/10 hover:border-orange/40 hover:text-orange'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-display text-2xl text-navy">No matches yet</p>
              <p className="mt-2 text-muted">Try clearing the search or pick a different category.</p>
              <button
                onClick={() => {
                  setQuery('')
                  setCategory('all')
                }}
                className="btn-secondary mt-5"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
              {visible.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <p className="text-muted text-sm">
              More resources are on the way. Want updates when they go live?
            </p>
            <Link to="#newsletter" className="btn-secondary mt-4">
              Join the Pawzzles Pack
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
