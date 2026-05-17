import { COPY } from '../data/copy'
import { scrollToSection } from '../utils/scroll'
import { PageContainer } from './PageContainer'

export function Hero() {
  return (
    <header
      id="hero"
      className="relative w-full overflow-hidden border-b border-mandorla/25 bg-surface section-y-lg grain-overlay"
    >
      <PageContainer className="flex flex-col items-center text-center">
        <span className="mb-8 block text-label-caps text-xs tracking-[0.25em] text-secondary">
          {COPY.hero.eyebrow}
        </span>
        <h1 className="mb-8 max-w-4xl font-display text-[40px] leading-[1.12] font-bold tracking-tight text-primary md:text-[56px] md:leading-[1.08] lg:text-[64px]">
          {COPY.hero.titleLine1}
          <br />
          {COPY.hero.titleLine2}
        </h1>
        <p className="mb-12 max-w-2xl font-body text-lg font-light leading-relaxed text-on-surface-variant md:text-xl">
          {COPY.hero.subtitle}
        </p>
        <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => scrollToSection('#come-ordinare')}
            className="btn-primary w-full sm:w-auto"
          >
            {COPY.hero.orderCta}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('#dolci')}
            className="btn-secondary w-full sm:w-auto"
          >
            {COPY.hero.cta}
          </button>
        </div>
      </PageContainer>
    </header>
  )
}
