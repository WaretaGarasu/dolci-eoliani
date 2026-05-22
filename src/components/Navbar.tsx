import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { COPY } from '../data/copy'
import { NAV_LINKS, SITE } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'
import { scrollToSection } from '../utils/scroll'
import { Icon } from './Icon'
import { NavLink } from './NavLink'
import { PageContainer } from './PageContainer'

type NavbarProps = {
  activeSection?: string
}

export function Navbar({ activeSection = '' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const scrolled = useScrolled(40)
  const panelId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeight = () => setNavHeight(header.offsetHeight)

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)
    window.addEventListener('resize', updateHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const { style: bodyStyle } = document.body
    const { style: htmlStyle } = document.documentElement

    bodyStyle.overflow = 'hidden'
    bodyStyle.position = 'fixed'
    bodyStyle.top = `-${scrollY}px`
    bodyStyle.left = '0'
    bodyStyle.right = '0'
    bodyStyle.width = '100%'
    htmlStyle.overflow = 'hidden'

    return () => {
      bodyStyle.overflow = ''
      bodyStyle.position = ''
      bodyStyle.top = ''
      bodyStyle.left = ''
      bodyStyle.right = ''
      bodyStyle.width = ''
      htmlStyle.overflow = ''
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLElement>('a, button')
      first?.focus()
    }
  }, [menuOpen])

  const navigateToSection = (href: string) => {
    closeMenu()
    if (isHome) {
      scrollToSection(href)
      return
    }
    if (href === '#' || href === '') {
      navigate('/')
      return
    }
    navigate({ pathname: '/', hash: href })
  }

  return (
    <>
    <nav
      aria-label="Navigazione principale"
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 motion-reduce:transition-none ${
        scrolled
          ? 'border-mandorla/40 bg-surface/95'
          : 'border-mandorla/25 bg-surface/80'
      }`}
    >
      <PageContainer
        ref={headerRef}
        className={`relative z-52 flex items-center justify-between py-4 ${menuOpen ? 'bg-surface' : ''}`}
      >
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              navigateToSection('#')
            }
          }}
          className="font-display text-2xl tracking-tight text-primary transition-opacity duration-300 hover:opacity-75 md:text-[28px]"
        >
          {SITE.name}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.id}
              href={link.href}
              label={link.label}
              active={isHome && activeSection === link.id}
              onNavigate={navigateToSection}
            />
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => navigateToSection('#come-ordinare')}
            className="btn-primary"
          >
            {COPY.nav.orderCta}
          </button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="text-primary lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? COPY.a11y.closeMenu : COPY.a11y.openMenu}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} className="text-3xl" />
        </button>
      </PageContainer>

      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 z-51 bg-nero-carbone/40 backdrop-blur-md motion-reduce:backdrop-blur-none lg:hidden"
            style={{ top: navHeight }}
            onClick={closeMenu}
            aria-label={COPY.a11y.closeMenu}
          />
          <div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={COPY.a11y.openMenu}
            className="fixed inset-x-0 z-52 border-t border-mandorla/30 bg-surface shadow-lg lg:hidden"
            style={{ top: navHeight }}
          >
            <PageContainer className="flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    navigateToSection(link.href)
                  }}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={`py-2.5 font-body text-sm font-medium tracking-wide motion-safe:animate-[fadeIn_0.28s_ease-out_both] ${
                    isHome && activeSection === link.id ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => navigateToSection('#come-ordinare')}
                className="btn-primary mt-4 w-full"
              >
                {COPY.nav.orderCta}
              </button>
            </PageContainer>
          </div>
        </>
      )}
    </nav>
    <div aria-hidden="true" style={{ height: navHeight }} className="shrink-0" />
    </>
  )
}
