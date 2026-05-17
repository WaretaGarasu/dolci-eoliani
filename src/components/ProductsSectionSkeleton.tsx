/** Skeleton grid for product catalog (reserved for optional lazy boundaries). */
export function ProductsSectionSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Caricamento catalogo"
    >
      {[0, 1, 2].map((i) => (
        <div key={i} className="border border-mandorla/20 bg-surface">
          <div className="aspect-square skeleton-shimmer" />
          <div className="space-y-3 p-6">
            <div className="h-6 w-2/3 skeleton-shimmer" />
            <div className="h-4 w-full skeleton-shimmer" />
            <div className="h-4 w-4/5 skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  )
}
