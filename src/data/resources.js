import { resourceHubImages } from './imageAssets.js'

const DEFAULT_LASTMOD = '2026-05-15'

/**
 * Full resource catalogue.
 * Categories used by /resources filters:
 *   all | feeding | enrichment | puppy | toy-safety | calculators | checklists
 *
 * Publishing fields:
 *   status: published | draft | coming_soon
 *   sitemap: false excludes a published item from generated sitemap
 *   noindex: true is used by detail pages when a page is intentionally visible but not indexable
 */
const resourceEntries = [
  {
    id: 'dog-feeding-calculator',
    slug: 'dog-feeding-calculator',
    status: 'published',
    sitemap: false,
    type: 'Calculator',
    category: 'Feeding',
    title: 'Dog Feeding Calculator',
    description: 'Estimate a starting daily portion for your dog.',
    time: '2 min tool',
    image: 'calculator-feeding',
    imageSrc: resourceHubImages['calculator-feeding'],
    imageAlt: 'Dog beside a food bowl and blank calculator props',
    href: '/calculators/dog-feeding-calculator',
    categories: ['calculators', 'feeding'],
    featured: true,
  },
  {
    id: 'enrichment-finder',
    slug: 'enrichment-finder',
    status: 'published',
    sitemap: false,
    type: 'Tool',
    category: 'Enrichment',
    title: 'Enrichment Finder',
    description: 'Personalised enrichment ideas in under a minute.',
    time: '1 min tool',
    image: 'calculator-enrichment',
    imageSrc: resourceHubImages['calculator-enrichment'],
    imageAlt: 'Dog exploring a teal and orange puzzle toy',
    href: '/calculators/enrichment-finder',
    categories: ['calculators', 'enrichment'],
    featured: true,
  },
  {
    id: 'puppy-socialisation-checklist',
    slug: 'puppy-socialisation-checklist',
    status: 'published',
    type: 'Checklist',
    category: 'Puppy',
    title: 'Puppy Socialisation Checklist',
    description: 'A practical checklist for the early weeks and months.',
    time: '5 min checklist',
    image: 'resource-puppy-socialisation-checklist',
    imageSrc: resourceHubImages['resource-puppy-socialisation-checklist'],
    imageAlt: 'Golden retriever puppy beside calm socialisation props in a warm home',
    href: '/resources/puppy-socialisation-checklist',
    categories: ['checklists', 'puppy'],
    featured: true,
  },
  {
    id: 'best-dog-enrichment-ideas',
    slug: 'best-dog-enrichment-ideas',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Best Dog Enrichment Ideas',
    description: 'Simple, low-cost enrichment your dog will love.',
    time: '4 min read',
    image: 'resource-best-dog-enrichment-ideas',
    imageSrc: resourceHubImages['resource-best-dog-enrichment-ideas'],
    imageAlt: 'Terrier mix exploring snuffle and puzzle enrichment toys',
    href: '/resources/best-dog-enrichment-ideas',
    categories: ['guides', 'enrichment'],
  },
  {
    id: 'toy-safety-guide',
    slug: 'toy-safety-guide',
    status: 'published',
    type: 'Guide',
    category: 'Toy Safety',
    title: 'Toy Safety Guide',
    description: 'Choose safe toys and play with confidence.',
    time: '4 min read',
    image: 'resource-toy-safety-guide',
    imageSrc: resourceHubImages['resource-toy-safety-guide'],
    imageAlt: 'Border collie beside safe dog toys on a cream rug',
    href: '/resources/toy-safety-guide',
    categories: ['guides', 'toy-safety', 'enrichment'],
  },
  {
    id: 'how-to-read-dog-food-feeding-labels',
    slug: 'how-to-read-dog-food-feeding-labels',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'How to Read Dog Food Feeding Labels',
    description:
      'A simple guide to finding kcal per 100g, understanding feeding guides and using packet information more confidently.',
    time: '5 min read',
    image: 'resource-how-to-read-dog-food-feeding-labels',
    imageSrc: resourceHubImages['resource-how-to-read-dog-food-feeding-labels'],
    imageAlt: 'Beagle beside a blank dog food bag, teal bowl and orange scoop',
    href: '/resources/how-to-read-dog-food-feeding-labels',
    categories: ['guides', 'feeding'],
  },
  {
    id: 'understanding-dog-food-calories',
    slug: 'understanding-dog-food-calories',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'Understanding Dog Food Calories',
    description:
      'A simple guide to kcal per 100g, food labels and using calorie information more confidently.',
    time: '5 min read',
    image: 'resource-understanding-dog-food-calories',
    imageSrc: resourceHubImages['resource-understanding-dog-food-calories'],
    imageAlt: 'Miniature schnauzer beside measured food portions and a blank scale',
    href: '/resources/understanding-dog-food-calories',
    categories: ['guides', 'feeding'],
  },
  {
    id: 'dry-wet-raw-dog-food-calculator',
    slug: 'dry-wet-raw-dog-food-calculator',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'Dry, Wet or Raw Food: What Changes in the Calculator?',
    description:
      'How different food types can change estimated feeding amounts and why packet calories matter.',
    time: '5 min read',
    image: 'resource-dry-wet-raw-dog-food-calculator',
    imageSrc: resourceHubImages['resource-dry-wet-raw-dog-food-calculator'],
    imageAlt: 'Whippet beside three plain bowls of different dog food types',
    href: '/resources/dry-wet-raw-dog-food-calculator',
    categories: ['guides', 'feeding'],
  },
  {
    id: 'slow-feeder-guide',
    slug: 'slow-feeder-guide',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'Slow Feeder Guide',
    description:
      'How slow feeders can help make mealtimes calmer, slower and more enriching.',
    time: '5 min read',
    image: 'resource-slow-feeder-guide',
    imageSrc: resourceHubImages['resource-slow-feeder-guide'],
    imageAlt: 'Dachshund sniffing a teal slow feeder bowl in a warm kitchen',
    href: '/resources/slow-feeder-guide',
    categories: ['guides', 'feeding'],
  },
  {
    id: 'slow-feeders-and-mealtime-routines',
    slug: 'slow-feeders-and-mealtime-routines',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'Slow Feeders and Mealtime Routines',
    description:
      'Simple ways to use slow feeders as part of a calmer, more engaging mealtime routine.',
    time: '4 min read',
    image: 'resource-slow-feeders-and-mealtime-routines',
    imageSrc: resourceHubImages['resource-slow-feeders-and-mealtime-routines'],
    imageAlt: 'Shih tzu waiting beside a tidy slow feeder mealtime station',
    href: '/resources/slow-feeders-and-mealtime-routines',
    categories: ['guides', 'feeding', 'enrichment'],
  },
  {
    id: 'mealtime-enrichment-ideas',
    slug: 'mealtime-enrichment-ideas',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Mealtime Enrichment Ideas',
    description:
      'Simple ways to turn everyday feeding into a more engaging routine.',
    time: '4 min read',
    image: 'resource-mealtime-enrichment-ideas',
    imageSrc: resourceHubImages['resource-mealtime-enrichment-ideas'],
    imageAlt: 'Cocker spaniel exploring a teal snuffle mat at mealtime',
    href: '/resources/mealtime-enrichment-ideas',
    categories: ['guides', 'feeding', 'enrichment'],
  },
  {
    id: 'enrichment-for-fast-eaters',
    slug: 'enrichment-for-fast-eaters',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Enrichment for Dogs Who Eat Too Quickly',
    description:
      'Practical enrichment ideas for dogs who rush their meals, with safe everyday routine tips.',
    time: '5 min read',
    image: 'resource-enrichment-for-fast-eaters',
    imageSrc: resourceHubImages['resource-enrichment-for-fast-eaters'],
    imageAlt: 'Boxer calmly eating from a teal slow feeder bowl',
    href: '/resources/enrichment-for-fast-eaters',
    categories: ['guides', 'feeding', 'enrichment'],
  },
  {
    id: 'calmer-mealtime-routine',
    slug: 'calmer-mealtime-routine',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'How to Build a Calmer Mealtime Routine',
    description:
      'Simple ways to make mealtimes feel calmer, slower and easier to manage.',
    time: '4 min read',
    image: 'resource-calmer-mealtime-routine',
    imageSrc: resourceHubImages['resource-calmer-mealtime-routine'],
    imageAlt: 'Cavalier spaniel sitting beside a calm mealtime setup',
    href: '/resources/calmer-mealtime-routine',
    categories: ['guides', 'feeding', 'enrichment'],
  },
  {
    id: 'choosing-the-right-slow-feeder',
    slug: 'choosing-the-right-slow-feeder',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'Choosing the Right Slow Feeder',
    description:
      'What to look for based on your dog’s size, eating style and routine.',
    time: '6 min read',
    image: 'resource-choosing-the-right-slow-feeder',
    imageSrc: resourceHubImages['resource-choosing-the-right-slow-feeder'],
    imageAlt: 'Corgi beside several plain slow feeder bowls',
    href: '/resources/choosing-the-right-slow-feeder',
    categories: ['guides', 'feeding'],
  },
  {
    id: 'enrichment-ideas-by-play-style',
    slug: 'enrichment-ideas-by-play-style',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Dog Enrichment Ideas by Play Style',
    description:
      'How to match enrichment ideas to dogs who like sniffing, chewing, chasing, solving or foraging.',
    time: '6 min read',
    image: 'resource-enrichment-ideas-by-play-style',
    imageSrc: resourceHubImages['resource-enrichment-ideas-by-play-style'],
    imageAlt: 'Husky surrounded by different enrichment toys for play styles',
    href: '/resources/enrichment-ideas-by-play-style',
    categories: ['guides', 'enrichment'],
  },
  {
    id: 'choosing-enrichment-toys-by-play-style',
    slug: 'choosing-enrichment-toys-by-play-style',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Choosing Enrichment Toys by Play Style',
    description: 'Match toys to sniffers, chewers, chasers and problem-solvers.',
    time: '6 min read',
    image: 'resource-choosing-enrichment-toys-by-play-style',
    imageSrc: resourceHubImages['resource-choosing-enrichment-toys-by-play-style'],
    imageAlt: 'Australian shepherd sitting between different enrichment toy types',
    href: '/resources/choosing-enrichment-toys-by-play-style',
    categories: ['guides', 'enrichment', 'toy-safety'],
  },
  {
    id: 'introducing-a-new-dog-toy',
    slug: 'introducing-a-new-dog-toy',
    status: 'published',
    type: 'Guide',
    category: 'Toy Safety',
    title: 'Safe Ways to Introduce a New Dog Toy',
    description:
      'A practical guide to introducing new toys safely and making playtime easier to supervise.',
    time: '4 min read',
    image: 'resource-introducing-a-new-dog-toy',
    imageSrc: resourceHubImages['resource-introducing-a-new-dog-toy'],
    imageAlt: 'Staffordshire bull terrier calmly sniffing a new toy',
    href: '/resources/introducing-a-new-dog-toy',
    categories: ['guides', 'toy-safety', 'enrichment'],
  },
  {
    id: 'indoor-enrichment-ideas',
    slug: 'indoor-enrichment-ideas',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Indoor Enrichment Ideas for Rainy Days',
    description: 'Low-fuss enrichment for days when walks are shorter.',
    time: '5 min read',
    image: 'resource-indoor-enrichment-ideas',
    imageSrc: resourceHubImages['resource-indoor-enrichment-ideas'],
    imageAlt: 'Beagle using a wooden treat puzzle indoors on a rainy day',
    href: '/resources/indoor-enrichment-ideas',
    categories: ['guides', 'enrichment'],
  },
  {
    id: 'puppy-enrichment-basics',
    slug: 'puppy-enrichment-basics',
    status: 'published',
    type: 'Guide',
    category: 'Puppy',
    title: 'Puppy Enrichment Basics',
    description: 'Simple puppy-friendly ways to build calm focus and curiosity.',
    time: '6 min read',
    image: 'resource-puppy-enrichment-basics',
    imageSrc: resourceHubImages['resource-puppy-enrichment-basics'],
    imageAlt: 'Cockapoo puppy pawing at an easy teal treat puzzle',
    href: '/resources/puppy-enrichment-basics',
    categories: ['guides', 'puppy', 'enrichment'],
  },
  {
    id: 'small-dog-enrichment-ideas',
    slug: 'small-dog-enrichment-ideas',
    status: 'published',
    type: 'Guide',
    category: 'Enrichment',
    title: 'Small Dog Enrichment Ideas',
    description: 'Ideas scaled for smaller dogs, smaller spaces and shorter sessions.',
    time: '5 min read',
    image: 'resource-small-dog-enrichment-ideas',
    imageSrc: resourceHubImages['resource-small-dog-enrichment-ideas'],
    imageAlt: 'Chihuahua using a small wooden enrichment puzzle',
    href: '/resources/small-dog-enrichment-ideas',
    categories: ['guides', 'enrichment'],
  },
  {
    id: 'small-dog-feeding-enrichment',
    slug: 'small-dog-feeding-enrichment',
    status: 'published',
    type: 'Guide',
    category: 'Feeding',
    title: 'Small Dog Feeding and Enrichment Tips',
    description:
      'Useful feeding and enrichment ideas for smaller dogs, with simple routine tips.',
    time: '5 min read',
    image: 'resource-small-dog-feeding-enrichment',
    imageSrc: resourceHubImages['resource-small-dog-feeding-enrichment'],
    imageAlt: 'Papillon exploring a small teal food puzzle in a kitchen',
    href: '/resources/small-dog-feeding-enrichment',
    categories: ['guides', 'feeding', 'enrichment'],
  },
  {
    id: 'boredom-behaviours',
    slug: 'boredom-behaviours',
    status: 'coming_soon',
    sitemap: false,
    noindex: true,
    type: 'Guide',
    category: 'Enrichment',
    title: 'Boredom Behaviour Ideas',
    description: 'Support calmer routines with simple enrichment ideas.',
    time: '6 min read',
    image: 'resource-boredom-behaviour',
    imageSrc: resourceHubImages['resource-boredom-behaviour'],
    imageAlt: 'Calm dog using a teal and orange puzzle toy at home',
    href: '/resources',
    categories: ['guides', 'enrichment'],
  },
  {
    id: 'puppy-night-routine',
    slug: 'puppy-night-routine',
    status: 'coming_soon',
    sitemap: false,
    noindex: true,
    type: 'Checklist',
    category: 'Puppy',
    title: 'First Night With Your Puppy',
    description: 'A simple step-by-step plan for night one.',
    time: '3 min checklist',
    image: 'card-puppy-training',
    imageSrc: resourceHubImages['card-puppy-training'],
    imageAlt: 'Puppy sitting in a warm home training scene',
    href: '/resources',
    categories: ['checklists', 'puppy'],
  },
  {
    id: 'body-condition-check-in',
    slug: 'body-condition-check-in',
    status: 'coming_soon',
    sitemap: false,
    noindex: true,
    type: 'Guide',
    category: 'Feeding',
    title: 'Body Condition Check-In',
    description: 'A simple way to notice changes and keep feeding routines consistent.',
    time: '5 min read',
    image: 'resource-body-condition',
    imageSrc: resourceHubImages['resource-body-condition'],
    imageAlt: 'Relaxed dog standing in a clean home setting',
    href: '/resources',
    categories: ['guides', 'feeding'],
  },
]

