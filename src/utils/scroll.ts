export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(href: string): void {
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

  if (href === '#' || href === '') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior, block: 'start' })
  }
}
