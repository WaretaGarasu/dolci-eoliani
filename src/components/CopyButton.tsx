import type { MouseEvent } from 'react'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import { Icon } from './Icon'

type CopyButtonProps = {
  value: string
  variant?: 'inline' | 'icon'
  className?: string
}

export function CopyButton({ value, variant = 'inline', className = '' }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    void copy(value)
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={copied ? 'Copiato' : 'Copia negli appunti'}
        className={`p-2 text-on-surface-variant transition-colors duration-300 hover:text-primary ${className}`}
        aria-label={copied ? 'Copiato negli appunti' : 'Copia negli appunti'}
      >
        <Icon name={copied ? 'check' : 'content_copy'} className="text-[20px]" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group/btn flex items-center gap-1.5 rounded-none border border-primary/10 px-3 py-1 transition-all duration-300 hover:bg-mandorla hover:text-nero-carbone ${className}`}
      aria-label={copied ? 'Copiato negli appunti' : 'Copia negli appunti'}
    >
      <Icon name="content_copy" className="text-[14px]" />
      <span className="text-label-caps text-[9px] tracking-widest">
        {copied ? 'COPIATO' : 'COPIA'}
      </span>
    </button>
  )
}
