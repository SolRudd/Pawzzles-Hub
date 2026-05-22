import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'calmer-mealtime-routine',
  slug: 'calmer-mealtime-routine',
  type: 'Guide',
  category: 'Feeding',
  title: 'How to Build a Calmer Mealtime Routine',
  intro:
    'Simple ways to make mealtimes feel calmer, slower and easier to manage.',
  time: '4 min read',
  image: 'resource-calmer-mealtime-routine',
  imageSrc: resourceHubImages['resource-calmer-mealtime-routine'],
  imageAlt: 'Cavalier spaniel sitting beside a calm mealtime setup',
  metaTitle: 'How to Build a Calmer Mealtime Routine | Pawzzles',
  metaDescription:
    'Simple Pawzzles tips for a calmer dog mealtime routine using predictable setup, portion estimates and gentle enrichment.',
  sections: [
    {
      heading: 'Use the same setup',
      body: 'A familiar place, bowl or feeder and order of steps can make mealtimes easier to manage. Keep the area low traffic where possible.',
    },
    {
      heading: 'Estimate the portion first',
      body: 'Use your dog’s food label and daily calorie estimate as a starting point. Check your dog food packaging where possible and adjust based on routine, body condition and appetite.',
    },
    {
      heading: 'Add one enrichment step',
      body: 'Choose one simple mealtime activity at a time. A slow feeder, snuffle mat or scatter feed can help the meal feel more engaging.',
    },
    {
      heading: 'Finish clearly',
      body: 'When the meal is done, remove the bowl or feeder and move into a calmer activity. Always supervise dogs with new feeding products.',
    },
  ],
  cta: {
    title: 'Estimate the daily calories',
    body: 'Use the feeding calculator as a practical starting point for meal planning.',
    button: 'Try the feeding calculator',
    href: '/calculators/dog-feeding-calculator/',
  },
  related: ['dog-feeding-calculator', 'slow-feeders-and-mealtime-routines', 'mealtime-enrichment-ideas'],
}
