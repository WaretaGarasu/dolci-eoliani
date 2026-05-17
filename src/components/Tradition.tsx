import { COPY } from '../data/copy'
import { SectionHeader } from './SectionHeader'
import { SectionShell } from './SectionShell'

export function Tradition() {
  return (
    <SectionShell id="tradizione" tone="muted" size="md">
      <SectionHeader
        eyebrow={COPY.tradition.label}
        title={COPY.tradition.title}
        lead={COPY.tradition.body}
        align="center"
        className="mx-auto mb-0 max-w-3xl"
      />
    </SectionShell>
  )
}
