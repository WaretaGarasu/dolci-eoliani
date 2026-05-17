export const PRIVACY_PATH = '/informativa-privacy' as const

export const PAGE_TITLE_TAGLINE = "L'Arte della Pasticceria Eoliana"

export const DEFAULT_PAGE_TITLE = `Dolci Eoliani - ${PAGE_TITLE_TAGLINE}`

export function pageTitle(pageName: string): string {
  return `${pageName} - Dolci Eoliani`
}

export const SITE = {
  name: 'Dolci Eoliani',
  phone: '+39 333 837 4526',
  phoneRaw: '+393338374526',
  email: 'coluccioangela@gmail.com',
  whatsappUrl: 'https://wa.me/393338374526',
  facebookUrl: 'https://www.facebook.com/share/1DGxib5ysi/',
  developerUrl: 'https://github.com/WaretaGarasu',
  copyright: '© 2026 Dolci Eoliani.',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://dolci-eoliani.it',
  showDeveloperCredit: true,
} as const

export const NAV_LINKS = [
  { href: '#tradizione', label: 'Tradizione', id: 'tradizione' },
  { href: '#dolci', label: 'Dolci', id: 'dolci' },
  { href: '#come-ordinare', label: 'Ordina', id: 'come-ordinare' },
  { href: '#contatti', label: 'Contatti', id: 'contatti' },
] as const
