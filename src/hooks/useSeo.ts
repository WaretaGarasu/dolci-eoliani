import { useEffect } from 'react'
import { absoluteImageUrl, absoluteUrl, resolveSeoTitle, SEO, type SeoKey } from '../data/seo'

function upsertMeta(
  key: string,
  content: string,
  attribute: 'name' | 'property' = 'name',
): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string): void {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeLink(rel: string): void {
  document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)?.remove()
}

function applySeo(key: SeoKey): void {
  const entry = SEO[key]
  const title = resolveSeoTitle(entry)
  const canonical = entry.noIndex ? null : absoluteUrl(entry.path)
  const image = absoluteImageUrl(entry.imagePath ?? '/og-image.jpg')
  const robots = entry.noIndex ? 'noindex, nofollow' : 'index, follow'

  document.title = title
  upsertMeta('description', entry.description)
  upsertMeta('robots', robots)
  if (canonical) {
    upsertLink('canonical', canonical)
  } else {
    removeLink('canonical')
  }

  upsertMeta('og:type', 'website', 'property')
  upsertMeta('og:locale', 'it_IT', 'property')
  upsertMeta('og:title', title, 'property')
  upsertMeta('og:description', entry.description, 'property')
  if (canonical) {
    upsertMeta('og:url', canonical, 'property')
  }
  upsertMeta('og:image', image, 'property')
  upsertMeta('og:image:alt', 'Dolci tipici eoliani di Dolci Eoliani', 'property')

  upsertMeta('twitter:card', 'summary_large_image')
  upsertMeta('twitter:title', title)
  upsertMeta('twitter:description', entry.description)
  upsertMeta('twitter:image', image)
}

export function useSeo(key: SeoKey) {
  useEffect(() => {
    applySeo(key)
  }, [key])
}
