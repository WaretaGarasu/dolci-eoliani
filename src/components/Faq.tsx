import { useState, type ReactNode } from 'react'
import { COPY } from '../data/copy'
import { Icon } from './Icon'
import { RichText } from './RichText'
import { SectionHeader } from './SectionHeader'
import { SectionShell } from './SectionShell'

function FaqPanel({
  isOpen,
  id,
  labelledBy,
  children,
}: {
  isOpen: boolean
  id: string
  labelledBy: string
  children: ReactNode
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!isOpen}
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="overflow-hidden">
        <div
          className={`px-6 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? 'pb-6 opacity-100' : 'pb-0 opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <SectionShell id="faq" tone="muted" size="md">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          title={COPY.faq.title}
          lead={COPY.faq.subtitle}
          align="center"
          className="mx-auto mb-10"
        />
        <div className="divide-y divide-mandorla/30 border border-mandorla/30 bg-surface">
          {COPY.faq.items.map((item) => {
            const isOpen = openId === item.id
            const buttonId = `faq-${item.id}-button`
            const panelId = `faq-${item.id}-panel`

            return (
              <div key={item.id}>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-container-low"
                >
                  <span className="pr-4 font-display text-lg tracking-tight text-primary">
                    {item.question}
                  </span>
                  <Icon
                    name="expand_more"
                    className={`shrink-0 text-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <FaqPanel isOpen={isOpen} id={panelId} labelledBy={buttonId}>
                  <p className="font-body text-base font-light leading-relaxed text-on-surface-variant">
                    <RichText parts={item.answer} />
                  </p>
                </FaqPanel>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
