function valueOrNone(value) {
  return value && String(value).trim() ? value : 'No asset specified';
}

function getLayoutDirection(post) {
  const hasDog = Boolean(post.dogImage);
  const hasProduct = Boolean(post.productImage);
  const hasQr = Boolean(post.qrImage);

  const commonDirection = [
    'Use a square 1080x1080 canvas.',
    'Keep the design clean, premium and uncluttered.',
    'Use a warm cream background with teal and orange accents.',
    'Use rounded abstract shapes to create gentle movement.',
    'Add small paw print and heart doodles as supporting details only.',
    'Make all text large enough to read on a phone.'
  ];

  const typeDirections = {
    'launch post': [
      'Create a welcoming launch composition.',
      'Place the headline in the upper third in a playful handwritten-style font.',
      'Place the product and dog as the main friendly focal point.',
      'Use the CTA as a small rounded label near the lower edge.'
    ],
    'product spotlight': [
      'Make the product the hero of the layout.',
      'Use one large product area with subtle shadow and a rounded teal or peach backing shape.',
      'Place the headline to one side and the supporting text beneath it.',
      'Use natural texture and soft highlights so the toy feels tactile and premium.'
    ],
    'QR code promo': [
      'Create a clear scan-focused layout.',
      'Place the QR code in a clean white rounded square with enough quiet space around it.',
      'Put the headline above or beside the QR code.',
      'Use the dog or toy as a playful secondary character pointing attention toward the QR code.'
    ],
    'enrichment tip': [
      'Create a tip-card style layout with one clear idea.',
      'Use the headline as the main text moment.',
      'Add a simple visual cue for sniffing, searching or solving.',
      'Use doodle arrows or tiny sparkles sparingly to guide the eye.'
    ],
    'customer story': [
      'Create a warm story-led layout.',
      'Feature the dog image prominently and make the design feel personal.',
      'Use a small quote-style text area for the supporting text.',
      'Keep the CTA calm and helpful rather than sales-heavy.'
    ],
    'offer / launch post': [
      'Create a friendly offer layout without making it feel discount-heavy.',
      'Use orange as a small highlight for the offer moment.',
      'Place the dog and product in a celebratory but tidy composition.',
      'If a QR code is present, keep it clearly separated from decorative elements.'
    ],
    'educational post': [
      'Create a simple educational layout with a clear hierarchy.',
      'Use the headline as the key takeaway.',
      'Support it with one calm product or dog visual.',
      'Use small doodles to make the learning feel friendly, not clinical.'
    ],
    'playful engagement post': [
      'Create a question-led layout that invites comments.',
      'Use playful choice bubbles or rounded mini labels.',
      'Keep the headline dominant and expressive.',
      'Make the dog feel curious and involved in the question.'
    ]
  };

  const assetDirection = [];

  if (hasDog) {
    assetDirection.push(`Reference the dog asset at ${post.dogImage}; if generating from scratch, use a friendly cream or fawn French bulldog-style dog with expressive eyes.`);
  }

  if (hasProduct) {
    assetDirection.push(`Reference the product asset at ${post.productImage}; show a natural dog enrichment toy with a premium, tactile feel.`);
  }

  if (hasQr) {
    assetDirection.push(`Reference the QR asset at ${post.qrImage}; keep it crisp, flat, high contrast and scannable.`);
  }

  if (!hasDog && !hasProduct && !hasQr) {
    assetDirection.push('Use simple enrichment-themed illustrations rather than adding unnecessary objects.');
  }

  return [
    ...commonDirection,
    ...(typeDirections[post.postType] || []),
    ...assetDirection
  ].join('\n');
}

function getVisualElements(post) {
  const elements = [
    'Cream or soft ivory background',
    'Teal and orange rounded accent shapes',
    'Small paw print doodles',
    'Small heart doodles',
    'Tiny sparkle marks',
    'Playful handwritten-style heading',
    'Clean sans-serif supporting text'
  ];

  if (post.dogImage) {
    elements.push('Friendly French bulldog-style dog visual');
  }

  if (post.productImage) {
    elements.push('Natural dog enrichment toy or product visual');
  }

  if (post.qrImage) {
    elements.push('Crisp QR code in a white rounded square');
  }

  return elements;
}

function getAssetNotes(post) {
  return [
    `Dog image notes: ${post.dogImage ? `Reference ${post.dogImage}; if generating from scratch, use a friendly cream or fawn French bulldog-style dog with expressive eyes.` : 'No dog image required for this post.'}`,
    `Product image notes: ${post.productImage ? `Reference ${post.productImage}; show a natural enrichment toy with a premium, tactile feel.` : 'No product image required for this post.'}`,
    `QR image notes: ${post.qrImage ? `Reference ${post.qrImage}; keep the QR code flat, crisp, high contrast and scannable.` : 'No QR code required for this post.'}`
  ];
}

function buildImagePrompt(post, brandRules) {
  const layoutDirection = getLayoutDirection(post);

  return [
    `# Pawzzles Image Prompt: ${post.id} ${post.title}`,
    '',
    '## Image Size',
    'Create an exact square social post at 1080x1080 pixels.',
    '',
    '## Post Type',
    post.postType,
    '',
    '## Layout Direction',
    layoutDirection,
    '',
    '## Image Text',
    `Headline text: "${post.headline}"`,
    `Supporting text: "${post.supportingText}"`,
    `CTA text: "${post.cta}"`,
    '',
    '## Colour Palette',
    '- Warm cream: #FFF4E5',
    '- Soft ivory: #FFFBF4',
    '- Teal blue: #0F9CA8',
    '- Deep teal: #08737E',
    '- Pawzzles orange: #F47A3D',
    '- Soft peach: #FFD6BF',
    '- Warm charcoal text: #2F2A27',
    '- Gentle sage accent: #BFD8C2',
    '',
    '## Visual Elements',
    getVisualElements(post).map((element) => `- ${element}`).join('\n'),
    '',
    '## Dog / Product / QR Image Notes',
    getAssetNotes(post).map((note) => `- ${note}`).join('\n'),
    '',
    '## Brand Rules Reference',
    brandRules,
    '',
    '## Negative Instructions',
    '- Avoid clutter.',
    '- Avoid unreadable text.',
    '- Avoid off-brand colours.',
    '- Avoid generic pet shop styling.',
    '- Avoid dark backgrounds, hard corners, harsh sales graphics, guilt-based copy and overfilled layouts.'
  ].join('\n');
}

module.exports = {
  buildImagePrompt,
  getLayoutDirection
};
