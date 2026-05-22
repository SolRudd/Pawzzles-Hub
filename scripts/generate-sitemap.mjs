import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resourceContent } from '../src/data/content/index.js'
import { getSitemapResources } from '../src/data/resources.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const siteUrl = 'https://resources.pawzzles.co.uk'
const staticLastmod = '2026-05-15'

const staticRoutes = [
  { loc: '/', lastmod: staticLastmod },
  { loc: '/resources/', lastmod: staticLastmod },
  { loc: '/all-guides/', lastmod: staticLastmod },
  { loc: '/about/', lastmod: staticLastmod },
  { loc: '/calculators/dog-feeding-calculator/', lastmod: staticLastmod },
  { loc: '/calculators/enrichment-finder/', lastmod: staticLastmod },
]

const resourceRoutes = getSitemapResources()
  .filter((resource) => resourceContent[resource.slug])
  .map((resource) => ({
    loc: resource.href,
    lastmod: resource.lastmod,
  }))
const routes = [...staticRoutes, ...resourceRoutes]

function toUrl(route) {
  return new URL(route, siteUrl).toString()
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${toUrl(route.loc)}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>
`

await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml)
console.log(`Generated public/sitemap.xml with ${routes.length} routes.`)
