'use client'

import Link from 'next/link'
import type { Property } from '@/types/Property'
import { formatPrice, getStatusTextColor } from '@/utils/helpers'
import Image from 'next/image'

interface PropertyItemProps {
  property: Property
}

export default function PropertyItem({ property }: PropertyItemProps) {
  return (
    <Link className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col" href={`/properties/${property.id}`}>
      <div className="relative">
        <Image className="w-full aspect-3/2 object-cover" src={property.image} alt="Property Image" width={400} height={267} />
        <div className="px-3 py-1 text-xs bg-white/80 absolute top-2 right-2 rounded-full flex">
          <span className={`text-3xl leading-4 h-0 mr-1 ${getStatusTextColor(property.status)}`}>•</span>
          <span>{property.status}</span>
        </div>
      </div>
      <div className="p-4 py-2 flex flex-col grow">
        <h3 className="font-bold text-gray-800 text-sm">{property.name}</h3>
        <p className="text-xs text-gray-800">{property.address}</p>
        <div className="grow"></div>
        <span className="block mt-1 text-lg font-bold text-primary">{formatPrice(property.price)}</span>
      </div>
    </Link>
  )
} 