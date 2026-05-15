import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'slow-feeder-guide',
  slug: 'slow-feeder-guide',
  type: 'Guide',
  category: 'Feeding',
  title: 'Slow Feeder Guide',
  intro:
    'How slow feeders can help make mealtimes calmer, slower and more enriching.',
  time: '5 min read',
  image: 'resource-small-dog-slow-feeder',
  imageSrc: resourceHubImages['resource-small-dog-slow-feeder'],
  imageAlt: 'Small dog beside a teal slow feeder bowl in a warm home',
  metaTitle: 'Slow Feeder Guide | Pawzzles',
  metaDescription:
    'A practical Pawzzles guide to slow feeders, calmer mealtimes and everyday feeding enrichment.',
  sections: [
    {
      heading: 'What a slow feeder does',
      body: 'A slow feeder adds gentle obstacles to a bowl or tray so food takes longer to reach. It may help slow down mealtimes and can make feeding feel more engaging for dogs who rush meals.',
    },
    {
      heading: 'When it can be useful',
      body: 'Slow feeders are best used as part of a practical routine, not a complete answer on their own.',
      list: [
        'Dogs who finish meals very quickly',
        'Dogs who enjoy sniffing and problem-solving',
        'Mealtimes that could use a calmer pace',
        'Owners who want simple enrichment built into the day',
      ],
    },
    {
      heading: 'Start easy',
      body: 'Pick a simple pattern at first. If the feeder is too tricky, your dog may get frustrated instead of engaged.',
      list: [
        'Add part of the meal first rather than the whole portion',
        'Watch how your dog uses their nose, tongue and paws',
        'Keep the first sessions short and positive',
        'Switch back to a normal bowl if your dog seems worried',
      ],
    },
    {
      heading: 'Safety and cleaning',
      body: 'Always supervise dogs with new feeding products. Choose a size and material that suits your dog, check for wear, and clean the feeder after use so food does not build up.',
    },
  ],
  cta: {
    title: 'Turn feeding into enrichment',
    body: 'Try simple mealtime ideas that support calmer routines.',
    button: 'Read mealtime ideas',
    href: '/resources/mealtime-enrichment-ideas',
  },
  related: ['mealtime-enrichment-ideas', 'choosing-the-right-slow-feeder', 'dog-feeding-calculator'],
}
