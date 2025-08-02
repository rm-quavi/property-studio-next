'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Image, Trash2 } from 'lucide-react'
import TheHeader from '@/components/TheHeader'
import { usePropertyStore } from '@/store/propertyStore'
import type { Property } from '@/types/Property'

interface EditPropertyPageProps {
  params: {
    id: string
  }
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const router = useRouter()
  const { currentProperty, fetchCurrentProperty, updateCurrentProperty, clearCurrentProperty } = usePropertyStore()
  const propertyId = parseInt(params.id)
  const [propertyForm, setPropertyForm] = useState<Property | null>(null)
  const [hasImageError, setHasImageError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchCurrentProperty(propertyId)
    return () => {
      clearCurrentProperty()
    }
  }, [propertyId, fetchCurrentProperty, clearCurrentProperty])

  useEffect(() => {
    if (currentProperty) {
      setPropertyForm({ ...currentProperty })
    }
  }, [currentProperty])

  const validateForm = () => {
    if (!propertyForm) return false
    
    const newErrors: Record<string, string> = {}

    if (!propertyForm.name.trim()) {
      newErrors.name = 'This field is required'
    }
    if (!propertyForm.address.trim()) {
      newErrors.address = 'This field is required'
    }
    if (!propertyForm.price || propertyForm.price <= 0) {
      newErrors.price = 'This field must be a positive number'
    }
    if (!propertyForm.description.trim()) {
      newErrors.description = 'This field is required'
    }
    if (!propertyForm.status) {
      newErrors.status = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof Property, value: string | number) => {
    if (!propertyForm) return
    
    setPropertyForm(prev => prev ? { ...prev, [field]: value } : null)
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!propertyForm) return
    
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPropertyForm(prev => prev ? { ...prev, image: imageUrl } : null)
      setHasImageError(false)
    }
  }

  const handleSubmit = async () => {
    if (!propertyForm || !validateForm()) {
      return
    }

    if (!propertyForm.image) {
      setHasImageError(true)
      return
    }

    await updateCurrentProperty(propertyId, propertyForm)
    router.push(`/properties/${propertyId}`)
  }

  if (!currentProperty || !propertyForm) {
    return (
      <div>
        <TheHeader />
        <div className="p-4 max-w-5xl mx-auto container">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <TheHeader />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-wrap flex-col md:flex-row md:flex-nowrap">
          <h2 className="font-light text-2xl mb-4 md:hidden">Edit property</h2>
          <div className="md:basis-2/5 mb-4 flex flex-col items-center">
            {!propertyForm.image ? (
              <label
                htmlFor="imageFileInput"
                className="my-4 md:mt-15 w-30 h-30 rounded-lg bg-gray-200 flex items-center justify-center flex-col text-center relative cursor-pointer"
              >
                <Image className="w-9 h-9 text-gray-500 mb-3" />
                <span className="text-gray-500 text-xs">Select an image</span>
                <input
                  id="imageFileInput"
                  type="file"
                  accept="image/*"
                  className="hidden absolute inset-0"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="flex flex-col items-center">
                <img src={propertyForm.image} alt="Property Image" className="w-full h-auto rounded-lg shadow-md" />
                <button
                  className="mt-3 text-red-500 text-sm flex items-center cursor-pointer"
                  onClick={() => setPropertyForm(prev => prev ? { ...prev, image: '' } : null)}
                >
                  <Trash2 className="h-4 w-4 inline mr-1" />
                  <span>Remove Image</span>
                </button>
              </div>
            )}
            {hasImageError && <span className="text-red-500 text-xs">Please select an image for the property</span>}
          </div>

          <div className="md:basis-3/5 md:pl-6 w-full">
            <h2 className="font-light text-2xl mb-4 hidden md:block">Edit property</h2>
            <div>
              <label htmlFor="name" className="form-label">
                Name
                <span className="text-red-500">*</span>
              </label>
              <input
                value={propertyForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                type="text"
                id="name"
                name="name"
                className="w-full form-input"
                placeholder="Enter the property name"
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="form-label">
                Address
                <span className="text-red-500">*</span>
              </label>
              <input
                value={propertyForm.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                type="text"
                id="address"
                name="address"
                className="w-full form-input"
                placeholder="Enter the property address"
              />
              {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
            </div>
            <div className="mt-4">
              <label htmlFor="price" className="form-label">
                Price
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center rounded-md border border-gray-300 shadow-sm focus-within:ring-1 focus-within:ring-blue-500">
                <span className="px-3 text-gray-500 border-r border-gray-300">$</span>
                <input
                  value={propertyForm.price || ''}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  type="number"
                  id="price"
                  name="price"
                  className="w-full flex-1 px-3 py-2 focus:outline-none rounded-r-md"
                  placeholder="Enter the property price"
                />
              </div>
              {errors.price && <span className="text-xs text-red-500">{errors.price}</span>}
            </div>
            <div className="mt-4">
              <label htmlFor="status" className="form-label">
                Status
                <span className="text-red-500">*</span>
              </label>
              <select
                value={propertyForm.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="form-select w-full"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Under Contract">Under Contract</option>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="form-label">
                Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={propertyForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                id="description"
                name="description"
                className="w-full form-input"
                placeholder="Enter the property description"
                rows={7}
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
            </div>
            <button className="mt-2 primary-button block" onClick={handleSubmit}>
              Save Property
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 