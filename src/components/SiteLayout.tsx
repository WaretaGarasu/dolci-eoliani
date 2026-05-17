import type { ReactNode } from 'react'
import { COPY } from '../data/copy'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'

type SiteLayoutProps = {
  children: ReactNode
  activeSection?: string
  showScrollToTop?: boolean
}

export function SiteLayout({
  children,
  activeSection = '',
  showScrollToTop = true,
}: SiteLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:border focus:border-primary focus:bg-surface focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-primary"
      >
        {COPY.a11y.skipToContent}
      </a>
      <Navbar activeSection={activeSection} />
      <div className="flex w-full flex-1 flex-col">{children}</div>
      <Footer />
      {showScrollToTop && <ScrollToTop />}
    </div>
  )
}
