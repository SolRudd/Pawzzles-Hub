import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'introducing-a-new-dog-toy',
  slug: 'introducing-a-new-dog-toy',
  type: 'Guide',
  category: 'Toy Safety',
  title: 'Safe Ways to Introduce a New Dog Toy',
  intro:
    'A practical guide to introducing new toys safely and making playtime easier to supervise.',
  time: '4 min read',
  image: 'resource-toy-safety',
  imageSrc: resourceHubImages['resource-toy-safety'],
  imageAlt: 'Dog lying beside clean teal and orange toys',
  metaTitle: 'Safe Ways to Introduce a New Dog Toy | Pawzzles',
  metaDescription:
    'A practical Pawzzles guide to introducing a new dog toy safely, checking fit and supervising play.',
  sections: [
    {
      heading: 'Check size and strength first',
      body: 'Before offering a new toy, check it suits your dog’s size, chewing style and play habits. A toy should not be small enough to swallow.',
    },
    {
      heading: 'Start with a short session',
      body: 'Offer the toy while you can watch closely. Short first sessions make it easier to see how your dog uses their mouth, paws and body.',
    },
    {
      heading: 'Look for wear early',
      body: 'Check for loose stitching, cracks, missing pieces or frayed rope. Retire a toy if it starts to break down.',
    },
    {
      heading: 'Put toys away between uses',
      body: 'Rotating toys helps play feel fresh and gives you a chance to inspect them. Always supervise dogs with new toys or feeding products.',
    },
  ],
  cta: {
    title: 'Choose safer play ideas',
    body: 'Match enrichment ideas to how your dog likes to play.',
    button: 'Browse enrichment by play style',
    href: '/resources/enrichment-ideas-by-play-style',
  },
  related: ['toy-safety-guide', 'enrichment-ideas-by-play-style', 'choosing-enrichment-toys-by-play-style'],
}
