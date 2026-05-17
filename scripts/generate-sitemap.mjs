/**
 * Writes public/sitemap.xml and public/robots.txt from VITE_SITE_URL (or production default).
 * Run before build: npm run sitemap
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const baseUrl = (process.env.VITE_SITE_URL ?? 'https://dolci-eoliani.it').replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

/** @type {{ path: string; changefreq: string; priority: string }[]} */
const routes = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/informativa-privacy', changefreq: 'yearly', priority: '0.5' },
]

const urls = routes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const sitemapOut = resolve(process.cwd(), 'public', 'sitemap.xml')
writeFileSync(sitemapOut, xml, 'utf8')
console.log(`Wrote ${sitemapOut} (${routes.length} URLs, lastmod ${lastmod}, base ${baseUrl})`)

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# SPA routes: / and /informativa-privacy (see sitemap.xml)
Sitemap: ${baseUrl}/sitemap.xml
`

const robotsOut = resolve(process.cwd(), 'public', 'robots.txt')
writeFileSync(robotsOut, robots, 'utf8')
console.log(`Wrote ${robotsOut} (Sitemap: ${baseUrl}/sitemap.xml)`)
