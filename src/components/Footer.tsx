import type { MouseEvent } from 'react'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { COPY } from '../data/copy'
import { NAV_LINKS, PRIVACY_PATH, SITE } from '../data/site'
import { scrollToSection } from '../utils/scroll'
import { PageContainer } from './PageContainer'

const FOOTER_LINKS = NAV_LINKS.filter(
  (link) => link.id === 'dolci' || link.id === 'come-ordinare' || link.id === 'contatti',
)

const linkClass =
  'font-body text-sm text-on-surface-variant transition-colors hover:text-primary'

export function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const goToSection = (href: string, e: MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      scrollToSection(href)
    }
  }

  return (
    <footer className="mt-auto shrink-0 border-t border-mandorla/25 bg-surface">
      <PageContainer className="py-5 pb-[max(1rem,env(safe-area-inset-bottom))] md:py-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex flex-col gap-1.5">
            <Link
              to="/"
              className="font-display text-lg tracking-tight text-primary transition-opacity hover:opacity-75 md:text-xl"
            >
              {SITE.name}
            </Link>
            <span className="font-body text-xs font-light text-on-surface-variant/80">
              {SITE.copyright}
            </span>
          </div>

          <nav
            aria-label="Navigazione piè di pagina"
            className="flex flex-wrap items-center gap-x-1 gap-y-2 md:justify-end md:text-right"
          >
            {FOOTER_LINKS.map((link, index) => (
              <Fragment key={link.id}>
                {index > 0 && (
                  <span className="text-on-surface-variant/35 select-none" aria-hidden>
                    ·
                  </span>
                )}
                <Link
                  to={{ pathname: '/', hash: link.href }}
                  onClick={(e) => goToSection(link.href, e)}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              </Fragment>
            ))}
            <span className="text-on-surface-variant/35 select-none" aria-hidden>
              ·
            </span>
            <Link to={PRIVACY_PATH} className={linkClass}>
              {COPY.footer.privacy}
            </Link>
          </nav>
        </div>

        {SITE.showDeveloperCredit && (
          <p className="mt-6 border-t border-mandorla/20 pt-4 text-center font-body text-[11px] font-light leading-relaxed text-on-surface-variant/70">
            {COPY.footer.developerPrefix}{' '}
            <a
              href={SITE.developerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-on-surface-variant/85 transition-colors hover:text-primary"
            >
              {COPY.footer.developerName}
            </a>
          </p>
        )}
      </PageContainer>
    </footer>
  )
}
