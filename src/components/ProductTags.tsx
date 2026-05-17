type ProductTagsProps = {
  tags: string[]
  className?: string
}

export function ProductTags({ tags, className = '' }: ProductTagsProps) {
  return (
    <ul className={`flex flex-wrap justify-center gap-1.5 ${className}`.trim()} aria-label="Caratteristiche">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-mandorla/35 bg-surface-container-low px-2.5 py-0.5 font-body text-[11px] text-on-surface-variant"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
