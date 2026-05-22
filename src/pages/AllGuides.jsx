import React from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { getGuideGroups } from '../data/guideGroups.js'
import { SITE, absoluteUrl } from '../data/site.js'

export default function AllGuides() {
  const groups = getGuideGroups()
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'All Pawzzles Dog Guides',
      url: absoluteUrl('/all-guides/'),
      description:
        'A crawler-friendly index of Pawzzles dog enrichment, slow feeder, puppy and feeding guides.',
      isPartOf: {
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'All Guides',
          item: absoluteUrl('/all-guides/'),
        },
      ],
    },
  ]

  return (
    <>
      <SEOHead
        title="All Dog Guides | Pawzzles Resource Hub"
        description="Browse every live Pawzzles guide for dog enrichment, slow feeders, puzzle toys, puppy enrichment, boredom-busting and feeding routines."
        canonical="/all-guides/"
        structuredData={schema}
      />
      <PageHero
        eyebrow="All guides"
        title="All Pawzzles dog guides"
        intro="A simple index of every live guide in the Pawzzles Resource Hub, grouped by topic."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'All guides' }]}
      />

      <section className="pb-24 sm:pb-28">
        <div className="max-w-5xl mx-auto container-px space-y-10">
          {groups.map((group) => (
            <section key={group.title} className="rounded-3xl bg-white p-6 sm:p-8 shadow-card ring-1 ring-navy/5">
              <h2 className="font-display text-2xl sm:text-3xl text-navy">{group.title}</h2>
              <p className="mt-2 text-muted">{group.description}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {group.resources.map((resource) => (
                  <li key={resource.id}>
                    <Link
                      to={resource.href}
                      className="block rounded-2xl border border-navy/10 bg-cream px-4 py-3 font-bold text-navy hover:border-orange/50 hover:text-orange"
                    >
                      {resource.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
