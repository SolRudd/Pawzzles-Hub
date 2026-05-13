import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import AnnouncementBar from './components/layout/AnnouncementBar.jsx'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-cream text-navy">
        <AnnouncementBar />
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
