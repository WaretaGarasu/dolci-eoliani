import { useCallback, useState } from 'react'

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}

export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else if (!fallbackCopy(text)) {
          setFailed(true)
          return false
        }
        setCopied(true)
        setFailed(false)
        window.setTimeout(() => setCopied(false), resetMs)
        return true
      } catch {
        if (fallbackCopy(text)) {
          setCopied(true)
          setFailed(false)
          window.setTimeout(() => setCopied(false), resetMs)
          return true
        }
        setFailed(true)
        return false
      }
    },
    [resetMs],
  )

  return { copied, failed, copy }
}
