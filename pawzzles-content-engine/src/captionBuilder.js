function asPlatformList(platform) {
  return Array.isArray(platform) ? platform : [platform];
}

function getHashtags(post) {
  const base = [
    '#Pawzzles',
    '#DogEnrichment',
    '#DogToys',
    '#HappyDogs',
    '#BoredomBusters'
  ];

  const byTheme = {
    'natural toys': ['#NaturalDogToys', '#TreatPuzzle', '#CuriousPaws'],
    'QR code discovery': ['#ScanToShop', '#DogBusiness', '#ShopSmall'],
    'mental stimulation': ['#MentalStimulationForDogs', '#BrainGamesForDogs', '#SniffAndSolve'],
    'happier healthier dogs': ['#HealthyHappyDogs', '#DogRoutine', '#EnrichmentTime'],
    'dog enrichment': ['#EnrichmentForDogs', '#PuzzleToy', '#DogCareTips'],
    'boredom busting': ['#IndoorDogGames', '#RainyDayDogs', '#DogPlayIdeas'],
    'small dog-loving business messaging': ['#SmallBusinessUK', '#DogLovers', '#ShopSmall'],
    'thoughtful gifting for dog owners': ['#DogGiftIdeas', '#GiftsForDogLovers', '#DogMum']
  };

  return [...base, ...(byTheme[post.theme] || [])];
}

function sentenceForType(post) {
  const byType = {
    'launch post': `Say hello to Pawzzles: playful enrichment toys made for curious paws and calmer, happier moments at home.`,
    'product spotlight': `${post.headline} is all about turning treat time into a little sniff-and-solve adventure.`,
    'QR code promo': `A quick scan can lead you straight to playful enrichment ideas for your dog.`,
    'enrichment tip': `Try this when your dog needs something simple, satisfying and brain-friendly to do.`,
    'customer story': `Some dogs do not need louder play. They need a clever little challenge they can feel proud of solving.`,
    'offer / launch post': `Our launch treat is a small thank you for the first Pawzzles customers joining the pack.`,
    'educational post': `Enrichment gives your dog a job for their nose, brain and natural curiosity.`,
    'playful engagement post': `Every dog has a playtime personality. We want to know yours.`
  };

  return byType[post.postType] || post.supportingText;
}

function buildInstagramCaption(post) {
  const lines = [
    post.headline,
    '',
    sentenceForType(post),
    '',
    post.supportingText,
    '',
    `${post.cta}.`,
    '',
    getHashtags(post).join(' ')
  ];

  return lines.join('\n');
}

function buildFacebookCaption(post) {
  const lines = [
    `${post.headline}`,
    '',
    `${sentenceForType(post)} ${post.supportingText}`,
    '',
    `If your dog loves sniffing, searching or solving, this is your sign to add a little enrichment to their day.`,
    '',
    `${post.cta}.`
  ];

  return lines.join('\n');
}

function buildAltText(post) {
  const parts = [
    `Square Pawzzles social post with the headline "${post.headline}".`,
    `The design uses a cream background with teal and orange accents.`
  ];

  if (post.dogImage) {
    parts.push('A friendly French bulldog-style dog is included.');
  }

  if (post.productImage) {
    parts.push('A natural dog enrichment toy is shown.');
  }

  if (post.qrImage) {
    parts.push('A clear QR code is included for scanning.');
  }

  return parts.join(' ');
}

function buildReviewerNotes(post) {
  const notes = [
    'Check that the headline is readable at mobile feed size.',
    'Keep cream, teal and orange as the dominant palette.',
    'Make sure decorative paw and heart doodles support the layout without crowding it.'
  ];

  if (post.qrImage) {
    notes.push('Test the QR code before posting and keep enough white space around it.');
  }

  if (post.productImage) {
    notes.push('Confirm the product image looks natural, premium and true to the real item.');
  }

  return notes;
}

function buildCaptionSet(post) {
  const platforms = asPlatformList(post.platform);

  return {
    platforms,
    instagram: buildInstagramCaption(post),
    facebook: buildFacebookCaption(post),
    cta: post.cta,
    hashtags: getHashtags(post),
    altText: buildAltText(post),
    reviewerNotes: buildReviewerNotes(post)
  };
}

function buildCaptionMarkdown(post, captionSet) {
  return [
    `# ${post.id}: ${post.title}`,
    '',
    '## Platforms',
    captionSet.platforms.join(', '),
    '',
    '## Instagram Caption',
    captionSet.instagram,
    '',
    '## Facebook Caption',
    captionSet.facebook,
    '',
    '## CTA',
    captionSet.cta,
    '',
    '## Hashtag Set',
    captionSet.hashtags.join(' '),
    '',
    '## Suggested Alt Text',
    captionSet.altText,
    '',
    '## Designer / Reviewer Notes',
    captionSet.reviewerNotes.map((note) => `- ${note}`).join('\n')
  ].join('\n');
}

module.exports = {
  buildCaptionMarkdown,
  buildCaptionSet,
  getHashtags
};
