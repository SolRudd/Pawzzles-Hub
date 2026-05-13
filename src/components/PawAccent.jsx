import React from 'react'

export function PawMark({ size = 18, className = '', color = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={color}
      aria-hidden
    >
      <ellipse cx="6.5" cy="9.5" rx="1.6" ry="2.3" />
      <ellipse cx="17.5" cy="9.5" rx="1.6" ry="2.3" />
      <ellipse cx="9.5" cy="5.4" rx="1.4" ry="2" />
      <ellipse cx="14.5" cy="5.4" rx="1.4" ry="2" />
      <path d="M12 12.2c-3 0-5.4 2.3-5.4 4.7 0 1.8 1.4 2.6 2.7 2.6 1.1 0 1.7-.6 2.7-.6s1.6.6 2.7.6c1.3 0 2.7-.8 2.7-2.6 0-2.4-2.4-4.7-5.4-4.7Z" />
    </svg>
  )
}

export function PawScatter({ className = '', tint = 'rgba(245,130,50,0.18)' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <PawMark className="absolute top-[10%] left-[6%] rotate-[-18deg]" color={tint} size={22} />
      <PawMark className="absolute top-[28%] right-[8%] rotate-[12deg]" color={tint} size={28} />
      <PawMark className="absolute bottom-[14%] left-[12%] rotate-[20deg]" color={tint} size={18} />
      <PawMark className="absolute bottom-[22%] right-[18%] rotate-[-10deg]" color={tint} size={20} />
      <PawMark className="absolute top-[55%] left-[40%] rotate-[6deg]" color={tint} size={14} />
    </div>
  )
}
