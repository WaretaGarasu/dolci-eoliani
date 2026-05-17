import { COPY } from '../data/copy'
import { SITE } from '../data/site'
import { ContactChannels } from './ContactChannels'
import { ContactForm } from './ContactForm'
import { Icon } from './Icon'
import { SectionHeader } from './SectionHeader'
import { SectionShell } from './SectionShell'

export function Contact() {
  return (
    <SectionShell id="contatti" tone="muted" size="lg">
      <div className="flex flex-col items-center">
        <SectionHeader
          title={COPY.contact.title}
          lead={COPY.contact.intro}
          align="center"
          className="mb-12 max-w-3xl lg:mb-14"
        />

        <div className="mb-12 flex w-full max-w-lg flex-col items-center gap-3 text-center lg:mb-14">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex w-full justify-center px-10 py-4 text-base sm:w-auto"
          >
            {COPY.contact.whatsappCta}
            <Icon name="chat" className="text-lg" />
          </a>
          <p className="font-body text-sm font-light text-on-surface-variant">
            {COPY.contact.whatsappCtaHint}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 lg:items-stretch">
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <p className="text-center font-body text-sm font-medium tracking-wide text-on-surface-variant uppercase">
              {COPY.contact.channelsLabel}
            </p>
            <ContactChannels />
          </div>

          <div className="order-1 flex lg:order-2">
            <ContactForm className="h-full w-full" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
