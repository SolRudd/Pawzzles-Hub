import React from 'react'
import { Icon } from '../icons/Icons.jsx'

const baseFieldClass =
  'h-[52px] min-h-[52px] w-full rounded-2xl border bg-white px-4 text-sm font-bold text-navy shadow-soft transition-colors placeholder:text-navy/40 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-cream disabled:text-navy/45'

function describedBy(helperId, errorId, helper, error) {
  return [helper && helperId, error && errorId].filter(Boolean).join(' ') || undefined
}

function fieldClass(error, className = '') {
  return `${baseFieldClass} ${
    error
      ? 'border-orange/70 focus:border-orange focus:ring-orange/20'
      : 'border-navy/10 focus:border-orange/40 focus:ring-orange/20'
  } ${className}`
}

export function FormHelperText({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-xs leading-relaxed text-muted">
      {children}
    </p>
  )
}

export function FormError({ id, children }) {
  if (!children) return null
  return (
    <p id={id} className="mt-1.5 text-xs font-bold leading-relaxed text-orange" aria-live="polite">
      {children}
    </p>
  )
}

export function InputField({
  id,
  label,
  helper,
  error,
  required = false,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const helperId = `${id}-helper`
  const errorId = `${id}-error`

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block text-sm font-extrabold text-navy">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      <FormHelperText id={helperId}>{helper}</FormHelperText>
      <input
        id={id}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(helperId, errorId, helper, error)}
        className={fieldClass(error, `mt-2 ${className}`)}
        {...props}
      />
      <FormError id={errorId}>{error}</FormError>
    </div>
  )
}

export function SelectField({
  id,
  label,
  helper,
  error,
  required = false,
  children,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const helperId = `${id}-helper`
  const errorId = `${id}-error`

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block text-sm font-extrabold text-navy">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      <FormHelperText id={helperId}>{helper}</FormHelperText>
      <div className="relative mt-2">
        <select
          id={id}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(helperId, errorId, helper, error)}
          className={fieldClass(error, `appearance-none pr-11 ${className}`)}
          {...props}
        >
          {children}
        </select>
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal"
        />
      </div>
      <FormError id={errorId}>{error}</FormError>
    </div>
  )
}

export function CheckboxField({
  id,
  label,
  helper,
  checked,
  onChange,
  disabled = false,
  className = '',
}) {
  return (
    <label
      htmlFor={id}
      className={`flex items-start gap-3 rounded-2xl border border-navy/10 bg-cream p-4 text-left ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-teal disabled:cursor-not-allowed"
      />
      <span>
        <span className="block text-sm font-bold text-navy">{label}</span>
        {helper && <span className="mt-1 block text-xs leading-relaxed text-muted">{helper}</span>}
      </span>
    </label>
  )
}
