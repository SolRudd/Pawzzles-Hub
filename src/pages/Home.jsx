import React from 'react'
import Hero from '../components/Hero.jsx'
import HubCards from '../components/HubCards.jsx'
import FeaturedTool from '../components/FeaturedTool.jsx'
import PopularResources from '../components/PopularResources.jsx'
import NewsletterSignup from '../components/NewsletterSignup.jsx'
import TrustSection from '../components/TrustSection.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <HubCards />
      <FeaturedTool />
      <PopularResources />
      <NewsletterSignup />
      <TrustSection />
    </>
  )
}
