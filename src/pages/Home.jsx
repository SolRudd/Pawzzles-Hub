import React from 'react'
import Hero from '../components/Hero.jsx'
import HubCards from '../components/HubCards.jsx'
import FeaturedTool from '../components/FeaturedTool.jsx'
import PopularResources from '../components/PopularResources.jsx'
import ChoiceCta from '../components/ChoiceCta.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import TrustSection from '../components/TrustSection.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { SITE, absoluteUrl } from '../data/site.js'

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/resources')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <SEOHead
        title={SITE.defaultTitle}
        description={SITE.defaultDescription}
        canonical="/"
        structuredData={schema}
      />
      <Hero />
      <HubCards />
      <FeaturedTool />
      <PopularResources />
      <section className="bg-white pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto container-px">
          <ChoiceCta />
        </div>
      </section>
      <NewsletterSignup sourceComponent="homepage_newsletter" />
      <TrustSection />
    </>
  )
}
