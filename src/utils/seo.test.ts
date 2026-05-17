import { describe, expect, it } from 'vitest'
import { absoluteUrl, resolveSeoTitle, SEO } from '../data/seo'
import { DEFAULT_PAGE_TITLE, pageTitle } from '../data/site'

describe('seo helpers', () => {
  it('builds absolute URLs', () => {
    expect(absoluteUrl('/')).toMatch(/\/$/)
    expect(absoluteUrl('/informativa-privacy')).toContain('/informativa-privacy')
  })

  it('resolves home title', () => {
    expect(resolveSeoTitle(SEO.home)).toBe(DEFAULT_PAGE_TITLE)
  })

  it('resolves page titles', () => {
    expect(pageTitle('Test')).toBe('Test - Dolci Eoliani')
  })
})
