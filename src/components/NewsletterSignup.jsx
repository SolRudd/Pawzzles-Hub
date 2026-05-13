import React, { useState } from 'react'
import { Icon } from './icons/Icons.jsx'
import { PawMark } from './PawAccent.jsx'

const POINTS = [
  { icon: 'paw', label: 'Helpful tips you can use' },
  { icon: 'calendar', label: 'Seasonal guides & checklists' },
  { icon: 'sparkle', label: 'Early access to new tools' },
  { icon: 'heart', label: 'No spam, ever' },
]

function EnvelopeIllustration() {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" aria-hidden>
      {/* shadow */}
      <ellipse cx="110" cy="200" rx="80" ry="8" fill="rgba(20,32,51,0.06)" />
      {/* envelope back */}
      <path
        d="M30 80c0-6 4-10 10-10h140c6 0 10 4 10 10v90c0 6-4 10-10 10H40c-6 0-10-4-10-10V80Z"
        fill="#138fa1"
      />
      {/* checklist card peeking */}
      <g transform="translate(60 38)">
        <rect x="0" y="0" width="100" height="120" rx="10" fill="#fff" stroke="#ffd1a8" strokeWidth="3" />
        <rect x="32" y="-6" width="36" height="10" rx="3" fill="#f58232" />
        <g stroke="#138fa1" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 26l5 5 10-12" />
          <path d="M14 52l5 5 10-12" />
          <path d="M14 78l5 5 10-12" />
          <path d="M14 104l5 5 10-12" />
        </g>
        <g stroke="#9cdde6" strokeWidth="3" strokeLinecap="round">
          <path d="M34 26h52M34 52h52M34 78h40M34 104h48" />
        </g>
      </g>
      {/* envelope flap */}
      <path
        d="M30 80c0-6 4-10 10-10h140c6 0 10 4 10 10L110 140Z"
        fill="#087b86"
      />
      {/* envelope front */}
      <path
        d="M30 100l80 60 80-60v70c0 6-4 10-10 10H40c-6 0-10-4-10-10v-70Z"
        fill="#138fa1"
      />
      {/* bow tag */}
      <g transform="translate(160 30)">
        <circle r="16" fill="#f58232" />
        <path d="M-6 -2c0 -6 4 -8 6 -8s6 2 6 8c0 4 -3 6 -6 6s-6 -2 -6 -6Z" fill="#fff" />
        <circle r="2" fill="#fff" />
      </g>
      {/* paw stamp */}
      <g transform="translate(48 152) scale(0.7)" fill="#fff" opacity="0.9">
        <ellipse cx="-7" cy="0" rx="2.4" ry="3.3" />
        <ellipse cx="7" cy="0" rx="2.4" ry="3.3" />
        <ellipse cx="-3.5" cy="-6.5" rx="2" ry="3" />
        <ellipse cx="3.5" cy="-6.5" rx="2" ry="3" />
        <path d="M0 4c-4.4 0-8 3-8 6.6 0 2.7 2 3.8 4 3.8 1.6 0 2.5-1 4-1s2.4 1 4 1c2 0 4-1.1 4-3.8C8 7 4.4 4 0 4Z" />
      </g>
    </svg>
  )
}

function DogPeek() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <ellipse cx="100" cy="180" rx="60" ry="6" fill="rgba(20,32,51,0.06)" />
      <g transform="translate(100 110)">
        {/* rope toy */}
        <g transform="translate(-30 30)">
          <rect x="-40" y="-7" width="80" height="14" rx="6" fill="#138fa1" />
          <path d="M-40 -10c-12 2 -14 18 -2 22 -6 -8 -2 -16 2 -22Z" fill="#f58232" />
          <path d="M40 -10c12 2 14 18 2 22 6 -8 2 -16 -2 -22Z" fill="#f58232" />
        </g>
        {/* dog */}
        <g>
          <ellipse cx="0" cy="20" rx="48" ry="28" fill="#d4a87c" />
          <ellipse cx="0" cy="-12" rx="34" ry="30" fill="#d4a87c" />
          <path d="M-32 -22c-8 -6 -14 -2 -16 8s2 16 12 16Z" fill="#8a5a3b" />
          <path d="M32 -22c8 -6 14 -2 16 8s-2 16 -12 16Z" fill="#8a5a3b" />
          <ellipse cx="0" cy="2" rx="18" ry="13" fill="#fff7ec" />
          <ellipse cx="0" cy="-3" rx="4.5" ry="3.2" fill="#142033" />
          <path d="M0 0v5" stroke="#142033" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M-3 5c0 5 2 8 3 8s3-3 3-8Z" fill="#f58232" />
          <circle cx="-13" cy="-16" r="3" fill="#142033" />
          <circle cx="13" cy="-16" r="3" fill="#142033" />
          <circle cx="-12" cy="-17" r="1" fill="#fff" />
          <circle cx="14" cy="-17" r="1" fill="#fff" />
        </g>
      </g>
    </svg>
  )
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <section id="newsletter" className="py-16 sm:py-20 bg-cream">
      <div className="max-w-7xl mx-auto container-px">
        <div className="relative rounded-[2.25rem] bg-beige overflow-hidden ring-1 ring-orange/10 shadow-card">
          <PawMark className="absolute top-6 right-10 opacity-15 rotate-[10deg]" color="#f58232" size={28} />
          <PawMark className="absolute bottom-8 left-1/3 opacity-10 rotate-[-12deg]" color="#f58232" size={22} />

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* envelope visual */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="aspect-square max-w-[260px] mx-auto">
                <EnvelopeIllustration />
              </div>
            </div>

            {/* form */}
            <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-navy inline-flex items-center gap-3">
                Join the Pawzzles Pack
                <PawMark size={24} color="#f58232" />
              </h2>
              <p className="mt-3 text-muted text-base sm:text-lg max-w-xl">
                Get dog-friendly tips, seasonal guides and early access to new
                tools straight to your inbox.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSent(true)
                }}
                className="mt-5 flex flex-col sm:flex-row items-stretch gap-2 max-w-xl"
              >
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-1">
                  <Icon
                    name="mail"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white shadow-soft border border-navy/5 placeholder:text-navy/40 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:border-orange/40 text-sm"
                  />
                </div>
                <button type="submit" className="btn-primary sm:px-7">
                  {sent ? 'Welcome aboard!' : 'Join now'}
                </button>
              </form>

              <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 max-w-2xl">
                {POINTS.map((p) => (
                  <li key={p.label} className="flex items-center gap-2 text-left">
                    <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-teal/10 text-teal shrink-0">
                      <Icon name={p.icon} className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[12px] sm:text-xs font-bold text-navy leading-tight">
                      {p.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* dog visual */}
            <div className="lg:col-span-3 order-3">
              <div className="aspect-square max-w-[280px] mx-auto rounded-3xl bg-white shadow-card ring-1 ring-navy/5 overflow-hidden p-4">
                <DogPeek />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
