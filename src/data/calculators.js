import { resourceHubImages } from './imageAssets.js'

export const calculators = [
  {
    id: 'dog-feeding-calculator',
    title: 'Dog Feeding Calculator',
    short: 'Estimate a starting daily portion for your dog.',
    description:
      'A practical starting point for working out daily calories and food amounts based on your dog’s weight, life stage and activity.',
    image: 'calculator-feeding',
    imageSrc: resourceHubImages['calculator-feeding'],
    imageAlt: 'Dog beside a food bowl and blank calculator props',
    href: '/calculators/dog-feeding-calculator',
    cta: 'Launch calculator',
    time: '2 min tool',
    type: 'Calculator',
    bullets: [
      'Helpful starting portion estimate',
      'Adjusts for life stage and activity',
      'Uses food type or label kcal for grams per day',
      'General guidance only',
    ],
  },
  {
    id: 'enrichment-finder',
    title: 'Enrichment Finder',
    short: 'Get enrichment ideas tailored to your dog.',
    description:
      'Answer a few quick questions about your dog and get a personalised enrichment plan with activity ideas.',
    image: 'calculator-enrichment',
    imageSrc: resourceHubImages['calculator-enrichment'],
    imageAlt: 'Dog exploring a teal and orange puzzle toy',
    href: '/calculators/enrichment-finder',
    cta: 'Find ideas',
    time: '1 min tool',
    type: 'Tool',
    bullets: [
      'Matches activities to play style',
      'Adjusts for age and energy',
      'Suggests toy categories',
      'Built for everyday use',
    ],
  },
]

export function getCalculator(id) {
  return calculators.find((c) => c.id === id)
}
