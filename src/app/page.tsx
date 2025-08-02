'use client'

import { useEffect } from 'react'
import TheHeader from '@/components/TheHeader'
import PropertyList from '@/components/property/PropertyList'
import { usePropertyStore } from '@/store/propertyStore'

export default function HomePage() {
  const { properties, fetchAllProperties } = usePropertyStore()

  useEffect(() => {
    fetchAllProperties()
  }, [fetchAllProperties])

  return (
    <div>
      <TheHeader />
      <div className="container mx-auto">
        <PropertyList properties={properties}>
          <h1 className="font-light text-gray-800 text-4xl">Your properties</h1>
        </PropertyList>
      </div>
    </div>
  )
}
