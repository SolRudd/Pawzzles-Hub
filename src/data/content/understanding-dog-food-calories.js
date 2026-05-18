import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'understanding-dog-food-calories',
  slug: 'understanding-dog-food-calories',
  type: 'Guide',
  category: 'Feeding',
  title: 'Understanding Dog Food Calories',
  intro:
    'A simple guide to kcal per 100g, food labels and using calorie information more confidently.',
  time: '5 min read',
  image: 'resource-understanding-dog-food-calories',
  imageSrc: resourceHubImages['resource-understanding-dog-food-calories'],
  imageAlt: 'Miniature schnauzer beside measured food portions and a blank scale',
  metaTitle: 'Understanding Dog Food Calories | Pawzzles',
  metaDescription:
    'A simple Pawzzles guide to kcal per 100g, dog food labels and using calorie information as a feeding starting point.',
  sections: [
    {
      heading: 'What kcal per 100g means',
      body: 'Kcal per 100g tells you how much energy is in a set weight of food. It is useful because dry, wet and raw foods can have very different calorie density.',
    },
    {
      heading: 'Why it helps portion estimates',
      body: 'A daily calorie estimate is only half the picture. To estimate grams per day, the calculator needs a kcal per 100g value from the food you actually use.',
      list: [
        'Manual kcal from the label gives the most useful estimate',
        'Fallback values are only a starting point',
        'Treats and chews still count towards daily intake',
      ],
    },
    {
      heading: 'Where to find the number',
      body: 'Look for calorie content, energy value or metabolisable energy on the packaging. If it is not printed clearly, check the manufacturer’s website.',
    },
    {
      heading: 'Use it as general guidance',
      body: 'Adjust based on your dog’s routine, body condition and appetite. Speak to your vet if you are worried about weight, appetite or health.',
    },
  ],
  cta: {
    title: 'Use the value in the calculator',
    body: 'Enter kcal per 100g from your food label for a more useful grams estimate.',
    button: 'Try the feeding calculator',
    href: '/calculators/dog-feeding-calculator',
  },
  related: [
    'how-to-read-dog-food-feeding-labels',
    'dry-wet-raw-dog-food-calculator',
    'dog-feeding-calculator',
  ],
}
