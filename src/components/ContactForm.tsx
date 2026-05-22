import { useEffect, useState, type FormEvent } from 'react'
import { COPY } from '../data/copy'
import { buildContactWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp'
import { FloatingInput } from './FloatingInput'
import { Icon } from './Icon'

type ContactFormProps = {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!submitted) return
    const id = setTimeout(() => setSubmitted(false), 3000)
    return () => clearTimeout(id)
  }, [submitted])

  useEffect(() => {
    if (!error) return
    const id = setTimeout(() => setError(''), 4000)
    return () => clearTimeout(id)
  }, [error])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      setError(COPY.contact.form.validation)
      return
    }
    setError('')
    const text = buildContactWhatsAppMessage(name.trim(), message.trim())
    window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-6 rounded-[1.75rem] border border-mandorla/30 bg-surface px-6 py-8 sm:px-8 sm:py-9 ${className}`.trim()}
    >
      <div className="text-center">
        <h3 className="font-display text-xl tracking-tight text-primary md:text-2xl">
          {COPY.contact.form.secondaryTitle}
        </h3>
        <p className="mt-2 font-body text-sm font-light leading-relaxed text-on-surface-variant">
          {COPY.contact.form.helper}
        </p>
      </div>
      <FloatingInput label="Nome" value={name} onChange={setName} required />
      <FloatingInput
        label="Messaggio"
        multiline
        rows={5}
        value={message}
        onChange={setMessage}
        required
      />
      {error && (
        <p className="text-center text-sm text-error" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="btn-secondary mt-1 w-full justify-center px-8 py-4 text-base"
      >
        {submitted ? COPY.contact.form.submitting : COPY.contact.form.submit}
        <Icon name="chat" className="text-lg" />
      </button>
    </form>
  )
}
