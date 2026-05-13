import React from 'react'
import { Icon } from './icons/Icons.jsx'

export default function Disclaimer({
  children,
  variant = 'soft',
  className = '',
}) {
  const cls =
    variant === 'soft'
      ? 'bg-soft-blue text-navy/85 border-teal/10'
      : 'bg-cream text-navy/85 border-orange/15'
  return (
    <div
      role="note"
      className={`rounded-2xl border ${cls} p-4 sm:p-5 flex items-start gap-3 text-sm ${className}`}
    >
      <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white text-teal shrink-0">
        <Icon name="shield" className="w-4 h-4" />
      </span>
      <p className="leading-relaxed">
        {children || (
          <>
            This is a general guide only. Always check food packaging and speak
            to a qualified professional if your dog has health issues or
            special dietary needs.
          </>
        )}
      </p>
    </div>
  )
}
