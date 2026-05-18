import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'small-dog-feeding-enrichment',
  slug: 'small-dog-feeding-enrichment',
  type: 'Guide',
  category: 'Feeding',
  title: 'Small Dog Feeding and Enrichment Tips',
  intro:
    'Useful feeding and enrichment ideas for smaller dogs, with simple routine tips.',
  time: '5 min read',
  image: 'resource-small-dog-feeding-enrichment',
  imageSrc: resourceHubImages['resource-small-dog-feeding-enrichment'],
  imageAlt: 'Papillon exploring a small teal food puzzle in a kitchen',
  metaTitle: 'Small Dog Feeding and Enrichment Tips | Pawzzles',
  metaDescription:
    'Simple Pawzzles feeding and enrichment tips for smaller dogs, including portion estimates, slow feeders and toy choice.',
  sections: [
    {
      heading: 'Small portions still need care',
      body: 'Small dogs can have smaller daily portions, so treats and extras can make a bigger difference. Use calorie information as a starting point and adjust with your dog’s routine.',
    },
    {
      heading: 'Choose smaller enrichment setups',
      body: 'Use shallow slow feeders, small snuffle mats and toys that suit your dog’s mouth size. Keep the first session easy.',
    },
    {
      heading: 'Split activities through the day',
      body: 'A few small moments often work better than one long session. Try a short sniff game, a calm chew and a simple food puzzle.',
    },
    {
      heading: 'Supervise and adjust',
      body: 'Always supervise dogs with new toys or feeding products. Speak to your vet if you are worried about weight, appetite or health.',
    },
  ],
  cta: {
    title: 'Estimate a starting portion',
    body: 'Use food type or kcal per 100g to get a practical feeding estimate.',
    button: 'Try the feeding calculator',
    href: '/calculators/dog-feeding-calculator',
  },
  related: ['dog-feeding-calculator', 'small-dog-enrichment-ideas', 'how-to-read-dog-food-feeding-labels'],
}
