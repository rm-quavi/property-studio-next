'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { usePropertyStore } from '@/store/propertyStore'
import { getStatusTextColor, formatPrice } from '@/utils/helpers'
import Image from 'next/image'

interface PropertyDetailContentProps {
  propertyId: number
}

export default function PropertyDetailContent({ propertyId }: PropertyDetailContentProps) {
  const router = useRouter()
  const { currentProperty, fetchCurrentProperty, removeProperty, clearCurrentProperty } = usePropertyStore()

  useEffect(() => {
    fetchCurrentProperty(propertyId)
    return () => {
      clearCurrentProperty()
    }
  }, [propertyId, fetchCurrentProperty, clearCurrentProperty])

  const handleDeleteProperty = async () => {
    await removeProperty(propertyId)
    router.push('/')
  }

  if (!currentProperty) {
    return (
      <div className="p-4 max-w-5xl mx-auto container">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="property-detail">
      <div className="p-4 max-w-5xl mx-auto container flex flex-wrap md:flex-nowrap">
        <div className="w-full md:basis-2/5 mb-4 md:mb-0">
          <Image 
            src={currentProperty.image} 
            alt="Property Image" 
            className="w-full h-auto rounded-lg shadow-md object-cover" 
            width={600} 
            height={400} 
          />
        </div>
        <div className="w-full md:basis-3/5 mt-4 md:mt-0 md:px-6">
          <div className="flex content-center items-center">
            <h2 className="text-2xl font-bold inline-block">{currentProperty.name}</h2>
            <div className="ml-4 px-3 bg-white rounded-xl flex border border-gray-300">
              <span className={`text-3xl leading-5 h-0 mr-1 ${getStatusTextColor(currentProperty.status)}`}>•</span>
              <span className="text-sm">{currentProperty.status}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">{currentProperty.address}</p>
          <p className="text-2xl font-bold mt-1 text-primary mb-4">{formatPrice(currentProperty.price)}</p>
          <p>{currentProperty.description}</p>

          <div className="mt-4">
            <Link
              className="rounded border py-1 px-3 inline-block border-primary text-primary"
              href={`/properties/${currentProperty.id}/edit`}
            >
              <Pencil className="inline h-4 w-4 mr-2" />
              <span className="text-sm">Edit</span>
            </Link>
            <button
              className="rounded border py-1 px-3 mt-2 ml-4 inline-block border-red-500 text-red-500 cursor-pointer"
              onClick={handleDeleteProperty}
            >
              <Trash2 className="inline h-4 w-4 mr-2" />
              <span className="text-sm">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 