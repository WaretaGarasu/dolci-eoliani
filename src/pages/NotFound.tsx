import { Link } from 'react-router-dom'
import { COPY } from '../data/copy'
import { SITE } from '../data/site'
import { SiteLayout } from '../components/SiteLayout'
import { useSeo } from '../hooks/useSeo'

export function NotFound() {
  useSeo('notFound')

  return (
    <SiteLayout showScrollToTop={false}>
      <main
        id="main-content"
        className="flex min-h-[60vh] flex-col items-center justify-center bg-surface px-6 py-24 text-center"
      >
        <span className="mb-6 text-label-caps text-sm tracking-[0.3em] text-secondary">
          {COPY.notFound.eyebrow}
        </span>
        <h1 className="mb-6 font-display text-4xl tracking-tight text-primary md:text-5xl">
          {COPY.notFound.title}
        </h1>
        <p className="mb-12 max-w-md font-body text-lg font-light text-on-surface-variant">
          {COPY.notFound.body}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/" className="btn-secondary inline-flex justify-center">
            {COPY.notFound.home}
          </Link>
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex justify-center"
          >
            {COPY.notFound.whatsapp}
          </a>
        </div>
      </main>
    </SiteLayout>
  )
}
