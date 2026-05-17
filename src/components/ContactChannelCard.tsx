import { CopyButton } from './CopyButton'
import { Icon } from './Icon'

type ContactChannelCardProps = {
  icon: 'chat' | 'mail'
  label: string
  hint?: string
  value: string
  href: string
  copyValue: string
  linkExternal?: boolean
}

export function ContactChannelCard({
  icon,
  label,
  hint,
  value,
  href,
  copyValue,
  linkExternal = false,
}: ContactChannelCardProps) {
  const linkProps = linkExternal
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-mandorla/30 bg-surface px-5 py-5 sm:px-6 sm:py-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mandorla/25">
          <Icon name={icon} className="text-xl text-secondary" aria-hidden />
        </span>
        <div>
          <p className="font-body text-base font-medium text-primary">{label}</p>
          {hint && (
            <p className="font-body text-sm font-light leading-snug text-on-surface-variant">{hint}</p>
          )}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1 rounded-full border border-mandorla/35 bg-surface-container-low py-1.5 pl-4 pr-1">
        <a
          href={href}
          {...linkProps}
          className={`min-w-0 flex-1 font-display tracking-tight text-primary transition-opacity hover:opacity-75 ${
            icon === 'mail' ? 'break-all text-sm leading-snug' : 'truncate text-base'
          }`}
        >
          {value}
        </a>
        <CopyButton value={copyValue} variant="icon" className="shrink-0" />
      </div>
    </article>
  )
}
