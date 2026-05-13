import { resourceHubImages } from './imageAssets.js'

export const hubs = [
  {
    id: 'feeding-nutrition',
    title: 'Feeding & Nutrition',
    eyebrow: 'Hub',
    description:
      'Portion guidance, feeding routines and practical tools to help you plan everyday meals.',
    image: 'card-feeding-nutrition',
    imageSrc: resourceHubImages['card-feeding-nutrition'],
    imageAlt: 'Happy dog beside a teal food bowl in a warm kitchen',
    icon: 'bowl',
    accent: 'orange',
    cta: 'Open feeding tools',
    href: '/calculators/dog-feeding-calculator',
    bullets: ['Feeding calculator', 'Portion guides', 'Mealtime routines'],
  },
  {
    id: 'enrichment-play',
    title: 'Enrichment & Play',
    eyebrow: 'Hub',
    description:
      'Ideas, activities and a finder tool to keep your dog active, calm and happily occupied.',
    image: 'card-enrichment-play',
    imageSrc: resourceHubImages['card-enrichment-play'],
    imageAlt: 'Dog playing with a colourful puzzle enrichment toy',
    icon: 'ball',
    accent: 'green',
    cta: 'Find enrichment ideas',
    href: '/calculators/enrichment-finder',
    bullets: ['Enrichment finder', 'Sniff & puzzle ideas', 'Boredom busters'],
  },
  {
    id: 'puppy-training',
    title: 'Puppy & Training',
    eyebrow: 'Hub',
    description:
      'Behaviour-led guidance and step-by-step checklists to set your puppy up for life.',
    image: 'card-puppy-training',
    imageSrc: resourceHubImages['card-puppy-training'],
    imageAlt: 'Puppy sitting in a warm home training scene',
    icon: 'puppy',
    accent: 'teal',
    cta: 'Start with puppy basics',
    href: '/resources/puppy-socialisation-checklist',
    bullets: ['Socialisation checklist', 'House routine guidance', 'Calm training tips'],
  },
]
