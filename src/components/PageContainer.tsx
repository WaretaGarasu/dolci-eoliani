import { forwardRef, type ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  className?: string
}

/** Shared horizontal rhythm: one centered column for header, sections, and footer. */
export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(function PageContainer(
  { children, className = '' },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`mx-auto w-full max-w-[var(--spacing-container-max)] px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)] ${className}`.trim()}
    >
      {children}
    </div>
  )
})
