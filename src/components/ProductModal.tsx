import { useEffect, useRef } from 'react'
import type { Product } from '../data/products'
import { COPY } from '../data/copy'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { buildOrderWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp'
import { Icon } from './Icon'
import { ProductImage } from './ProductImage'
import { ProductTags } from './ProductTags'

type ProductModalProps = {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useFocusTrap(dialogRef, true)

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement | null
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-nero-carbone/55 p-3 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="absolute inset-0 cursor-default" aria-hidden="true" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-mandorla/35 bg-surface shadow-xl"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[2rem] md:aspect-[16/10]">
          <ProductImage product={product} priority className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-mandorla/40 bg-surface/95 text-primary shadow-sm backdrop-blur-sm transition-colors hover:bg-mandorla focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={COPY.modal.close}
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          <h2 id="product-modal-title" className="pr-12 font-display text-3xl tracking-tight text-primary">
            {product.name}
          </h2>
          {product.badges && product.badges.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-mandorla/40 bg-surface-container-low px-2.5 py-0.5 font-body text-[10px] text-on-surface-variant"
                >
                  {badge}
                </li>
              ))}
            </ul>
          )}
          <ProductTags tags={product.tags} className="mb-5 mt-4 justify-start" />
          <p className="max-w-prose font-body text-base font-light leading-relaxed text-on-surface-variant">
            {product.longDescription}
          </p>
        </div>

        <div className="shrink-0 border-t border-mandorla/20 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8">
          <a
            href={buildWhatsAppUrl(buildOrderWhatsAppMessage(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex w-full justify-center rounded-full"
          >
            {COPY.modal.orderWhatsApp}
            <Icon name="chat" className="text-base" />
          </a>
        </div>
      </div>
    </div>
  )
}
