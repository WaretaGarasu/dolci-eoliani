export type RichTextPart =
  | { type: 'text'; value: string }
  | { type: 'link'; href: string; label: string }

export function richTextToPlain(parts: readonly RichTextPart[]): string {
  return parts.map((p) => (p.type === 'text' ? p.value : p.label)).join('')
}
