import { COPY } from './copy'
import { DEFAULT_PAGE_TITLE, pageTitle, PRIVACY_PATH, SITE } from './site'

const OG_IMAGE_PATH = '/og-image.jpg'

export type SeoKey = 'home' | 'privacy' | 'notFound'

export type SeoEntry = {
  /** Full document title, or omit to use pageTitle(pageName) */
  title?: string
  pageName?: string
  description: string
  path: string
  imagePath?: string
  noIndex?: boolean
}

export const SEO: Record<SeoKey, SeoEntry> = {
  home: {
    title: DEFAULT_PAGE_TITLE,
    description:
      'Dolci Eoliani: pasticceria artigianale delle Isole Eolie. Nacatole, Spicchiteddi, frutta martorana e specialità siciliane. Ordini e spedizioni in tutta Italia.',
    path: '/',
    imagePath: OG_IMAGE_PATH,
  },
  privacy: {
    pageName: COPY.privacy.title,
    description: COPY.privacy.intro,
    path: PRIVACY_PATH,
  },
  notFound: {
    pageName: COPY.notFound.title,
    description: COPY.notFound.body,
    path: '/404',
    noIndex: true,
  },
}

export function resolveSeoTitle(entry: SeoEntry): string {
  if (entry.title) return entry.title
  if (entry.pageName) return pageTitle(entry.pageName)
  return DEFAULT_PAGE_TITLE
}

export function absoluteUrl(path: string): string {
  const base = SITE.siteUrl.replace(/\/$/, '')
  if (path === '/' || path === '') return `${base}/`
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function absoluteImageUrl(imagePath: string): string {
  return absoluteUrl(imagePath)
}
