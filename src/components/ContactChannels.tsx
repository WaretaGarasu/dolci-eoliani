import { COPY } from '../data/copy'
import { SITE } from '../data/site'
import { ContactChannelCard } from './ContactChannelCard'
import { Icon } from './Icon'

export function ContactChannels() {
  return (
    <div className="flex flex-col gap-4">
      <ContactChannelCard
        icon="chat"
        label={COPY.contact.whatsapp.label}
        hint={COPY.contact.whatsapp.hint}
        value={SITE.phone}
        href={SITE.whatsappUrl}
        copyValue={SITE.phoneRaw}
        linkExternal
      />

      <ContactChannelCard
        icon="mail"
        label={COPY.contact.email.label}
        hint={COPY.contact.email.hint}
        value={SITE.email}
        href={`mailto:${SITE.email}`}
        copyValue={SITE.email}
      />

      <a
        href={SITE.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-mandorla/35 bg-surface-container-low px-5 py-4 font-body text-base text-on-surface-variant transition-colors hover:border-mandorla-dark/40 hover:text-primary sm:px-6"
      >
        <span className="flex items-center gap-3">
          <Icon name="groups" className="text-xl text-secondary" aria-hidden />
          {COPY.contact.facebook}
        </span>
        <Icon name="open_in_new" className="text-lg opacity-50" aria-hidden />
      </a>
    </div>
  )
}
