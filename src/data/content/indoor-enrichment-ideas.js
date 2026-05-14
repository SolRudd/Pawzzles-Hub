import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'indoor-enrichment-ideas',
  slug: 'indoor-enrichment-ideas',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Indoor Enrichment Ideas for Rainy Days',
  intro:
    'Simple indoor enrichment ideas for days when walks are shorter and your dog still needs something useful to do.',
  time: '5 min read',
  image: 'resource-enrichment-ideas',
  imageSrc: resourceHubImages['resource-enrichment-ideas'],
  imageAlt: 'Dog with puzzle, snuffle and chew enrichment toys',
  metaTitle: 'Indoor Enrichment Ideas for Rainy Days | Pawzzles',
  metaDescription:
    'Low-fuss indoor dog enrichment ideas for rainy days, shorter walks and calmer home routines.',
  sections: [
    {
      heading: 'Start with sniffing',
      body: 'Sniffing is a simple way to make indoor time feel more interesting. Keep the setup easy and use part of your dog’s normal food if you want a low-fuss option.',
      list: [
        'Scatter food pieces on a clean mat',
        'Hide kibble in a folded towel',
        'Use a snuffle mat for part of breakfast',
      ],
    },
    {
      heading: 'Add a calm puzzle',
      body: 'Puzzle toys work best when your dog can succeed quickly at first. Start simple, then add difficulty as confidence grows.',
      list: [
        'Choose a beginner puzzle for the first session',
        'Keep sessions short',
        'Put the toy away before frustration builds',
      ],
    },
    {
      heading: 'Build in rest',
      body: 'Rainy day enrichment does not need to fill the whole day. A few short activities with quiet breaks between them can support a calmer routine.',
    },
  ],
  cta: {
    title: 'Find ideas that match your dog',
    body: 'Use the Enrichment Finder to choose activities by age, energy and play style.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['best-dog-enrichment-ideas', 'toy-safety-guide', 'puppy-enrichment-basics'],
}
