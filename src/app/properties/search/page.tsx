'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import TheHeader from '@/components/TheHeader'
import PropertyList from '@/components/property/PropertyList'
import { usePropertyStore } from '@/store/propertyStore'
import type { Property } from '@/types/Property'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { searchProperties } = usePropertyStore()
  const searchQuery = searchParams.get('query') || ''
  const [isSearching, setIsSearching] = useState(true)
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery) {
        setIsSearching(true)
        const results = await searchProperties(searchQuery)
        setProperties(results)
        setIsSearching(false)
      }
    }

    performSearch()
  }, [searchQuery, searchProperties])

  return (
    <div>
      <TheHeader />
      <div className="container mx-auto">
        <PropertyList properties={properties}>
          <h1 className="font-light text-gray-800 text-4xl">Search result for: {searchQuery}</h1>
        </PropertyList>
        {!isSearching && properties.length === 0 && (
          <span className="text-center block text-3xl mt-6 font-light">
            Sorry, we can&apos;t find anything.
          </span>
        )}
      </div>
    </div>
  )
} 