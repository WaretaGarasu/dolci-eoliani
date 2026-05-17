type SectionHeaderProps = {
  eyebrow?: string
  title: string
  lead?: string
  titleId?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  titleId,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <header className={`mb-12 max-w-2xl ${alignClass} ${className}`.trim()}>
      {eyebrow && (
        <span className="mb-4 block text-label-caps text-xs tracking-[0.2em] text-secondary">
          {eyebrow}
        </span>
      )}
      <h2
        id={titleId}
        className="font-display text-3xl tracking-tight text-primary md:text-[2.75rem] md:leading-tight"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 font-body text-lg font-light leading-relaxed text-on-surface-variant">
          {lead}
        </p>
      )}
    </header>
  )
}
