import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resourceContent } from '../src/data/content/index.js'
import { SITE } from '../src/data/site.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const staticRoutes = [
  '/',
  '/resources',
  '/about',
  '/calculators/dog-feeding-calculator',
  '/calculators/enrichment-finder',
]

const resourceRoutes = Object.keys(resourceContent).map((slug) => `/resources/${slug}`)
const routes = [...staticRoutes, ...resourceRoutes]

function toUrl(route) {
  return new URL(route, SITE.url).toString()
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${toUrl(route)}</loc>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await fs.writeFile(path.join(root, 'public', 'sitemap.xml'), xml)
console.log(`Generated public/sitemap.xml with ${routes.length} routes.`)
