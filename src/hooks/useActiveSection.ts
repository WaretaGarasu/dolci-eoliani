import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home', elementId: 'hero' },
  { id: 'dolci', elementId: 'dolci' },
  { id: 'tradizione', elementId: 'tradizione' },
  { id: 'come-ordinare', elementId: 'come-ordinare' },
  { id: 'faq', elementId: 'faq' },
  { id: 'contatti', elementId: 'contatti' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const elements: { id: SectionId; el: HTMLElement }[] = []
    for (const s of SECTIONS) {
      const el = document.getElementById(s.elementId)
      if (el) elements.push({ id: s.id, el })
    }

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        if (visible.length > 0) {
          const target = visible[0].target as HTMLElement
          const match = elements.find((s) => s.el === target)
          if (match) setActive(match.id)
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    )

    elements.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
