import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { calculators } from '../src/data/calculators.js'
import { resourceContent } from '../src/data/content/index.js'
import { getGuideGroups } from '../src/data/guideGroups.js'
import {
  categories,
  getPublishedResources,
  getResource,
  isPublishedResource,
} from '../src/data/resources.js'
import { SITE, absoluteUrl } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const baseHtmlPath = path.join(distDir, 'index.html')
const baseHtml = await fs.readFile(baseHtmlPath, 'utf8')
const publishedResources = getPublishedResources()
const guideGroups = getGuideGroups()

const calculatorSeo = {
  'dog-feeding-calculator': {
    title: 'Dog Feeding Calculator | Pawzzles Practical Feeding Tool',
    description:
      'Use the Pawzzles dog feeding calculator as a practical starting point for daily portions, calories and mealtime planning.',
  },
  'enrichment-finder': {
    title: 'Dog Enrichment Finder | Pawzzles Practical Tool',
    description:
      'Use the Pawzzles Enrichment Finder to choose dog-friendly enrichment ideas by life stage, energy, goal and play style.',
  },
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttr(value = '') {
  return escapeHtml(value)
}

function schemaScript(item) {
  return `<script type="application/ld+json">${JSON.stringify(item).replaceAll('<', '\\u003c')}</script>`
}

function renderMeta({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = SITE.defaultOgImage,
  structuredData = [],
}) {
  const canonicalUrl = absoluteUrl(canonical)
  const imageUrl = ogImage ? absoluteUrl(ogImage) : ''
  const schemas = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : structuredData
      ? [structuredData]
      : []

  return [
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`,
    '<meta name="robots" content="index,follow" />',
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:type" content="${escapeAttr(ogType)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`,
    imageUrl ? `<meta property="og:image" content="${escapeAttr(imageUrl)}" />` : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    imageUrl ? `<meta name="twitter:image" content="${escapeAttr(imageUrl)}" />` : '',
    ...schemas.map(schemaScript),
  ]
    .filter(Boolean)
    .join('\n    ')
}

function pageShell({ title, description, canonical, ogType, ogImage, structuredData, body }) {
  const meta = renderMeta({
    title,
    description,
    canonical,
    ogType,
    ogImage,
    structuredData,
  })

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, meta)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

function staticHeader() {
  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a href="/" aria-label="Pawzzles Resource Hub home">
          <img src="/pawzzles-logo.svg" alt="Pawzzles" style="height:48px;width:auto" />
        </a>
        <nav class="site-header__nav" aria-label="Primary">
          <a href="/resources/">Resources</a>
          <a href="/all-guides/">All Guides</a>
          <a href="/calculators/dog-feeding-calculator/">Feeding Calculator</a>
          <a href="/calculators/enrichment-finder/">Enrichment Finder</a>
          <a href="/about/">About</a>
          <a href="${escapeAttr(SITE.shopUrl)}">Visit Shop</a>
        </nav>
      </div>
    </header>`
}

function staticFooter() {
  return `
    <footer class="bg-teal-deep text-white">
      <nav aria-label="Footer" class="max-w-7xl mx-auto container-px py-12">
        <a href="/resources/">Resources</a>
        <a href="/all-guides/">All Guides</a>
        <a href="/calculators/dog-feeding-calculator/">Feeding Calculator</a>
        <a href="/calculators/enrichment-finder/">Enrichment Finder</a>
        <a href="${escapeAttr(SITE.shopUrl)}">Pawzzles Shop</a>
      </nav>
    </footer>`
}

function layout(main) {
  return `${staticHeader()}<main>${main}</main>${staticFooter()}`
}

function resourceList(resources = publishedResources) {
  return `<ul>
    ${resources
      .map(
        (resource) => `<li>
          <a href="${escapeAttr(resource.href)}">${escapeHtml(resource.title)}</a>
          <p>${escapeHtml(resource.description)}</p>
        </li>`,
      )
      .join('\n')}
  </ul>`
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.brandName,
    url: SITE.shopUrl,
    logo: absoluteUrl('/pawzzles-logo.svg'),
  }
}

function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/resources/')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

function homePage() {
  const body = layout(`
    <section class="container-px">
      <h1>Pawzzles Resource Hub</h1>
      <p>${escapeHtml(SITE.defaultDescription)}</p>
      <p>Explore practical Pawzzles dog enrichment guides, slow feeder advice, puppy checklists and feeding tools.</p>
      <p><a href="/resources/">Browse resources</a> <a href="/all-guides/">View all guides</a></p>
    </section>
    <section class="container-px">
      <h2>Popular guides and tools</h2>
      ${resourceList(publishedResources)}
    </section>`)

  return pageShell({
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    canonical: '/',
    structuredData: [websiteSchema(), organisationSchema()],
    body,
  })
}

function resourcesPage() {
  const body = layout(`
    <section class="container-px">
      <h1>Browse the Pawzzles Resource Hub</h1>
      <p>Practical calculators, easy-to-follow dog enrichment guides, slow feeder advice and helpful checklists.</p>
      <nav aria-label="Resource topics">
        ${categories
          .filter((category) => category.id !== 'all')
          .map(
            (category) =>
              `<a href="/resources/?category=${escapeAttr(category.id)}">${escapeHtml(category.label)}</a>`,
          )
          .join(' ')}
        <a href="/all-guides/">All Guides</a>
      </nav>
    </section>
    <section class="container-px">
      <h2>All live resources</h2>
      ${resourceList(publishedResources)}
    </section>`)

  return pageShell({
    title: 'Dog Enrichment, Feeding & Puppy Resources | Pawzzles Resource Hub',
    description:
      'Browse Pawzzles dog-friendly guides, feeding tools, slow feeder advice, enrichment ideas and practical checklists built for everyday dog care.',
    canonical: '/resources/',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Pawzzles Resource Hub',
        url: absoluteUrl('/resources/'),
        description:
          'Pawzzles practical calculators, dog-friendly guides and checklists for enrichment, feeding and everyday routines.',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE.name,
          url: SITE.url,
        },
      },
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources/' },
      ]),
    ],
    body,
  })
}

function allGuidesPage() {
  const body = layout(`
    <section class="container-px">
      <h1>All Pawzzles dog guides</h1>
      <p>A simple crawler-friendly index of every live guide in the Pawzzles Resource Hub, grouped by topic.</p>
    </section>
    <section class="container-px">
      ${guideGroups
        .map(
          (group) => `<section>
            <h2>${escapeHtml(group.title)}</h2>
            <p>${escapeHtml(group.description)}</p>
            ${resourceList(group.resources)}
          </section>`,
        )
        .join('\n')}
    </section>`)

  return pageShell({
    title: 'All Dog Guides | Pawzzles Resource Hub',
    description:
      'Browse every live Pawzzles guide for dog enrichment, slow feeders, puzzle toys, puppy enrichment, boredom-busting and feeding routines.',
    canonical: '/all-guides/',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'All Pawzzles Dog Guides',
        url: absoluteUrl('/all-guides/'),
        description:
          'A crawler-friendly index of Pawzzles dog enrichment, slow feeder, puppy and feeding guides.',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE.name,
          url: SITE.url,
        },
      },
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'All Guides', url: '/all-guides/' },
      ]),
    ],
    body,
  })
}

function articlePage(resource, content) {
  const related = (content.related || [])
    .map((id) => getResource(id))
    .filter(isPublishedResource)

  const body = layout(`
    <article class="container-px">
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/resources/">Resources</a> / <span>${escapeHtml(content.title)}</span>
      </nav>
      <h1>${escapeHtml(content.title)}</h1>
      <p>${escapeHtml(content.intro)}</p>
      ${
        content.imageSrc
          ? `<img src="${escapeAttr(content.imageSrc)}" alt="${escapeAttr(content.imageAlt || content.title)}" />`
          : ''
      }
      ${content.sections
        .map(
          (section) => `<section>
            <h2>${escapeHtml(section.heading)}</h2>
            ${section.body ? `<p>${escapeHtml(section.body)}</p>` : ''}
            ${
              section.list
                ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
                : ''
            }
          </section>`,
        )
        .join('\n')}
      <section>
        <h2>Related Pawzzles guides</h2>
        ${related.length ? resourceList(related) : '<p><a href="/all-guides/">Browse all Pawzzles guides</a></p>'}
      </section>
      <section>
        <h2>Explore Pawzzles</h2>
        <p><a href="${escapeAttr(SITE.shopUrl)}">Visit the Pawzzles shop</a> for enrichment toys and dog-friendly play ideas.</p>
      </section>
    </article>`)

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: content.title,
      description: content.metaDescription || content.intro,
      image: content.imageSrc ? absoluteUrl(content.imageSrc) : undefined,
      mainEntityOfPage: absoluteUrl(resource.href),
      dateModified: resource.lastmod,
      author: {
        '@type': 'Organization',
        name: SITE.brandName,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE.brandName,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/pawzzles-logo.svg'),
        },
      },
    },
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Resources', url: '/resources/' },
      { name: content.title, url: resource.href },
    ]),
  ]

  return pageShell({
    title: content.metaTitle || `${content.title} | Pawzzles`,
    description: content.metaDescription || content.intro,
    canonical: resource.href,
    ogType: 'article',
    ogImage: content.imageSrc || SITE.defaultOgImage,
    structuredData: schema,
    body,
  })
}

function calculatorPage(calculator) {
  const seo = calculatorSeo[calculator.id] || {
    title: `${calculator.title} | Pawzzles Resource Hub`,
    description: calculator.description,
  }
  const body = layout(`
    <section class="container-px">
      <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/resources/">Resources</a> / <span>${escapeHtml(calculator.title)}</span></nav>
      <h1>${escapeHtml(calculator.title)}</h1>
      <p>${escapeHtml(calculator.description)}</p>
      <ul>${calculator.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>
      <p><a href="/resources/">Browse more Pawzzles resources</a></p>
    </section>`)

  return pageShell({
    title: seo.title,
    description: seo.description,
    canonical: calculator.href,
    ogImage: calculator.imageSrc,
    structuredData: [
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources/' },
        { name: calculator.title, url: calculator.href },
      ]),
    ],
    body,
  })
}

function aboutPage() {
  const body = layout(`
    <section class="container-px">
      <h1>About Pawzzles Resource Hub</h1>
      <p>Pawzzles creates practical dog enrichment, feeding and play resources for everyday dog care.</p>
      <p>Use the hub to explore enrichment guides, slow feeder advice, puppy resources and feeding tools.</p>
      <p><a href="/all-guides/">Browse all guides</a> <a href="${escapeAttr(SITE.shopUrl)}">Visit the Pawzzles shop</a></p>
    </section>`)

  return pageShell({
    title: 'About Pawzzles | Dog Enrichment, Mealtime Routines and Practical Tools',
    description:
      'Meet Pawzzles, a playful dog enrichment and mealtime brand with practical tools, guides and routines built for real dog owners.',
    canonical: '/about/',
    structuredData: [
      organisationSchema(),
      breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about/' },
      ]),
    ],
    body,
  })
}

async function writeRoute(routePath, html) {
  const target =
    routePath === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, routePath.replace(/^\/|\/$/g, ''), 'index.html')

  await fs.mkdir(path.dirname(target), { recursive: true })
  await fs.writeFile(target, html, 'utf8')
  console.log(`Prerendered ${routePath}`)
}

await writeRoute('/', homePage())
await writeRoute('/resources/', resourcesPage())
await writeRoute('/all-guides/', allGuidesPage())
await writeRoute('/about/', aboutPage())

for (const calculator of calculators) {
  await writeRoute(calculator.href, calculatorPage(calculator))
}

for (const resource of publishedResources) {
  const content = resourceContent[resource.slug]

  if (!content || !resource.href.startsWith('/resources/')) continue

  await writeRoute(resource.href, articlePage(resource, content))
}
