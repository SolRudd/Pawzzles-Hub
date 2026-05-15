import React from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { ImagePlaceholder } from '../components/placeholders/Scenes.jsx'
import { SITE, absoluteUrl } from '../data/site.js'
import { resourceHubImages } from '../data/imageAssets.js'
import { trackVisitShop } from '../lib/tracking.js'

const VALUES = [
  {
    title: 'Play with purpose',
    copy: 'Our toys and resources are built around everyday enrichment, helping dogs stay busy, engaged and happy.',
    icon: 'ball',
  },
  {
    title: 'Better routines',
    copy: 'From feeding tools to simple guides, we want to make daily dog care easier to understand and easier to act on.',
    icon: 'calendar',
  },
  {
    title: 'Safe, sensible choices',
    copy: 'We focus on practical, dog-friendly ideas and products that owners can use with confidence.',
    icon: 'shield',
  },
  {
    title: 'Built with love',
    copy: 'Pawzzles is still growing, but the goal is simple: create useful products and resources that dogs and their people genuinely enjoy.',
    icon: 'heart',
  },
]

const PACK = [
  {
    title: 'The Toy Tester',
    copy: 'A cheerful small dog moment with an enrichment toy, showing the playful side of Pawzzles.',
    image: 'about-frenchie-1',
  },
  {
    title: 'The Snack Enthusiast',
    copy: 'A calm mealtime setup with slow feeder and routine cues for everyday dog care.',
    image: 'resource-frenchie-routine',
  },
  {
    title: 'The Puzzle Solver',
    copy: 'A focused puzzle toy moment for dogs who enjoy sniffing, exploring and problem-solving.',
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
        title="About Pawzzles | Dog Enrichment, Mealtime Routines and Practical Tools"
        description="Meet Pawzzles, a playful dog enrichment and mealtime brand with practical tools, guides and routines built for real dog owners."
        canonical="/about"
        structuredData={schema}
      />

      <PageHero
        eyebrow="About Pawzzles"
        title="About Pawzzles"
        intro="Pawzzles was created to make everyday dog care more playful, practical and enriching. From enrichment toys and slow feeders to useful guides and calculators, we help owners build better routines for their dogs."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

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
              <p className="eyebrow">What Pawzzles stands for</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                Practical ideas for real dog days.
              </h2>
              <p className="mt-3 text-muted leading-relaxed">
                We focus on toys, slow feeders, mealtime routines, enrichment
                and safe play, with practical guidance that is easy to use at
                home.
              </p>
              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                {VALUES.map((value) => (
                  <article key={value.title} className="rounded-2xl bg-white ring-1 ring-navy/5 p-5 shadow-soft">
                    <span className="inline-flex w-10 h-10 items-center justify-center rounded-2xl bg-teal text-white">
                      <Icon name={value.icon} className="w-5 h-5" />
                    </span>
                    <h3 className="mt-4 font-display text-xl text-navy">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {value.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="max-w-2xl">
              <p className="eyebrow">Meet the Pack</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                Everyday moments from the Pawzzles pack.
              </h2>
              <p className="mt-3 text-muted">
                A small set of playful, practical dog moments showing toys,
                slow feeders and simple routines in action.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-6 lg:gap-8">
              {PACK.map((member) => (
                <article key={member.title} className="card">
                  <div className="aspect-[5/4] overflow-hidden">
                    <ImagePlaceholder
                      name={member.image}
                      src={resourceHubImages[member.image]}
                      alt={`${member.title} Pawzzles dog moment`}
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

          <div className="mt-20 rounded-[2rem] bg-white ring-1 ring-navy/5 shadow-card p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:items-center">
              <div>
                <p className="eyebrow">Why the Resource Hub exists</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl text-navy">
                  Useful help, without overcomplicating dog care.
                </h2>
                <p className="mt-3 text-muted max-w-3xl leading-relaxed">
                  The Pawzzles Resource Hub is here to help dog owners find
                  useful guides, calculators and simple ideas for feeding,
                  enrichment, puppy routines, slow feeders and safe play.
                </p>
                <p className="mt-3 text-sm font-bold text-teal">
                  Resource hub created and run by BuzzBoost Digital.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/resources" className="btn-primary">
                  Explore resources
                </Link>
                <Link to="/calculators/dog-feeding-calculator" className="btn-secondary">
                  Try the feeding calculator
                </Link>
                <a
                  href={SITE.shopUrl}
                  className="btn-ghost"
                  onClick={() => trackVisitShop('about_resource_hub_cta')}
                >
                  Visit Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
