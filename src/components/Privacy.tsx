import { COPY, getPrivacySections } from '../data/copy'
import { SITE } from '../data/site'
import { Icon } from './Icon'
import { PageContainer } from './PageContainer'

export function Privacy() {
  const sections = getPrivacySections(SITE)

  return (
    <article className="py-16 md:py-24">
      <PageContainer>
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-4 font-display text-3xl tracking-tight text-primary md:text-4xl">
            {COPY.privacy.title}
          </h1>
          <p className="font-body text-base font-light leading-relaxed text-on-surface-variant">
            {COPY.privacy.intro}
          </p>
          <p className="mt-2 font-body text-sm text-on-surface-variant/80">{COPY.privacy.updated}</p>
        </header>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          <nav
            aria-label={COPY.privacy.tocLabel}
            className="md:sticky md:top-28 md:h-fit md:w-48 md:shrink-0"
          >
            <p className="mb-4 text-label-caps text-[11px] tracking-widest text-on-surface-variant">
              {COPY.privacy.tocLabel}
            </p>
            <ul className="flex flex-col gap-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="font-body text-sm text-on-surface-variant transition-colors hover:text-primary"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 max-w-3xl space-y-10">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mb-4 font-display text-xl tracking-tight text-primary">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="font-body text-base font-light leading-relaxed text-on-surface-variant"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="flex flex-col gap-4 border-t border-mandorla/20 pt-8 sm:flex-row sm:flex-wrap">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
              >
                {COPY.contact.whatsapp.label}
                <Icon name="chat" className="text-base" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="btn-secondary inline-flex justify-center"
              >
                {COPY.contact.email.open}
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </article>
  )
}
