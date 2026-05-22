import { getPublishedResources } from './resources.js'

const groupDefinitions = [
  {
    title: 'Dog Enrichment',
    description: 'Everyday enrichment ideas, safe play and simple ways to keep dogs busy.',
    ids: [
      'best-dog-enrichment-ideas',
      'enrichment-ideas-by-play-style',
      'choosing-enrichment-toys-by-play-style',
      'indoor-enrichment-ideas',
      'small-dog-enrichment-ideas',
    ],
  },
  {
    title: 'Slow Feeders',
    description: 'Guides for calmer, slower and more engaging mealtimes.',
    ids: [
      'slow-feeder-guide',
      'choosing-the-right-slow-feeder',
      'slow-feeders-and-mealtime-routines',
      'enrichment-for-fast-eaters',
      'calmer-mealtime-routine',
    ],
  },
  {
    title: 'Lick Mats',
    description: 'Calm food-based enrichment ideas where lick mats may fit into a routine.',
    ids: [
      'mealtime-enrichment-ideas',
      'puppy-enrichment-basics',
      'indoor-enrichment-ideas',
      'small-dog-feeding-enrichment',
    ],
  },
  {
    title: 'Puzzle Toys',
    description: 'Choosing and introducing puzzle toys safely for different play styles.',
    ids: [
      'choosing-enrichment-toys-by-play-style',
      'enrichment-ideas-by-play-style',
      'introducing-a-new-dog-toy',
      'toy-safety-guide',
    ],
  },
  {
    title: 'Snuffle / Foraging',
    description: 'Sniffing, searching and foraging ideas for indoor and everyday routines.',
    ids: [
      'best-dog-enrichment-ideas',
      'indoor-enrichment-ideas',
      'mealtime-enrichment-ideas',
      'small-dog-enrichment-ideas',
    ],
  },
  {
    title: 'Puppy Enrichment',
    description: 'Puppy-safe socialisation, training and enrichment foundations.',
    ids: [
      'puppy-socialisation-checklist',
      'puppy-enrichment-basics',
      'indoor-enrichment-ideas',
    ],
  },
  {
    title: 'Boredom / Anxiety',
    description: 'Low-fuss ideas for calmer days, rainy days and dogs who need something useful to do.',
    ids: [
      'indoor-enrichment-ideas',
      'best-dog-enrichment-ideas',
      'calmer-mealtime-routine',
      'enrichment-for-fast-eaters',
    ],
  },
  {
    title: 'Feeding & Nutrition',
    description: 'Practical feeding, calorie and portion guides for everyday dog care.',
    ids: [
      'dog-feeding-calculator',
      'how-to-read-dog-food-feeding-labels',
      'understanding-dog-food-calories',
      'dry-wet-raw-dog-food-calculator',
      'small-dog-feeding-enrichment',
    ],
  },
]

export function getGuideGroups() {
  const published = getPublishedResources()
  const byId = new Map(published.map((resource) => [resource.id, resource]))

  return groupDefinitions
    .map((group) => ({
      ...group,
      resources: group.ids.map((id) => byId.get(id)).filter(Boolean),
    }))
    .filter((group) => group.resources.length > 0)
}

