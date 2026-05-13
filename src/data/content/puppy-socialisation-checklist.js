import { resourceHubImages } from '../imageAssets.js'

export default {
  id: 'puppy-socialisation-checklist',
  slug: 'puppy-socialisation-checklist',
  type: 'Checklist',
  category: 'Puppy',
  title: 'Puppy Socialisation Checklist',
  intro:
    'Use this simple checklist to help your puppy build positive associations with the everyday world — calmly, safely and at their own pace.',
  time: '5 min checklist',
  image: 'resource-puppy-checklist',
  imageSrc: resourceHubImages['resource-puppy-checklist'],
  imageAlt: 'Puppy in a calm training scene with a blank checklist',
  metaTitle: 'Puppy Socialisation Checklist — Pawzzles',
  metaDescription:
    'A practical, behaviour-led puppy socialisation checklist covering people, places, sounds, surfaces and handling for the first few months.',
  sections: [
    {
      heading: 'How to use this checklist',
      body: 'Aim for short, positive experiences rather than ticking every item in a single week. Watch your puppy for relaxed body language. If they look worried, give them more distance and try again another day at an easier level.',
    },
    {
      heading: 'People',
      body: 'Different appearances, ages and behaviours so your puppy learns the world is a varied but safe place.',
      list: [
        'People wearing hats, hoods and sunglasses',
        'People with beards or glasses',
        'Children playing calmly nearby',
        'Older adults moving slowly',
        'People with bikes, scooters or buggies',
        'Delivery drivers or people in uniform',
      ],
    },
    {
      heading: 'Sounds',
      body: 'Introduce sounds at a low volume first and reward calm reactions.',
      list: [
        'Doorbell and door knocks',
        'Vacuum cleaner from across the room',
        'Hairdryer at a distance',
        'Traffic from a quiet pavement',
        'Fireworks recordings (very low volume)',
        'Washing machine and dishwasher',
      ],
    },
    {
      heading: 'Surfaces and environments',
      body: 'Help your puppy feel confident on different textures and in new spaces.',
      list: [
        'Grass, gravel, concrete and wood',
        'Slippery floors (with care)',
        'Stairs (small, supervised)',
        'A quiet café outdoor area',
        'A friend’s house and garden',
        'A pet-friendly shop',
      ],
    },
    {
      heading: 'Handling',
      body: 'Gentle handling now helps grooming and everyday care feel easier later.',
      list: [
        'Touching paws and between toes',
        'Looking inside ears',
        'Lifting lips gently',
        'Light brushing',
        'Being picked up calmly',
        'Wearing a harness or collar',
      ],
    },
    {
      heading: 'After your sessions',
      body: 'Give your puppy a calm rest period after new experiences. Sleep and downtime are how puppies process what they’ve learned.',
    },
  ],
  cta: {
    title: 'Find enrichment ideas for your puppy',
    body: 'Try the Enrichment Finder for tailored, age-appropriate activities.',
    button: 'Open Enrichment Finder',
    href: '/calculators/enrichment-finder',
  },
  related: ['best-dog-enrichment-ideas', 'toy-safety-guide'],
}
