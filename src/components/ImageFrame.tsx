import type { ReactNode } from 'react'

type ImageFrameProps = {
  children: ReactNode
  className?: string
  aspect?: string
}

export function ImageFrame({
  children,
  className = '',
  aspect = 'aspect-[4/3]',
}: ImageFrameProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-mandorla/50 bg-surface-container p-1 ${aspect} ${className}`.trim()}
    >
      <div className="relative h-full w-full overflow-hidden">{children}</div>
    </div>
  )
}
