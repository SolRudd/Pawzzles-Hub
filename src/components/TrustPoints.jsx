import React from 'react'
import { Icon } from './icons/Icons.jsx'
import { trustPoints } from '../data/trust.js'

export default function TrustPoints({ className = '' }) {
  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-3 ${className}`}
      aria-label="Why Pawzzles"
    >
      {trustPoints.map((t) => (
        <li key={t.id} className="flex items-center gap-2.5 min-w-0">
          <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-teal/10 text-teal shrink-0">
            <Icon name={t.icon} className="w-4 h-4" />
          </span>
          <span className="leading-tight min-w-0">
            <span className="block text-[13px] font-extrabold text-navy">{t.title}</span>
            <span className="block text-[11px] text-muted">{t.sub}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
