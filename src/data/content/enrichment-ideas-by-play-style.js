import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'enrichment-ideas-by-play-style',
  slug: 'enrichment-ideas-by-play-style',
  type: 'Guide',
  category: 'Enrichment',
  title: 'Dog Enrichment Ideas by Play Style',
  intro:
    'How to match enrichment ideas to dogs who like sniffing, chewing, chasing, solving or foraging.',
  time: '6 min read',
  image: 'resource-enrichment-ideas-by-play-style',
  imageSrc: resourceHubImages['resource-enrichment-ideas-by-play-style'],
  imageAlt: 'Husky surrounded by different enrichment toys for play styles',
  metaTitle: 'Dog Enrichment Ideas by Play Style | Pawzzles',
  metaDescription:
    'Match dog enrichment ideas to play styles including sniffing, chewing, chasing, solving and foraging.',
  sections: [
    {
      heading: 'For sniffers and foragers',
      body: 'Try scatter feeding, snuffle mats, find-it games and slower sniff walks. These activities let your dog use their nose at their own pace.',
    },
    {
      heading: 'For chewers',
      body: 'Choose supervised chew toys, lick mats and calm settle activities. Match the product to your dog’s size and chewing style.',
    },
    {
      heading: 'For chasers',
      body: 'Use short movement games with a clear start and finish. Keep sessions brief so excitement can settle again afterwards.',
    },
    {
      heading: 'For problem-solvers',
      body: 'Puzzle toys and food-dispensing toys can be useful, but start easy. Increase the challenge only when your dog is confident.',
    },
    {
      heading: 'Rotate, do not overload',
      body: 'Most dogs do not need lots of activities at once. Rotate a small set and always supervise dogs with new toys or feeding products.',
    },
  ],
  cta: {
    title: 'Get a quick activity match',
    body: 'Answer a few questions and get a simple enrichment plan for your dog.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['best-dog-enrichment-ideas', 'choosing-enrichment-toys-by-play-style', 'introducing-a-new-dog-toy'],
}
