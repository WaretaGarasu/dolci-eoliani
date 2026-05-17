import { COPY } from '../data/copy'
import { SectionHeader } from './SectionHeader'
import { SectionShell } from './SectionShell'

const orderingHeadingId = 'come-ordinare-heading'

export function Ordering() {
  return (
    <SectionShell
      id="come-ordinare"
      tone="band"
      size="md"
      aria-labelledby={orderingHeadingId}
    >
      <SectionHeader
        title={COPY.ordering.title}
        lead={COPY.ordering.subtitle}
        titleId={orderingHeadingId}
        align="center"
        className="mx-auto mb-14 max-w-3xl"
      />
      <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
        {COPY.ordering.steps.map((step, index) => (
          <li
            key={step.title}
            className="relative border border-mandorla/30 bg-surface px-6 py-8 md:px-8"
          >
            <span
              className="mb-5 flex h-10 w-10 items-center justify-center border border-mandorla-dark/50 bg-mandorla/30 font-display text-lg text-accent"
              aria-hidden
            >
              {index + 1}
            </span>
            <h3 className="mb-2 font-display text-xl tracking-tight text-primary">{step.title}</h3>
            <p className="font-body text-base font-light leading-relaxed text-on-surface-variant">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
