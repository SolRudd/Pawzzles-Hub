import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'best-dog-enrichment-ideas',
  slug: 'best-dog-enrichment-ideas',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Best Dog Enrichment Ideas',
  intro:
    'Enrichment isn’t about doing more — it’s about doing the right things for your dog. Here are simple, low-cost ideas to keep your dog happily occupied.',
  time: '4 min read',
  image: 'resource-enrichment-ideas',
  imageSrc: resourceHubImages['resource-enrichment-ideas'],
  imageAlt: 'Dog with puzzle, snuffle and chew enrichment toys',
  metaTitle: 'Best Dog Enrichment Ideas — Pawzzles',
  metaDescription:
    'Simple, low-cost dog enrichment ideas covering sniffing, puzzles, calming, training and play — designed to support enrichment, routine and wellbeing.',
  sections: [
    {
      heading: 'What enrichment actually means',
      body: 'Enrichment is anything that lets your dog use their natural behaviours in a constructive, safe way — sniffing, chewing, problem-solving, foraging and social play. The right mix depends on your dog’s age, energy and play style.',
    },
    {
      heading: 'Sniffing activities',
      body: 'Sniffing is mentally tiring in the best way and helps dogs feel calmer.',
      list: [
        'Scatter feeding in grass or a snuffle mat',
        'Find-it games around the kitchen',
        'Slow “sniffari” walks where your dog leads',
        'Hiding treats inside cardboard boxes',
      ],
    },
    {
      heading: 'Puzzle and problem-solving',
      body: 'Start easy and gradually increase difficulty so your dog stays confident.',
      list: [
        'Lickmats with soft food',
        'Treat-dispensing toys with kibble',
        'Cardboard puzzles you can make at home',
        'Frozen toys for hot days or teething',
      ],
    },
    {
      heading: 'Calming activities',
      body: 'Great after busy days or when guests have just left.',
      list: [
        'A long-lasting chew on a settle mat',
        'Stuffed and frozen rubber toys',
        'Gentle massage and slow strokes',
        'Quiet sniff sessions in low-traffic areas',
      ],
    },
    {
      heading: 'Training and bonding',
      body: 'Short, positive sessions build connection and confidence.',
      list: [
        'Two-minute trick training bursts',
        'Hand-target games',
        'Name recognition with treats',
        'Settle on a mat with calm praise',
      ],
    },
    {
      heading: 'How often to mix it up',
      body: 'Most dogs do well with a small daily dose of sniffing, a chew option, and one short brain game. Rotate toys weekly to keep them feeling new.',
    },
  ],
  cta: {
    title: 'Get personalised enrichment ideas',
    body: 'Tell us about your dog and we’ll suggest the right activities to try first.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['puppy-socialisation-checklist', 'toy-safety-guide'],
}
