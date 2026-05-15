const siteUrl =
  typeof __PAWZZLES_SITE_URL__ !== 'undefined'
    ? __PAWZZLES_SITE_URL__
    : 'https://resources.pawzzles.co.uk'

const shopUrl =
  typeof __PAWZZLES_SHOP_URL__ !== 'undefined'
    ? __PAWZZLES_SHOP_URL__
    : 'https://pawzzles.co.uk'

const privacyPolicyUrl =
  typeof __PAWZZLES_PRIVACY_URL__ !== 'undefined'
    ? __PAWZZLES_PRIVACY_URL__
    : 'https://pawzzles.co.uk/privacy-policy'

const termsUrl =
  typeof __PAWZZLES_TERMS_URL__ !== 'undefined'
    ? __PAWZZLES_TERMS_URL__
    : 'https://pawzzles.co.uk/terms-and-conditions'

const gtmContainerId =
  typeof __PAWZZLES_GTM_CONTAINER_ID__ !== 'undefined'
    ? __PAWZZLES_GTM_CONTAINER_ID__
    : 'GTM-TBF7XNZ2'

export const SITE = {
  name: 'Pawzzles Resource Hub',
  brandName: 'Pawzzles',
  url: siteUrl,
  shopUrl,
  privacyPolicyUrl,
  termsUrl,
  defaultTitle:
    'Pawzzles Resource Hub | Dog Enrichment, Feeding Tools and Practical Guides',
  defaultDescription:
    'Practical Pawzzles dog enrichment guides, feeding calculators, slow feeder advice and dog-friendly tools built for everyday dog care.',
  defaultOgImage: '/images/resource-hub/hero-resource-hub.jpg',
  gtmContainerId,
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return new URL(path, SITE.url).toString()
}
