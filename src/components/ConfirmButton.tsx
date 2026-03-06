'use client'

import { Check } from 'lucide-react'

interface ConfirmButtonProps {
  isConfirmed: boolean
  onClick: () => void
  className?: string
}

export function ConfirmButton({ isConfirmed, onClick, className = '' }: ConfirmButtonProps) {
  if (isConfirmed) {
    return (
      <button
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-600 cursor-default ${className}`}
        disabled
      >
        確定済
      </button>
    )
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-green-600 text-white hover:bg-green-700 transition-colors ${className}`}
    >
      <Check className="w-3 h-3" />
      確定
    </button>
  )
}
