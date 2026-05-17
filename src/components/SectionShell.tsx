import type { ReactNode } from 'react'
import { PageContainer } from './PageContainer'

type SectionTone = 'default' | 'muted' | 'band'

const toneClasses: Record<SectionTone, string> = {
  default: 'bg-surface',
  muted: 'bg-surface-container-low',
  band: 'border-y border-mandorla/25 bg-surface',
}

type SectionShellProps = {
  id?: string
  tone?: SectionTone
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: ReactNode
  'aria-labelledby'?: string
}

const sizeClasses = {
  sm: 'section-y-sm',
  md: 'section-y-md',
  lg: 'section-y-lg',
} as const

export function SectionShell({
  id,
  tone = 'default',
  size = 'md',
  className = '',
  children,
  'aria-labelledby': ariaLabelledby,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`${toneClasses[tone]} ${sizeClasses[size]} ${className}`.trim()}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  )
}
