import type { Product } from '../data/products'
import { COPY } from '../data/copy'
import { Icon } from './Icon'
import { ProductImage } from './ProductImage'
import { ProductTags } from './ProductTags'

type ProductCardProps = {
  product: Product
  onSelect: (product: Product) => void
  priority?: boolean
  featured?: boolean
}

export function ProductCard({
  product,
  onSelect,
  priority = false,
  featured = false,
}: ProductCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-surface text-left transition-colors duration-300 hover:border-mandorla-dark/50 hover:shadow-sm motion-reduce:transition-none ${
        featured ? 'border-mandorla-dark/40' : 'border-mandorla/30'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(product)}
        aria-haspopup="dialog"
        aria-label={`Apri dettagli su ${product.name}`}
        className="block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative aspect-square overflow-hidden rounded-t-[1.75rem]">
          {featured && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-surface/95 px-3 py-1 font-body text-[10px] font-medium tracking-wide text-secondary">
              {COPY.products.featuredLabel}
            </span>
          )}
          <ProductImage
            product={product}
            priority={priority}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="px-5 pb-3 pt-5">
          <h3 className="mb-2 font-display text-2xl tracking-tight text-primary">{product.name}</h3>
          <p className="line-clamp-2 font-body text-sm font-light leading-relaxed text-on-surface-variant">
            {product.description}
          </p>
        </div>
      </button>
      <div className="mt-auto px-5 pb-5 text-center">
        <ProductTags tags={product.tags} className="mb-4" />
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium text-secondary transition-colors hover:text-primary"
        >
          {COPY.products.discoverMore}
          <Icon name="arrow_forward" className="text-sm" aria-hidden />
        </button>
      </div>
    </article>
  )
}
