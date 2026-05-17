import type { Product } from '../data/products'
import { productResponsiveSrcSet, PRODUCT_IMAGE_SIZE } from '../data/products'

type ProductImageProps = {
  product: Product
  className?: string
  priority?: boolean
}

const PRODUCT_SIZES = '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px'

export function ProductImage({ product, className = '', priority = false }: ProductImageProps) {
  const webpSrcSet = productResponsiveSrcSet(product.image, 'webp')
  const jpgSrcSet = productResponsiveSrcSet(product.image, 'jpg')

  return (
    <picture>
      <source srcSet={webpSrcSet} type="image/webp" sizes={PRODUCT_SIZES} />
      <source srcSet={jpgSrcSet} type="image/jpeg" sizes={PRODUCT_SIZES} />
      <img
        src={product.image}
        alt={product.imageAlt}
        width={PRODUCT_IMAGE_SIZE}
        height={PRODUCT_IMAGE_SIZE}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={PRODUCT_SIZES}
        className={className}
      />
    </picture>
  )
}
