import React from 'react'

const PALETTE = {
  cream: '#fff8ef',
  beige: '#fff3e6',
  softBlue: '#eaf8fb',
  orange: '#f58232',
  orangeLight: '#ffc89a',
  orangeSoft: '#ffe5cf',
  teal: '#138fa1',
  tealLight: '#9cdde6',
  tealSoft: '#d6f0f4',
  green: '#5bb47e',
  greenSoft: '#d6efdf',
  navy: '#142033',
  brown: '#8a5a3b',
  brownLight: '#d4a87c',
  white: '#ffffff',
}

function ScatterPaws({ color = 'rgba(245,130,50,0.22)' }) {
  return (
    <g fill={color}>
      <Paw x={16} y={20} s={0.6} r={-18} />
      <Paw x={170} y={28} s={0.8} r={14} />
      <Paw x={20} y={160} s={0.5} r={20} />
      <Paw x={172} y={158} s={0.7} r={-12} />
    </g>
  )
}

function Paw({ x, y, s = 1, r = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}>
      <ellipse cx="-7" cy="0" rx="2.4" ry="3.3" />
      <ellipse cx="7" cy="0" rx="2.4" ry="3.3" />
      <ellipse cx="-3.5" cy="-6.5" rx="2" ry="3" />
      <ellipse cx="3.5" cy="-6.5" rx="2" ry="3" />
      <path d="M0 4c-4.4 0-8 3-8 6.6 0 2.7 2 3.8 4 3.8 1.6 0 2.5-1 4-1s2.4 1 4 1c2 0 4-1.1 4-3.8C8 7 4.4 4 0 4Z" />
    </g>
  )
}

/* ------- abstract on-brand dog/puppy ------- */
function HappyDog({ x = 100, y = 110, scale = 1, color = PALETTE.brownLight, accent = PALETTE.brown }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* body */}
      <ellipse cx="0" cy="20" rx="48" ry="28" fill={color} />
      {/* head */}
      <ellipse cx="0" cy="-12" rx="34" ry="30" fill={color} />
      {/* ears */}
      <path d="M-32 -22c-8 -6 -14 -2 -16 8s2 16 12 16Z" fill={accent} />
      <path d="M32 -22c8 -6 14 -2 16 8s-2 16 -12 16Z" fill={accent} />
      {/* white muzzle */}
      <ellipse cx="0" cy="2" rx="18" ry="13" fill="#fff7ec" />
      {/* nose */}
      <ellipse cx="0" cy="-3" rx="4.5" ry="3.2" fill={PALETTE.navy} />
      <path d="M0 0v5" stroke={PALETTE.navy} strokeWidth="1.6" strokeLinecap="round" />
      {/* tongue */}
      <path d="M-3 5c0 5 2 8 3 8s3-3 3-8Z" fill={PALETTE.orange} />
      {/* eyes */}
      <circle cx="-13" cy="-16" r="3" fill={PALETTE.navy} />
      <circle cx="13" cy="-16" r="3" fill={PALETTE.navy} />
      <circle cx="-12" cy="-17" r="1" fill="#fff" />
      <circle cx="14" cy="-17" r="1" fill="#fff" />
      {/* cheek blush */}
      <circle cx="-22" cy="-4" r="3.4" fill="rgba(245,130,50,0.35)" />
      <circle cx="22" cy="-4" r="3.4" fill="rgba(245,130,50,0.35)" />
    </g>
  )
}

function SidePup({ x = 100, y = 120, scale = 1, color = PALETTE.brownLight, accent = PALETTE.brown }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* back legs */}
      <rect x="14" y="14" width="9" height="20" rx="4" fill={color} />
      <rect x="-22" y="14" width="9" height="20" rx="4" fill={color} />
      {/* body */}
      <ellipse cx="-2" cy="6" rx="34" ry="20" fill={color} />
      {/* tail */}
      <path d="M30 -2c10 -10 16 -6 18 0" stroke={accent} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* head */}
      <ellipse cx="-28" cy="-8" rx="20" ry="18" fill={color} />
      {/* ear */}
      <path d="M-38 -22c-4 -6 -10 -4 -12 4s2 10 8 10Z" fill={accent} />
      {/* snout */}
      <ellipse cx="-44" cy="-2" rx="10" ry="7" fill="#fff7ec" />
      <ellipse cx="-50" cy="-4" rx="2.4" ry="1.6" fill={PALETTE.navy} />
      {/* eye */}
      <circle cx="-33" cy="-10" r="2" fill={PALETTE.navy} />
    </g>
  )
}

