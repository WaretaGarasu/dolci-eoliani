import { useId } from 'react'

type FloatingInputProps = {
  id?: string
  label: string
  type?: 'text' | 'email'
  multiline?: boolean
  rows?: number
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function FloatingInput({
  id: idProp,
  label,
  type = 'text',
  multiline = false,
  rows = 3,
  value,
  onChange,
  required,
}: FloatingInputProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  const inputClass =
    'peer w-full border-0 border-b border-nero-carbone/30 bg-transparent px-0 py-3 font-body text-primary transition-colors duration-300 placeholder-transparent focus:border-b-2 focus:border-nero-carbone focus:ring-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-mandorla/60 focus-visible:ring-offset-2'

  const labelClass =
    'pointer-events-none absolute left-0 font-body text-xs font-semibold tracking-widest text-on-surface-variant uppercase transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-focus:-top-5 peer-focus:text-xs peer-focus:font-semibold peer-focus:tracking-widest peer-focus:uppercase peer-[:not(:placeholder-shown)]:-top-5'

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          required={required}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          required={required}
          className={inputClass}
        />
      )}
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </div>
  )
}
