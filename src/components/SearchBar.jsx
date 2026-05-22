import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './icons/Icons.jsx'

export default function SearchBar({
  placeholder = 'Search resources, calculators and topics...',
  className = '',
  size = 'lg',
}) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const padding =
    size === 'lg' ? 'pl-14 pr-32 py-4 text-base' : 'pl-12 pr-24 py-3 text-sm'

  function onSubmit(e) {
    e.preventDefault()
    const params = value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ''
    navigate(`/resources/${params}`)
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={`relative w-full ${className}`}
    >
      <Icon
        name="search"
        className={`absolute ${size === 'lg' ? 'left-5 w-5 h-5' : 'left-4 w-4 h-4'} top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none`}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search resources"
        className={`w-full ${padding} rounded-full bg-white shadow-card border border-navy/5 placeholder:text-navy/40 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:border-orange/40`}
      />
      <button
        type="submit"
        className={`absolute top-1/2 -translate-y-1/2 ${
          size === 'lg' ? 'right-2 px-5 py-2.5' : 'right-1.5 px-4 py-2'
        } rounded-full bg-orange text-white font-bold text-sm hover:bg-orange-bright`}
      >
        Search
      </button>
    </form>
  )
}