function slugFromHref(href = '') {
  const match = href.match(/^\/resources\/([^/?#]+)/)
  return match?.[1] || ''
}

function withTrailingSlash(path = '/') {
  if (!path || path === '/') return '/'
  if (path.includes('?') || path.includes('#')) return path
  return path.endsWith('/') ? path : `${path}/`
}

function normaliseResource(resource) {
  const status = resource.status || (resource.comingSoon ? 'coming_soon' : 'published')
  const rawHref = resource.href || (resource.slug ? `/resources/${resource.slug}` : '/resources')
  const href = withTrailingSlash(rawHref)
  const slug = resource.slug || slugFromHref(href) || resource.id
  const isResourceDetail = href.startsWith('/resources/')
  const sitemap = resource.sitemap ?? (status === 'published' && isResourceDetail)
  const noindex = resource.noindex ?? status !== 'published'
  const imageAlt = resource.alt || resource.imageAlt || resource.title

  return {
    ...resource,
    slug,
    href,
    status,
    sitemap,
    noindex,
    imageAlt,
    alt: imageAlt,
    lastmod: resource.lastmod || DEFAULT_LASTMOD,
    featured: Boolean(resource.featured),
    comingSoon: status === 'coming_soon',
  }
}

export const resources = resourceEntries.map(normaliseResource)

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'feeding', label: 'Feeding' },
  { id: 'enrichment', label: 'Enrichment' },
  { id: 'puppy', label: 'Puppy' },
  { id: 'toy-safety', label: 'Toy Safety' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'checklists', label: 'Checklists' },
]

export function isPublishedResource(resource) {
  return resource?.status === 'published'
}

export function getPublishedResources() {
  return resources.filter(isPublishedResource)
}

export function getSitemapResources() {
  return getPublishedResources().filter(
    (resource) => resource.sitemap !== false && resource.href.startsWith('/resources/'),
  )
}

export function getResource(id) {
  return resources.find((resource) => resource.id === id || resource.slug === id)
}

export function getResourceBySlug(slug) {
  return resources.find((resource) => resource.slug === slug)
}

export function filterResources(category) {
  const published = getPublishedResources()
  if (!category || category === 'all') return published
  return published.filter((resource) => resource.categories?.includes(category))
}

export const featuredResources = getPublishedResources()
  .filter((resource) => resource.featured)
  .slice(0, 3)
