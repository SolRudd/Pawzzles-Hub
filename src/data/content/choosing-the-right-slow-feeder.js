import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'choosing-the-right-slow-feeder',
  slug: 'choosing-the-right-slow-feeder',
  type: 'Guide',
  category: 'Feeding',
  title: 'Choosing the Right Slow Feeder',
  intro:
    'What to look for when choosing a slow feeder based on your dog’s size, eating style and routine.',
  time: '6 min read',
  image: 'resource-choosing-the-right-slow-feeder',
  imageSrc: resourceHubImages['resource-choosing-the-right-slow-feeder'],
  imageAlt: 'Corgi beside several plain slow feeder bowls',
  metaTitle: 'Choosing the Right Slow Feeder | Pawzzles',
  metaDescription:
    'Practical, dog-friendly advice for choosing a slow feeder by size, eating style, material and routine.',
  sections: [
    {
      heading: 'Match the challenge to your dog',
      body: 'The right slow feeder should slow the meal without making it feel impossible. A shallow pattern often suits beginners, while confident problem-solvers may enjoy a little more complexity.',
    },
    {
      heading: 'What to check before buying',
      body: 'Think about how your dog eats, where meals happen, and how easy the feeder will be to clean.',
      list: [
        'Size and depth that suit your dog’s muzzle',
        'A stable base that does not slide around too much',
        'Food-safe materials that are easy to wash',
        'A pattern that is challenging but not frustrating',
      ],
    },
    {
      heading: 'Small dogs and flat-faced dogs',
      body: 'Some dogs need shallower shapes and wider channels. Watch their first few meals closely and switch to an easier design if they struggle to reach the food comfortably.',
    },
    {
      heading: 'Introduce it gradually',
      body: 'Use the feeder for part of the meal first. Always supervise dogs with new feeding products and check the feeder regularly for damage or wear.',
    },
  ],
  cta: {
    title: 'Estimate daily portions first',
    body: 'Use the feeding calculator as a practical starting point for meal planning.',
    button: 'Open feeding calculator',
    href: '/calculators/dog-feeding-calculator/',
  },
  related: ['slow-feeder-guide', 'mealtime-enrichment-ideas', 'dog-feeding-calculator'],
}
