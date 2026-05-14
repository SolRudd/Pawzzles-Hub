import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Resources from './pages/Resources.jsx'
import ResourceDetail from './pages/ResourceDetail.jsx'
import DogFeedingCalculator from './pages/DogFeedingCalculator.jsx'
import EnrichmentFinder from './pages/EnrichmentFinder.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import { readCookieConsent } from './lib/cookieConsent.js'
import {
  initialiseConsentDefaults,
  updateGoogleConsent,
} from './lib/googleTagManager.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function GtmBootstrap() {
  useEffect(() => {
    initialiseConsentDefaults()
    const saved = readCookieConsent()
    if (saved && (saved.analytics || saved.marketing)) {
      updateGoogleConsent(saved)
    }
    function handle(event) {
      updateGoogleConsent(event?.detail || {})
    }
    window.addEventListener('pawzzles:cookie-consent-updated', handle)
    return () => {
      window.removeEventListener('pawzzles:cookie-consent-updated', handle)
    }
  }, [])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <GtmBootstrap />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-cream text-navy">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route
              path="/calculators/dog-feeding-calculator"
              element={<DogFeedingCalculator />}
            />
            <Route
              path="/calculators/enrichment-finder"
              element={<EnrichmentFinder />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  )
}
