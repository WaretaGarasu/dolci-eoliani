type NavLinkProps = {
  href: string
  label: string
  active: boolean
  onNavigate: (href: string) => void
  className?: string
}

export function NavLink({ href, label, active, onNavigate, className = '' }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onNavigate(href)
      }}
      className={`nav-link group relative px-1 py-1 font-body text-sm font-medium tracking-wide ${className} ${
        active ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-px w-full origin-center bg-mandorla transition-transform duration-250 motion-reduce:transition-none ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
        aria-hidden
      />
    </a>
  )
}
