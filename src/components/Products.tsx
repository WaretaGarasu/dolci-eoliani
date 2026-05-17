import { useState } from 'react'
import { COPY } from '../data/copy'
import { PRODUCTS, type Product } from '../data/products'
import { ProductCard } from './ProductCard'
import { ProductModal } from './ProductModal'
import { SectionHeader } from './SectionHeader'
import { SectionShell } from './SectionShell'

const FEATURED_COUNT = 3

export function Products() {
  const [selected, setSelected] = useState<Product | null>(null)

  return (
    <SectionShell id="dolci" tone="default" size="lg">
      <SectionHeader
        title={COPY.products.title}
        lead={COPY.products.subtitle}
        align="center"
        className="mx-auto mb-14 max-w-3xl border-b border-mandorla/25 pb-10"
      />
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelected}
            priority={index < 3}
            featured={index < FEATURED_COUNT}
          />
        ))}
      </div>
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </SectionShell>
  )
}
