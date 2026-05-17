import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const base = 'https://dolci-eoliani.it'

describe('public SEO files', () => {
  it('sitemap.xml lists public routes with lastmod', () => {
    const xml = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8')
    expect(xml).toContain(`<loc>${base}/</loc>`)
    expect(xml).toContain(`<loc>${base}/informativa-privacy</loc>`)
    expect(xml).toContain('<lastmod>')
  })

  it('robots.txt allows crawling and points to sitemap on same host', () => {
    const robots = readFileSync(resolve(process.cwd(), 'public/robots.txt'), 'utf8')
    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain(`Sitemap: ${base}/sitemap.xml`)
  })
})
