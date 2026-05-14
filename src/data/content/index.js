import puppyChecklist from './puppy-socialisation-checklist.js'
import enrichmentIdeas from './best-dog-enrichment-ideas.js'
import toySafety from './toy-safety-guide.js'
import slowFeederGuide from './slow-feeder-guide.js'
import mealtimeEnrichmentIdeas from './mealtime-enrichment-ideas.js'
import choosingSlowFeeder from './choosing-the-right-slow-feeder.js'
import indoorEnrichmentIdeas from './indoor-enrichment-ideas.js'
import puppyEnrichmentBasics from './puppy-enrichment-basics.js'
import smallDogEnrichmentIdeas from './small-dog-enrichment-ideas.js'
import enrichmentToysByPlayStyle from './choosing-enrichment-toys-by-play-style.js'

export const resourceContent = {
  'puppy-socialisation-checklist': puppyChecklist,
  'best-dog-enrichment-ideas': enrichmentIdeas,
  'toy-safety-guide': toySafety,
  'slow-feeder-guide': slowFeederGuide,
  'mealtime-enrichment-ideas': mealtimeEnrichmentIdeas,
  'choosing-the-right-slow-feeder': choosingSlowFeeder,
  'indoor-enrichment-ideas': indoorEnrichmentIdeas,
  'puppy-enrichment-basics': puppyEnrichmentBasics,
  'small-dog-enrichment-ideas': smallDogEnrichmentIdeas,
  'choosing-enrichment-toys-by-play-style': enrichmentToysByPlayStyle,
}

export function getResourceContent(slug) {
  return resourceContent[slug]
}
