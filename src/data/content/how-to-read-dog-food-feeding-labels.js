import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'how-to-read-dog-food-feeding-labels',
  slug: 'how-to-read-dog-food-feeding-labels',
  type: 'Guide',
  category: 'Feeding',
  title: 'How to Read Dog Food Feeding Labels',
  intro:
    'A simple guide to finding kcal per 100g, understanding feeding guides and using packet information more confidently.',
  time: '5 min read',
  image: 'card-feeding-nutrition',
  imageSrc: resourceHubImages['card-feeding-nutrition'],
  imageAlt: 'Happy dog beside a teal food bowl in a warm kitchen',
  metaTitle: 'How to Read Dog Food Feeding Labels | Pawzzles',
  metaDescription:
    'A simple Pawzzles guide to finding kcal per 100g, reading dog food feeding guides and using packet information as a practical starting point.',
  sections: [
    {
      heading: 'Find the kcal per 100g',
      body: 'The most useful number for a portion estimate is kcal per 100g. It may be listed as metabolisable energy, calorie content or energy value. If it is not on the pack, check the manufacturer website or product data sheet.',
    },
    {
      heading: 'Food type changes the grams estimate',
      body: 'Dry food, wet pouches, trays and raw foods can have very different moisture levels. That means the same daily calorie target can look like very different gram amounts.',
      list: [
        'Dry kibble is usually more calorie dense per 100g',
        'Wet foods often contain more moisture and fewer calories per 100g',
        'Complete raw foods vary by recipe and fat level',
        'Mixed feeding is best calculated from the products you actually use',
      ],
    },
    {
      heading: 'Use feeding guides as a starting point',
      body: 'Packet feeding guides are useful, but they are broad estimates. Your dog’s age, body condition, activity, neuter status, treats and routine can all change what works in practice.',
    },
    {
      heading: 'Check the full daily intake',
      body: 'Include treats, chews, training food and extras when you think about daily calories. If you use more than one food, calculate each part separately or use the combined kcal per 100g from your own mix.',
    },
  ],
  cta: {
    title: 'Use the label value in the calculator',
    body: 'Enter the kcal per 100g from your food packaging for a more useful grams estimate.',
    button: 'Open feeding calculator',
    href: '/calculators/dog-feeding-calculator',
  },
  related: [
    'understanding-dog-food-calories',
    'dry-wet-raw-dog-food-calculator',
    'dog-feeding-calculator',
  ],
}
