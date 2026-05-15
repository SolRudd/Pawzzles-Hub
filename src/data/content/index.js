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
import dogFoodFeedingLabels from './how-to-read-dog-food-feeding-labels.js'
import understandingDogFoodCalories from './understanding-dog-food-calories.js'
import dryWetRawDogFoodCalculator from './dry-wet-raw-dog-food-calculator.js'
import slowFeedersMealtimeRoutines from './slow-feeders-and-mealtime-routines.js'
import enrichmentForFastEaters from './enrichment-for-fast-eaters.js'
import calmerMealtimeRoutine from './calmer-mealtime-routine.js'
import enrichmentIdeasByPlayStyle from './enrichment-ideas-by-play-style.js'
import introducingNewDogToy from './introducing-a-new-dog-toy.js'
import smallDogFeedingEnrichment from './small-dog-feeding-enrichment.js'

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
  'how-to-read-dog-food-feeding-labels': dogFoodFeedingLabels,
  'understanding-dog-food-calories': understandingDogFoodCalories,
  'dry-wet-raw-dog-food-calculator': dryWetRawDogFoodCalculator,
  'slow-feeders-and-mealtime-routines': slowFeedersMealtimeRoutines,
  'enrichment-for-fast-eaters': enrichmentForFastEaters,
  'calmer-mealtime-routine': calmerMealtimeRoutine,
  'enrichment-ideas-by-play-style': enrichmentIdeasByPlayStyle,
  'introducing-a-new-dog-toy': introducingNewDogToy,
  'small-dog-feeding-enrichment': smallDogFeedingEnrichment,
}

export function getResourceContent(slug) {
  return resourceContent[slug]
}
