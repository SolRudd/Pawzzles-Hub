import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'toy-safety-guide',
  slug: 'toy-safety-guide',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Toy Safety Guide',
  intro:
    'A practical guide to choosing safe toys and supervising play, so your dog can enjoy enrichment with fewer risks.',
  time: '4 min read',
  image: 'resource-toy-safety',
  imageSrc: resourceHubImages['resource-toy-safety'],
  imageAlt: 'Dog lying beside clean teal and orange toys',
  metaTitle: 'Dog Toy Safety Guide — Pawzzles',
  metaDescription:
    'A practical, dog-friendly guide to choosing safe toys, recognising wear and tear, and supervising play sessions.',
  sections: [
    {
      heading: 'Match toys to your dog',
      body: 'Size, chewing strength and play style all matter. A toy that suits a small, gentle chewer might not last five minutes with a strong chewer — and a toy that’s too small can be a choking hazard for a larger dog.',
      list: [
        'Pick a size your dog can’t swallow',
        'Match toughness to chewing style',
        'Avoid hard, brittle materials for power chewers',
        'Watch for small parts that could come off',
      ],
    },
    {
      heading: 'Check toys regularly',
      body: 'Toys wear out faster than people expect. Build a quick weekly check into your routine.',
      list: [
        'Look for splits, frayed rope or loose stitching',
        'Replace toys with chunks missing',
        'Wash soft toys to keep them hygienic',
        'Retire toys that have become too small over time',
      ],
    },
    {
      heading: 'Supervise the right way',
      body: 'Even safe toys are safest with a quick check-in. Long-lasting chews, frozen toys and puzzle feeders all benefit from supervision, especially the first few times you use them.',
    },
    {
      heading: 'Rotate to keep play fresh',
      body: 'Putting some toys away for a week and bringing them back later often makes them feel brand new — and reduces wear at the same time.',
    },
    {
      heading: 'When to stop play',
      body: 'If your dog is overexcited, getting frustrated, or play has become rough, take a short break. A calm rest and a chew on a settle mat helps them reset.',
    },
  ],
  cta: {
    title: 'Pair safe toys with the right activities',
    body: 'See enrichment ideas matched to your dog’s play style.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['best-dog-enrichment-ideas', 'puppy-socialisation-checklist'],
}
