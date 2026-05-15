import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'choosing-enrichment-toys-by-play-style',
  slug: 'choosing-enrichment-toys-by-play-style',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Choosing Enrichment Toys by Play Style',
  intro:
    'A simple way to choose enrichment toys based on whether your dog loves sniffing, chewing, chasing or solving puzzles.',
  time: '6 min read',
  image: 'card-enrichment-play',
  imageSrc: resourceHubImages['card-enrichment-play'],
  imageAlt: 'Dog playing with a colourful puzzle enrichment toy',
  metaTitle: 'Choosing Enrichment Toys by Play Style | Pawzzles',
  metaDescription:
    'Choose dog enrichment toys by play style with practical ideas for sniffers, chewers, chasers and problem-solvers.',
  sections: [
    {
      heading: 'For sniffers',
      body: 'Sniff-led dogs often enjoy snuffle mats, scatter feeding and hide-and-find games. Keep the setup calm and let them work at their own pace.',
    },
    {
      heading: 'For chewers',
      body: 'Chewers often do well with durable chew toys, lick mats and supervised settling activities. Match the toy to your dog’s chewing strength.',
    },
    {
      heading: 'For chasers',
      body: 'Chasers may enjoy tug, fetch and short movement games. Keep sessions brief and add a clear finish so arousal comes back down.',
    },
    {
      heading: 'For problem-solvers',
      body: 'Puzzle toys are useful for dogs who like working things out. Start with an easy setting, then increase challenge slowly.',
    },
  ],
  cta: {
    title: 'Get a tailored starting point',
    body: 'Answer four quick questions and get a simple enrichment mix for your dog.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['enrichment-ideas-by-play-style', 'introducing-a-new-dog-toy', 'toy-safety-guide'],
}