/* ------- objects ------- */
function Bowl({ x = 100, y = 150, scale = 1, color = PALETTE.teal }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="0" rx="50" ry="10" fill={PALETTE.tealLight} />
      <path d="M-50 0c0 18 12 32 50 32s50 -14 50 -32Z" fill={color} />
      <ellipse cx="0" cy="0" rx="42" ry="8" fill={PALETTE.orange} />
      <circle cx="-18" cy="-1" r="3" fill={PALETTE.orangeSoft} />
      <circle cx="10" cy="-2" r="3" fill={PALETTE.orangeSoft} />
      <circle cx="22" cy="0" r="3" fill={PALETTE.orangeSoft} />
      <g fill="#fff">
        <ellipse cx="0" cy="14" rx="6" ry="4.5" opacity="0.9" />
        <ellipse cx="-4" cy="11" rx="2" ry="2.4" />
        <ellipse cx="4" cy="11" rx="2" ry="2.4" />
        <ellipse cx="-1.5" cy="8" rx="1.5" ry="1.8" />
        <ellipse cx="1.5" cy="8" rx="1.5" ry="1.8" />
      </g>
    </g>
  )
}

function Ball({ x = 150, y = 140, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="18" fill={PALETTE.orange} />
      <path d="M-18 0h36M0 -18v36M-13 -13l26 26M13 -13l-26 26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function RopeToy({ x = 100, y = 130, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-50" y="-8" width="100" height="16" rx="6" fill={PALETTE.teal} />
      <g stroke={PALETTE.tealSoft} strokeWidth="2">
        <path d="M-40 -8c8 8 8 8 0 16" />
        <path d="M-20 -8c8 8 8 8 0 16" />
        <path d="M0 -8c8 8 8 8 0 16" />
        <path d="M20 -8c8 8 8 8 0 16" />
        <path d="M40 -8c8 8 8 8 0 16" />
      </g>
      <g fill={PALETTE.orange}>
        <path d="M-50 -10c-12 2 -14 18 -2 22 -6 -8 -2 -16 2 -22Z" />
        <path d="M50 -10c12 2 14 18 2 22 6 -8 2 -16 -2 -22Z" />
      </g>
    </g>
  )
}

function Heart({ x = 100, y = 100, scale = 1, color = PALETTE.orange }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0 28C0 28 -28 14 -28 -4A14 14 0 0 1 0 -10 A14 14 0 0 1 28 -4C28 14 0 28 0 28Z"
        fill={color}
      />
    </g>
  )
}

function Stethoscope({ x = 100, y = 100, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={PALETTE.teal} strokeWidth="4" strokeLinecap="round">
      <path d="M-30 -30c0 20 -10 30 -20 30 -12 0 -20 -10 -20 -22" />
      <path d="M30 -30c0 20 10 30 20 30 12 0 20 -10 20 -22" />
      <path d="M-20 0v18a20 20 0 0 0 40 0V0" />
      <circle cx="0" cy="22" r="10" stroke={PALETTE.teal} strokeWidth="4" fill={PALETTE.tealSoft} />
    </g>
  )
}

function Checklist({ x = 100, y = 100, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-30" y="-40" width="60" height="80" rx="8" fill="#fff" stroke={PALETTE.orange} strokeWidth="3" />
      <rect x="-12" y="-46" width="24" height="10" rx="3" fill={PALETTE.orange} />
      <g stroke={PALETTE.teal} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-20 -22l4 4 8 -10" />
        <path d="M-20 -2l4 4 8 -10" />
        <path d="M-20 18l4 4 8 -10" />
      </g>
      <g stroke={PALETTE.tealSoft} strokeWidth="3" strokeLinecap="round">
        <path d="M-4 -20h22M-4 0h22M-4 20h16" />
      </g>
    </g>
  )
}

function PuzzleToy({ x = 100, y = 130, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-50" y="-22" width="100" height="46" rx="14" fill={PALETTE.teal} />
      <g fill={PALETTE.orange}>
        <circle cx="-30" cy="0" r="9" />
        <circle cx="0" cy="0" r="9" />
        <circle cx="30" cy="0" r="9" />
      </g>
      <g fill={PALETTE.orangeSoft}>
        <circle cx="-30" cy="0" r="4" />
        <circle cx="0" cy="0" r="4" />
        <circle cx="30" cy="0" r="4" />
      </g>
    </g>
  )
}

