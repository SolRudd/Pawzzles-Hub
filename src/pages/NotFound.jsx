import React from 'react'
import { Link } from 'react-router-dom'
import { PawMark } from '../components/PawAccent.jsx'
import SEOHead from '../components/SEOHead.jsx'

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found | Pawzzles" noindex />
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto container-px">
          <PawMark size={64} color="#f58232" className="mx-auto opacity-80" />
          <h1 className="mt-6 font-display text-5xl text-navy">Page not found</h1>
          <p className="mt-4 text-muted">
            We can&apos;t find that page. Try heading back to the hub.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <Link to="/" className="btn-primary">Back to home</Link>
            <Link to="/resources/" className="btn-secondary">Browse resources</Link>
          </div>
        </div>
      </section>
    </>
  )
}
