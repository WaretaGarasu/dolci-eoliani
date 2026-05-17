import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PrivacyJsonLd } from '../components/JsonLd'
import { Privacy } from '../components/Privacy'
import { SiteLayout } from '../components/SiteLayout'
import { COPY } from '../data/copy'
import { SITE } from '../data/site'
import { PageContainer } from '../components/PageContainer'
import { useSeo } from '../hooks/useSeo'

export function PrivacyPage() {
  useSeo('privacy')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <SiteLayout>
      <PrivacyJsonLd />
      <main id="main-content" className="min-h-[60vh] bg-surface-container-low">
        <div className="border-b border-mandorla/30 bg-surface py-6">
          <PageContainer className="flex items-center justify-center gap-2 font-body text-sm text-on-surface-variant">
            <Link to="/" className="transition-colors hover:text-primary">
              {SITE.name}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">{COPY.privacy.title}</span>
          </PageContainer>
        </div>
        <Privacy />
      </main>
    </SiteLayout>
  )
}