function Scale({ x = 100, y = 130, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-46" y="-10" width="92" height="40" rx="10" fill={PALETTE.teal} />
      <rect x="-30" y="-22" width="60" height="14" rx="5" fill={PALETTE.tealSoft} />
      <g stroke={PALETTE.orange} strokeWidth="3" strokeLinecap="round">
        <path d="M-18 -15l-2 -3M0 -16v-3M18 -15l2 -3" />
      </g>
      <text x="0" y="18" textAnchor="middle" fontFamily="Chewy, sans-serif" fontSize="16" fill="#fff">
        OK!
      </text>
    </g>
  )
}

function Cushion({ x = 100, y = 150, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M-60 0c0 -10 10 -16 60 -16s60 6 60 16 -10 16 -60 16 -60 -6 -60 -16Z" fill={PALETTE.orange} />
      <path d="M-60 0c0 -6 10 -10 60 -10s60 4 60 10" stroke={PALETTE.orangeSoft} strokeWidth="3" fill="none" />
    </g>
  )
}

function Sparkles({ color = PALETTE.orange }) {
  return (
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <path d="M150 28v10M145 33h10" />
      <path d="M40 40v8M36 44h8" />
      <path d="M170 90v10M165 95h10" />
    </g>
  )
}

/* ------- main wrapper ------- */
const SCENES = {
  'hero-dog-image': {
    bg: 'linear-gradient(135deg, #fff8ef 0%, #ffe5cf 60%, #ffd1a8 100%)',
    accent: PALETTE.teal,
    paws: 'rgba(19,143,161,0.18)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="78" fill={PALETTE.tealSoft} />
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.5" />
        <Sparkles color={PALETTE.orange} />
        <HappyDog x={100} y={108} scale={1.05} />
      </>
    ),
  },
  'feeding-nutrition-image': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #ffe5cf 100%)',
    paws: 'rgba(245,130,50,0.2)',
    render: () => (
      <>
        <circle cx="100" cy="98" r="62" fill="#fff" opacity="0.65" />
        <HappyDog x={70} y={70} scale={0.65} />
        <Bowl x={130} y={150} scale={0.9} />
      </>
    ),
  },
  'behaviour-training-image': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="105" cy="100" r="62" fill="#fff" opacity="0.7" />
        <SidePup x={100} y={120} scale={1.1} />
        {/* hand giving food reward */}
        <g transform="translate(150 80)">
          <circle cx="0" cy="0" r="6" fill={PALETTE.orange} />
          <path d="M-2 -22c0 8 -2 14 -6 18" stroke={PALETTE.orange} strokeWidth="6" strokeLinecap="round" fill="none" />
        </g>
      </>
    ),
  },
  'exercise-enrichment-image': {
    bg: 'linear-gradient(160deg, #d6efdf 0%, #eaf8fb 100%)',
    paws: 'rgba(91,180,126,0.28)',
    render: () => (
      <>
        <circle cx="90" cy="100" r="62" fill="#fff" opacity="0.7" />
        <SidePup x={90} y={120} scale={1.05} accent="#8a5a3b" />
        <Ball x={160} y={70} scale={1} />
      </>
    ),
  },
  'puppy-parenting-image': {
    bg: 'linear-gradient(160deg, #ffe5cf 0%, #fff3e6 100%)',
    paws: 'rgba(245,130,50,0.2)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <Cushion x={100} y={158} scale={1.05} />
        <HappyDog x={100} y={108} scale={0.85} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'health-care-image': {
    bg: 'linear-gradient(160deg, #eaf8fb 0%, #d6f0f4 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <HappyDog x={100} y={108} scale={0.9} />
        <g transform="translate(60 50)">
          <Heart x={0} y={0} scale={0.45} color={PALETTE.teal} />
        </g>
        {/* pulse line */}
        <g stroke={PALETTE.orange} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 170h28l6 -16 8 28 6 -18 8 6h104" />
        </g>
      </>
    ),
  },
  'feeding-calculator-image': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #ffe5cf 60%, #ffd1a8 100%)',
    paws: 'rgba(245,130,50,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="92" r="72" fill="#fff" opacity="0.6" />
        <HappyDog x={100} y={80} scale={0.95} />
        <Bowl x={100} y={158} scale={1.0} />
      </>
    ),
  },
  'portion-calculator-image': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #ffe5cf 100%)',
    paws: 'rgba(245,130,50,0.2)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="60" fill="#fff" opacity="0.7" />
        <SidePup x={70} y={70} scale={0.55} />
        <Bowl x={100} y={150} scale={0.95} />
      </>
    ),
  },
  'puppy-checklist-image': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <Checklist x={70} y={100} scale={0.85} />
        <HappyDog x={150} y={130} scale={0.55} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'enrichment-ideas-image': {
    bg: 'linear-gradient(160deg, #d6efdf 0%, #eaf8fb 100%)',
    paws: 'rgba(91,180,126,0.28)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <PuzzleToy x={100} y={140} scale={1.0} />
        <Ball x={50} y={60} scale={0.6} />
      </>
    ),
  },
  'boredom-behaviour-image': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #d6f0f4 100%)',
    paws: 'rgba(19,143,161,0.2)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <Cushion x={100} y={160} scale={1.0} />
        <SidePup x={100} y={120} scale={0.95} accent="#8a5a3b" />
      </>
    ),
  },
  'body-condition-image': {
    bg: 'linear-gradient(160deg, #eaf8fb 0%, #d6f0f4 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <SidePup x={100} y={110} scale={1.0} />
        <Scale x={100} y={160} scale={0.6} />
      </>
    ),
  },
  'toy-safety-image': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <SidePup x={80} y={90} scale={0.65} />
        <RopeToy x={110} y={150} scale={0.9} />
      </>
    ),
  },
  'hero-resource-hub': {
    bg: 'linear-gradient(135deg, #fff8ef 0%, #ffe5cf 60%, #ffd1a8 100%)',
    paws: 'rgba(19,143,161,0.18)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="80" fill={PALETTE.tealSoft} />
        <circle cx="100" cy="100" r="64" fill="#fff" opacity="0.55" />
        <Sparkles color={PALETTE.orange} />
        <HappyDog x={100} y={108} scale={1.08} />
      </>
    ),
  },
  'card-feeding-nutrition': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #ffe5cf 100%)',
    paws: 'rgba(245,130,50,0.2)',
    render: () => (
      <>
        <circle cx="100" cy="92" r="64" fill="#fff" opacity="0.6" />
        <HappyDog x={75} y={70} scale={0.7} />
        <Bowl x={130} y={150} scale={0.9} />
      </>
    ),
  },
  'card-enrichment-play': {
    bg: 'linear-gradient(160deg, #d6efdf 0%, #eaf8fb 100%)',
    paws: 'rgba(91,180,126,0.26)',
    render: () => (
      <>
        <circle cx="105" cy="100" r="64" fill="#fff" opacity="0.65" />
        <SidePup x={100} y={120} scale={1.05} accent="#8a5a3b" />
        <Ball x={160} y={68} scale={0.95} />
      </>
    ),
  },
  'card-puppy-training': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="64" fill="#fff" opacity="0.7" />
        <Cushion x={100} y={158} scale={1.0} />
        <HappyDog x={100} y={108} scale={0.85} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'calculator-feeding': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #ffe5cf 50%, #ffd1a8 100%)',
    paws: 'rgba(245,130,50,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="92" r="72" fill="#fff" opacity="0.6" />
        <HappyDog x={100} y={80} scale={0.95} />
        <Bowl x={100} y={158} scale={1.0} />
      </>
    ),
  },
  'calculator-enrichment': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #d6efdf 100%)',
    paws: 'rgba(91,180,126,0.26)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="68" fill="#fff" opacity="0.65" />
        <PuzzleToy x={100} y={142} scale={1.05} />
        <Ball x={50} y={58} scale={0.55} />
      </>
    ),
  },
  'resource-puppy-checklist': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="64" fill="#fff" opacity="0.7" />
        <Checklist x={70} y={100} scale={0.85} />
        <HappyDog x={150} y={130} scale={0.55} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'resource-enrichment-ideas': {
    bg: 'linear-gradient(160deg, #d6efdf 0%, #eaf8fb 100%)',
    paws: 'rgba(91,180,126,0.26)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="64" fill="#fff" opacity="0.7" />
        <PuzzleToy x={100} y={140} scale={1.0} />
        <Ball x={50} y={60} scale={0.6} />
      </>
    ),
  },
  'resource-toy-safety': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.22)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="64" fill="#fff" opacity="0.7" />
        <SidePup x={80} y={90} scale={0.65} />
        <RopeToy x={110} y={150} scale={0.9} />
      </>
    ),
  },
  'resource-small-dog-slow-feeder': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #eaf8fb 100%)',
    paws: 'rgba(245,130,50,0.18)',
    render: () => (
      <>
        <circle cx="98" cy="96" r="66" fill="#fff" opacity="0.72" />
        <HappyDog x={78} y={92} scale={0.62} color={PALETTE.orangeLight} accent={PALETTE.orange} />
        <g transform="translate(122 148)">
          <ellipse cx="0" cy="0" rx="48" ry="12" fill={PALETTE.tealLight} />
          <path d="M-48 0c0 16 12 28 48 28s48 -12 48 -28Z" fill={PALETTE.teal} />
          <g fill={PALETTE.orange}>
            <circle cx="-20" cy="-1" r="8" />
            <circle cx="4" cy="-2" r="8" />
            <circle cx="26" cy="0" r="8" />
          </g>
        </g>
      </>
    ),
  },
  'resource-frenchie-enrichment': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #fff3e6 100%)',
    paws: 'rgba(19,143,161,0.18)',
    render: () => (
      <>
        <circle cx="105" cy="100" r="66" fill="#fff" opacity="0.7" />
        <PuzzleToy x={112} y={145} scale={0.86} />
        <HappyDog x={86} y={94} scale={0.68} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'resource-frenchie-routine': {
    bg: 'linear-gradient(160deg, #fff8ef 0%, #ffe5cf 100%)',
    paws: 'rgba(245,130,50,0.18)',
    render: () => (
      <>
        <circle cx="96" cy="100" r="64" fill="#fff" opacity="0.7" />
        <Bowl x={112} y={150} scale={0.78} />
        <Checklist x={62} y={86} scale={0.62} />
        <HappyDog x={142} y={106} scale={0.55} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'about-frenchie-1': {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #d6f0f4 100%)',
    paws: 'rgba(19,143,161,0.16)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="66" fill="#fff" opacity="0.72" />
        <Ball x={55} y={62} scale={0.6} />
        <HappyDog x={112} y={112} scale={0.82} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  'about-frenchie-2': {
    bg: 'linear-gradient(160deg, #d6f0f4 0%, #eaf8fb 100%)',
    paws: 'rgba(19,143,161,0.18)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="66" fill="#fff" opacity="0.72" />
        <PuzzleToy x={100} y={146} scale={0.78} />
        <SidePup x={96} y={112} scale={0.8} color={PALETTE.orangeLight} accent={PALETTE.orange} />
      </>
    ),
  },
  default: {
    bg: 'linear-gradient(160deg, #fff3e6 0%, #d6f0f4 100%)',
    paws: 'rgba(19,143,161,0.18)',
    render: () => (
      <>
        <circle cx="100" cy="100" r="62" fill="#fff" opacity="0.7" />
        <HappyDog x={100} y={108} scale={0.85} />
      </>
    ),
  },
}

/**
 * Image slot component. To use a real image later, pass `src` and `alt`.
 * Without `src`, renders a polished on-brand SVG illustration matched to the slot `name`.
 * The slot name is also written to data-image-slot for easy CMS/replacement scripting.
 */
export function ImagePlaceholder({
  name = 'default',
  src,
  alt,
  className = '',
  label,
  loading = 'lazy',
  showPawScatter = true,
  imgClassName = 'absolute inset-0 w-full h-full object-cover',
}) {
  const scene = SCENES[name] || SCENES.default
  const hasImage = Boolean(src)
  return (
    <div
      data-image-slot={name}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={src ? undefined : { background: scene.bg }}
      role={hasImage ? undefined : 'img'}
      aria-label={hasImage ? undefined : alt || label || name}
    >
      {src ? (
        <img
          src={src}
          alt={alt || label || ''}
          className={imgClassName}
          loading={loading}
          decoding="async"
        />
      ) : (
        <svg
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          {showPawScatter && <ScatterPaws color={scene.paws} />}
          {scene.render()}
        </svg>
      )}
    </div>
  )
}

export { PALETTE }
