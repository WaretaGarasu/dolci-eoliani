/** Minimal fallback for lazy route chunks (privacy, 404) — no visible loading copy. */
export function RouteFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center bg-background"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Caricamento pagina</span>
      <span
        className="h-8 w-8 animate-pulse rounded-full bg-mandorla/60 motion-reduce:animate-none"
        aria-hidden
      />
    </div>
  )
}
