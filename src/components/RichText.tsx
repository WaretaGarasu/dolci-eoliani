import type { MouseEvent } from 'react'
import { useLocation } from 'react-router-dom'
import type { RichTextPart } from '../utils/richText'
import { scrollToSection } from '../utils/scroll'

type RichTextProps = {
  parts: readonly RichTextPart[]
  className?: string
}

export function RichText({ parts, className = '' }: RichTextProps) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const onHashLink = (href: string, e: MouseEvent) => {
    if (isHome && href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(href)
    }
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === 'text' ? (
          <span key={i}>{part.value}</span>
        ) : (
          <a
            key={i}
            href={part.href}
            onClick={(e) => onHashLink(part.href, e)}
            className="text-secondary underline-offset-4 hover:text-primary hover:underline"
          >
            {part.label}
          </a>
        ),
      )}
    </span>
  )
}
