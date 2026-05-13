import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'mealtime-enrichment-ideas',
  slug: 'mealtime-enrichment-ideas',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Mealtime Enrichment Ideas',
  intro:
    'Simple ways to turn everyday feeding into a more engaging routine.',
  time: '4 min read',
  image: 'card-feeding-nutrition',
  imageSrc: resourceHubImages['card-feeding-nutrition'],
  imageAlt: 'Happy dog beside a teal food bowl in a warm kitchen',
  metaTitle: 'Mealtime Enrichment Ideas — Pawzzles',
  metaDescription:
    'Simple Pawzzles mealtime enrichment ideas using slow feeders, scatter feeding and practical daily routines.',
  sections: [
    {
      heading: 'Make meals do more',
      body: 'Mealtime enrichment uses your dog’s normal food in a slightly more interesting way. It can make feeding feel more engaging without adding lots of extra treats or complicated prep.',
    },
    {
      heading: 'Easy ideas to try',
      body: 'Start with one idea and keep it simple enough that your dog succeeds.',
      list: [
        'Split a meal between a bowl and a slow feeder',
        'Scatter a small portion on a clean mat or safe patch of grass',
        'Use a snuffle mat for part of breakfast',
        'Hide a few pieces of kibble in folded towels or cardboard tubes',
      ],
    },
    {
      heading: 'Build a calmer rhythm',
      body: 'A predictable feeding routine can support calmer routines. Use the same place, keep sessions supervised, and pack the feeder away when your dog has finished.',
    },
    {
      heading: 'Keep it dog-friendly',
      body: 'Choose activities that match your dog’s confidence, size and eating style. If an activity causes frustration, make it easier next time.',
    },
  ],
  cta: {
    title: 'Choose a slow feeder',
    body: 'See what to look for based on your dog’s size, eating style and routine.',
    button: 'Read the slow feeder guide',
    href: '/resources/choosing-the-right-slow-feeder',
  },
  related: ['slow-feeder-guide', 'best-dog-enrichment-ideas', 'toy-safety-guide'],
}
