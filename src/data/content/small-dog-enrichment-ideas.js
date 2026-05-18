import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'small-dog-enrichment-ideas',
  slug: 'small-dog-enrichment-ideas',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Small Dog Enrichment Ideas',
  intro:
    'Enrichment ideas scaled for smaller dogs, smaller spaces and shorter sessions.',
  time: '5 min read',
  image: 'resource-small-dog-enrichment-ideas',
  imageSrc: resourceHubImages['resource-small-dog-enrichment-ideas'],
  imageAlt: 'Chihuahua using a small wooden enrichment puzzle',
  metaTitle: 'Small Dog Enrichment Ideas | Pawzzles',
  metaDescription:
    'Practical enrichment ideas for small dogs, including sniffing, puzzles, mealtime play and calm routines.',
  sections: [
    {
      heading: 'Choose the right scale',
      body: 'Small dogs often need shallower puzzles, lighter toys and shorter sessions. The best setup is one your dog can use comfortably.',
      list: [
        'Use small, stable toys',
        'Pick puzzle openings that suit your dog’s muzzle',
        'Keep the first session easy',
      ],
    },
    {
      heading: 'Make small spaces useful',
      body: 'A hallway, kitchen or living room can still work well for sniffing games, food scatter games and short training bursts.',
    },
    {
      heading: 'Watch energy and confidence',
      body: 'Some small dogs are bold problem-solvers. Others prefer slow, gentle setups. Let your dog’s confidence guide the difficulty.',
    },
  ],
  cta: {
    title: 'Match ideas to play style',
    body: 'Use the Enrichment Finder to choose activities that fit your dog’s routine.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['small-dog-feeding-enrichment', 'choosing-enrichment-toys-by-play-style', 'toy-safety-guide'],
}
