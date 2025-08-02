'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function TheHeader() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return
    }
    router.push(`/properties/search?query=${encodeURIComponent(searchQuery)}`)
    setSearchQuery('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="p-3 shadow-md bg-white flex items-center">
      <Link href="/" className="font-light flex items-center">
        <img alt="Property Studio logo" className="logo" src="/PS_LOGO.png" width="30" height="30" />
        <span className="hidden md:block ml-4">Property Studio</span>
      </Link>
      <div className="flex grow"></div>
      <div className="mr-3 w-48 md:w-56 flex items-center rounded-lg border border-gray-300 focus-within:ring-1 focus-within:ring-primary">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          type="text"
          className="w-full flex-1 px-3 py-2 focus:outline-none rounded-r-md text-sm"
          placeholder="Search property.."
        />
        <Search className="h-4 w-4 mr-3 cursor-pointer" onClick={handleSearch} />
      </div>
      <Link href="/properties/add" className="primary-button md:mr-3">
        Add new property
      </Link>
    </header>
  )
} 