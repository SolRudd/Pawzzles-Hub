export const SITE = {
  name: 'Pawzzles Resource Hub',
  brandName: 'Pawzzles',
  url: 'https://pawzzles.co.uk',
  shopUrl: 'https://pawzzles.co.uk',
  privacyPolicyUrl: '/privacy-policy',
  defaultTitle: 'Pawzzles Resource Hub | Dog Enrichment, Feeding Tools & Practical Guides',
  defaultDescription:
    'Explore Pawzzles dog enrichment guides, feeding calculators, slow feeder advice and practical tools built for everyday dog care.',
  defaultOgImage: '/images/resource-hub/hero-resource-hub.jpg',
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return new URL(path, SITE.url).toString()
}
