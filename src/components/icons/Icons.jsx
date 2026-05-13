import React from 'react'

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function PawIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <ellipse cx="6.5" cy="9.5" rx="1.6" ry="2.2" />
      <ellipse cx="17.5" cy="9.5" rx="1.6" ry="2.2" />
      <ellipse cx="9.5" cy="5.5" rx="1.4" ry="2" />
      <ellipse cx="14.5" cy="5.5" rx="1.4" ry="2" />
      <path d="M12 12.2c-3 0-5.4 2.3-5.4 4.7 0 1.8 1.4 2.6 2.7 2.6 1.1 0 1.7-.6 2.7-.6s1.6.6 2.7.6c1.3 0 2.7-.8 2.7-2.6 0-2.4-2.4-4.7-5.4-4.7Z" />
    </svg>
  )
}

export function BowlIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M3 11h18l-1.4 6.2a3 3 0 0 1-2.9 2.3H7.3a3 3 0 0 1-2.9-2.3L3 11Z" />
      <path d="M3 11c0-1.8 4-3 9-3s9 1.2 9 3" />
      <path d="M9 7.5c.5-1 .5-2 0-3M12 7c.5-1 .5-2 0-3M15 7.5c.5-1 .5-2 0-3" />
    </svg>
  )
}

export function BallIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8M12 3.5v17M5.5 6.5l13 11M18.5 6.5l-13 11" />
    </svg>
  )
}

export function PuppyIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 9.5c0-1.6 1.4-3 3-3 .8 0 1.5.3 2 .8h4c.5-.5 1.2-.8 2-.8 1.6 0 3 1.4 3 3v2.7c0 4-3.1 7.3-7 7.3s-7-3.3-7-7.3V9.5Z" />
      <path d="M5 9.5 3.8 6.8M19 9.5l1.2-2.7" />
      <circle cx="9.5" cy="13" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11 16.2c.3.4.6.6 1 .6s.7-.2 1-.6" />
    </svg>
  )
}

export function HeartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 20.5s-7.5-4.4-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3.5c0 5.6-7.5 10-7.5 10Z" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3.5 5 6v6c0 4.4 3 7.8 7 9 4-1.2 7-4.6 7-9V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  )
}

export function WrenchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M14.5 5.5a4 4 0 0 1 4.4 5.4l-9.7 9.7a2.4 2.4 0 0 1-3.4-3.4l9.7-9.7a4 4 0 0 1-1-2Z" />
      <path d="M14.5 5.5 17 8" />
    </svg>
  )
}

export function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="14" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
      <circle cx="9" cy="14" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="currentColor">
      <path d="M12 3.5l2.7 5.6 6.2.9-4.5 4.3 1.1 6.2L12 17.7 6.5 20.5l1.1-6.2L3 9.9l6.2-.9L12 3.5Z" />
    </svg>
  )
}

export function TruckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7v-6Z" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="17" cy="17" r="1.6" />
    </svg>
  )
}

export function BrainIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M8.5 4.5a3 3 0 0 0-3 3v1A3 3 0 0 0 4 11.5a3 3 0 0 0 1.5 2.6V15a3 3 0 0 0 3 3 3 3 0 0 0 3-1.5v-12A3 3 0 0 0 8.5 4.5Z" />
      <path d="M15.5 4.5a3 3 0 0 1 3 3v1A3 3 0 0 1 20 11.5a3 3 0 0 1-1.5 2.6V15a3 3 0 0 1-3 3 3 3 0 0 1-3-1.5v-12a3 3 0 0 1 3-1.5Z" />
    </svg>
  )
}

export function LeafIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M4.5 19.5C4.5 12 11 5.5 19.5 4.5c.5 6-1 17-15 15Z" />
      <path d="M5 19 14 10" />
    </svg>
  )
}

export function ToolsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M13.5 3.5a4 4 0 0 1 5.7 5.4l1.7 1.7-2.4 2.4-1.7-1.7a4 4 0 0 1-5.5-2" />
      <path d="m4 20 6-6M4 20l2 .5L9 18l-.5-2L4 20Z" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </svg>
  )
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    </svg>
  )
}

const map = {
  paw: PawIcon,
  bowl: BowlIcon,
  ball: BallIcon,
  puppy: PuppyIcon,
  heart: HeartIcon,
  shield: ShieldIcon,
  wrench: WrenchIcon,
  calendar: CalendarIcon,
  search: SearchIcon,
  check: CheckIcon,
  arrowRight: ArrowRightIcon,
  chevronDown: ChevronDownIcon,
  clock: ClockIcon,
  star: StarIcon,
  truck: TruckIcon,
  brain: BrainIcon,
  leaf: LeafIcon,
  tools: ToolsIcon,
  mail: MailIcon,
  sparkle: SparkleIcon,
}

export function Icon({ name, ...props }) {
  const C = map[name]
  if (!C) return null
  return <C {...props} />
}
