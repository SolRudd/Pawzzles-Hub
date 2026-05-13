import React from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { ImagePlaceholder } from '../components/placeholders/Scenes.jsx'
import { SITE, absoluteUrl } from '../data/site.js'
import { resourceHubImages } from '../data/imageAssets.js'

const BELIEFS = [
  'Dogs thrive with enrichment.',
  'Mealtimes can be more than just feeding.',
  'Simple routines make life easier for owners.',
  'Helpful tools should be easy to understand.',
]

const PACK = [
  {
    title: 'The Toy Tester',
    copy: 'A placeholder for future real dog photos and product play moments.',
    image: 'about-frenchie-1',
  },
  {
    title: 'The Snack Enthusiast',
    copy: 'A warm slot for future mealtime and slow feeder content.',
    image: 'resource-frenchie-routine',
  },
  {
    title: 'The Puzzle Solver',
    copy: 'A future home for puzzle toy, sniffing and enrichment photos.',
    image: 'about-frenchie-2',
  },
]

export default function About() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Pawzzles',
    url: absoluteUrl('/about'),
    description:
      'Pawzzles is a playful dog enrichment and mealtime brand built around practical tools, dog-friendly advice and everyday routines.',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
    },
  }

  return (
    <>
      <SEOHead
        title="About Pawzzles | Dog Enrichment, Mealtime Routines & Practical Tools"
        description="Meet Pawzzles, a playful dog enrichment and mealtime brand with practical tools, guides and routines built for real dog owners."
        canonical="/about"
        structuredData={schema}
      />

      <PageHero
        eyebrow="About Pawzzles"
        title="Playful tools for everyday dog care"
        intro="Pawzzles was created to make everyday dog care more playful, practical and enriching — from toys and slow feeders to helpful guides, calculators and routines."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/resources" className="btn-primary">
            Explore the Resource Hub
          </Link>
          <a href={SITE.shopUrl} className="btn-secondary">
            Visit Shop
          </a>
        </div>
      </PageHero>

      <section className="pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-white ring-1 ring-navy/5 shadow-card">
                <ImagePlaceholder
                  name="hero-resource-hub"
                  src={resourceHubImages['hero-resource-hub']}
                  alt="Happy dog in warm outdoor light with cream, orange and teal accents"
                  imgClassName="absolute inset-0 w-full h-full object-cover object-[62%_50%]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow">What we believe</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                Useful guidance should feel simple, warm and practical.
              </h2>
              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                {BELIEFS.map((belief) => (
                  <div key={belief} className="rounded-2xl bg-white ring-1 ring-navy/5 p-5 shadow-soft">
                    <span className="inline-flex w-9 h-9 items-center justify-center rounded-2xl bg-teal text-white">
                      <Icon name="check" className="w-4 h-4" />
                    </span>
                    <p className="mt-3 font-bold text-navy">{belief}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-muted leading-relaxed">
                The resource hub is designed to support enrichment, routine and
                wellbeing without making everyday care feel complicated.
              </p>
            </div>
          </div>

          <div className="mt-20">
            <div className="max-w-2xl">
              <p className="eyebrow">Meet the Pack</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                Placeholder slots for the dogs behind future content.
              </h2>
              <p className="mt-3 text-muted">
                These cards are ready for real photos later. For now, they keep
                the page warm without inventing names or qualification claims.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {PACK.map((member) => (
                <article key={member.title} className="card">
                  <div className="aspect-[5/4] overflow-hidden">
                    <ImagePlaceholder
                      name={member.image}
                      src={resourceHubImages[member.image]}
                      alt={`${member.title} placeholder image slot`}
                      label={member.title}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-navy">
                      {member.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {member.copy}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
