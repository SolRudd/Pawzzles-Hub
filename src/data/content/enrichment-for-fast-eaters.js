import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'enrichment-for-fast-eaters',
  slug: 'enrichment-for-fast-eaters',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Enrichment for Dogs Who Eat Too Quickly',
  intro:
    'Practical enrichment ideas for dogs who rush their meals, with safe everyday routine tips.',
  time: '5 min read',
  image: 'resource-enrichment-ideas',
  imageSrc: resourceHubImages['resource-enrichment-ideas'],
  imageAlt: 'Dog with puzzle, snuffle and chew enrichment toys',
  metaTitle: 'Enrichment for Dogs Who Eat Too Quickly | Pawzzles',
  metaDescription:
    'Practical Pawzzles enrichment ideas for dogs who rush meals, including slow feeders, scatter feeding and calm routines.',
  sections: [
    {
      heading: 'Slow the meal gently',
      body: 'Use simple setups first. A shallow slow feeder, snuffle mat or scatter feeding can make food take longer without making the meal feel too hard.',
    },
    {
      heading: 'Split food into smaller moments',
      body: 'Some dogs do better when part of the meal becomes a short activity. Keep sessions supervised and stop before your dog gets frustrated.',
      list: [
        'Put a small portion in a slow feeder',
        'Scatter a handful on a clean mat',
        'Use a small food-dispensing toy',
        'Save a few pieces for calm training',
      ],
    },
    {
      heading: 'Keep arousal low',
      body: 'Fast eaters can become excited quickly. Set up food before your dog enters the area and keep the routine quiet and predictable.',
    },
    {
      heading: 'Use general guidance',
      body: 'Every dog is different. Adjust based on your dog’s routine, body condition and appetite, and speak to your vet if you are worried about weight, appetite or health.',
    },
  ],
  cta: {
    title: 'Build a calmer mealtime',
    body: 'Start with a simple routine before adding more enrichment.',
    button: 'Read mealtime routine tips',
    href: '/resources/calmer-mealtime-routine',
  },
  related: ['slow-feeders-and-mealtime-routines', 'mealtime-enrichment-ideas', 'toy-safety-guide'],
}
