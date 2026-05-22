import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'dry-wet-raw-dog-food-calculator',
  slug: 'dry-wet-raw-dog-food-calculator',
  type: 'Guide',
  category: 'Feeding',
  title: 'Dry, Wet or Raw Food: What Changes in the Calculator?',
  intro:
    'How different food types can change estimated feeding amounts and why packet calories matter.',
  time: '5 min read',
  image: 'resource-dry-wet-raw-dog-food-calculator',
  imageSrc: resourceHubImages['resource-dry-wet-raw-dog-food-calculator'],
  imageAlt: 'Whippet beside three plain bowls of different dog food types',
  metaTitle: 'Dry, Wet or Raw Dog Food Calculator Guide | Pawzzles',
  metaDescription:
    'Understand why dry, wet and raw foods can produce different grams estimates in the Pawzzles feeding calculator.',
  sections: [
    {
      heading: 'Food type changes calorie density',
      body: 'Dry kibble is usually more calorie dense than wet food because it contains less moisture. Wet pouches, trays and raw foods can need a different gram amount for the same daily calories.',
    },
    {
      heading: 'How the calculator uses food type',
      body: 'The feeding calculator uses your own kcal per 100g first. If you do not know it, it uses a safe fallback estimate for dry, wet or complete raw food.',
      list: [
        'Dry food fallback: 360 kcal per 100g',
        'Wet food fallback: 100 kcal per 100g',
        'Complete raw fallback: 150 kcal per 100g',
      ],
    },
    {
      heading: 'Why mixed feeding is different',
      body: 'Mixed feeding varies too much for one generic grams estimate. Use the kcal per 100g from your products, or calculate each food separately.',
    },
    {
      heading: 'Check the packet when possible',
      body: 'Food energy varies by brand and recipe. For the most accurate result, use the kcal per 100g from your dog food packaging or the manufacturer’s website.',
    },
  ],
  cta: {
    title: 'Estimate a starting portion',
    body: 'Choose your food type or add the kcal per 100g from your packet.',
    button: 'Try the feeding calculator',
    href: '/calculators/dog-feeding-calculator/',
  },
  related: [
    'understanding-dog-food-calories',
    'how-to-read-dog-food-feeding-labels',
    'slow-feeder-guide',
  ],
}
