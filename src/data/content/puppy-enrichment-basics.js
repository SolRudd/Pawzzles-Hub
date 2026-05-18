import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'puppy-enrichment-basics',
  slug: 'puppy-enrichment-basics',
  type: 'Guide',
  category: 'Puppy',
  title: 'Puppy Enrichment Basics',
  intro:
    'A starter guide to simple puppy enrichment that supports curiosity, calm focus and everyday routines.',
  time: '6 min read',
  image: 'resource-puppy-enrichment-basics',
  imageSrc: resourceHubImages['resource-puppy-enrichment-basics'],
  imageAlt: 'Cockapoo puppy pawing at an easy teal treat puzzle',
  metaTitle: 'Puppy Enrichment Basics | Pawzzles',
  metaDescription:
    'Simple puppy enrichment ideas for calm focus, confidence and practical everyday routines.',
  sections: [
    {
      heading: 'Keep it short and easy',
      body: 'Puppies learn best in short, positive sessions. Choose activities that feel achievable and stop while your puppy is still enjoying it.',
      list: [
        'Two-minute training games',
        'Gentle sniffing games',
        'Simple food puzzles with easy access',
      ],
    },
    {
      heading: 'Pair play with calm',
      body: 'A little structure helps puppies settle after excitement. Follow active play with a quiet chew, a lick mat or a nap routine.',
    },
    {
      heading: 'Use safe supervision',
      body: 'Always supervise puppies with new toys or feeding products. Check size, chewing style and wear before each session.',
    },
  ],
  cta: {
    title: 'Use the puppy checklist next',
    body: 'Build confidence with calm, practical socialisation ideas.',
    button: 'Open puppy checklist',
    href: '/resources/puppy-socialisation-checklist',
  },
  related: ['puppy-socialisation-checklist', 'indoor-enrichment-ideas', 'toy-safety-guide'],
}
