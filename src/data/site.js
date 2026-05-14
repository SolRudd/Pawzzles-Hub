export const SITE = {
  name: 'Pawzzles Resource Hub',
  brandName: 'Pawzzles',
  url: 'https://resources.pawzzles.co.uk',
  shopUrl: 'https://pawzzles.co.uk',
  privacyPolicyUrl: 'https://pawzzles.co.uk/privacy-policy',
  defaultTitle:
    'Pawzzles Resource Hub | Dog Enrichment, Feeding Tools and Practical Guides',
  defaultDescription:
    'Practical Pawzzles dog enrichment guides, feeding calculators, slow feeder advice and dog-friendly tools built for everyday dog care.',
  defaultOgImage: '/images/resource-hub/hero-resource-hub.jpg',
  gtmContainerId: 'GTM-TBF7XNZ2',
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return new URL(path, SITE.url).toString()
}
