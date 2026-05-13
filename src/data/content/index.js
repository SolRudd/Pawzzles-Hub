import puppyChecklist from './puppy-socialisation-checklist.js'
import enrichmentIdeas from './best-dog-enrichment-ideas.js'
import toySafety from './toy-safety-guide.js'
import slowFeederGuide from './slow-feeder-guide.js'
import mealtimeEnrichmentIdeas from './mealtime-enrichment-ideas.js'
import choosingSlowFeeder from './choosing-the-right-slow-feeder.js'

export const resourceContent = {
  'puppy-socialisation-checklist': puppyChecklist,
  'best-dog-enrichment-ideas': enrichmentIdeas,
  'toy-safety-guide': toySafety,
  'slow-feeder-guide': slowFeederGuide,
  'mealtime-enrichment-ideas': mealtimeEnrichmentIdeas,
  'choosing-the-right-slow-feeder': choosingSlowFeeder,
}

export function getResourceContent(slug) {
  return resourceContent[slug]
}
