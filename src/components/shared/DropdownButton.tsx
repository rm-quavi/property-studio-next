'use client'

import { useState, ReactNode } from 'react'

interface DropdownButtonProps {
  items: string[]
  children: ReactNode
  onItemSelect: (item: string) => void
  className?: string
}

export default function DropdownButton({ items, children, onItemSelect, className = '' }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleItemClick = (item: string) => {
    onItemSelect(item)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center text-sm border border-primary text-primary rounded-md px-3 py-2 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-0 mt-10 z-10">
          <ul className="mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            {items.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-light"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 