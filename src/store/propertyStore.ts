import { create } from 'zustand'
import {
  getAllProperties,
  getProperty,
  updateProperty,
  addProperty,
  deleteProperty,
  searchAllProperties,
} from '@/services/mockApi'
import type { CreatePropertyInput, Property, UpdatePropertyInput } from '@/types/Property'

interface PropertyStore {
  properties: Property[]
  currentProperty: Property | null
  loading: boolean
  fetchAllProperties: () => Promise<void>
  fetchCurrentProperty: (id: number) => Promise<void>
  searchProperties: (query: string) => Promise<Property[]>
  addNewProperty: (property: CreatePropertyInput) => Promise<Property | undefined>
  updateCurrentProperty: (id: number, property: UpdatePropertyInput) => Promise<void>
  removeProperty: (id: number) => Promise<void>
  clearCurrentProperty: () => void
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: [],
  currentProperty: null,
  loading: false,

  fetchAllProperties: async () => {
    const { properties } = get()
    if (properties.length > 0) {
      return // If properties are already loaded, skip fetching
    }

    set({ loading: true })
    try {
      const propertiesRes: Property[] = await getAllProperties()
      if (!propertiesRes) {
        throw new Error('Error fetching properties')
      }
      set({ properties: propertiesRes })
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      set({ loading: false })
    }
  },

  fetchCurrentProperty: async (id: number) => {
    set({ loading: true })
    try {
      const property: Property | null = await getProperty(id)
      if (!property) {
        throw new Error('Error fetching properties')
      }
      set({ currentProperty: property })
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      set({ loading: false })
    }
  },

  searchProperties: async (query: string) => {
    set({ loading: true })
    try {
      const propertiesRes: Property[] = await searchAllProperties(query)
      if (!propertiesRes) {
        throw new Error('Error fetching properties')
      }
      return propertiesRes
    } catch (error) {
      console.error('Failed to search properties:', error)
      return []
    } finally {
      set({ loading: false })
    }
  },

  addNewProperty: async (property: CreatePropertyInput) => {
    set({ loading: true })
    try {
      const newProperty: Property = await addProperty(property)
      if (!newProperty) {
        throw new Error('Error adding property')
      }
      const { properties } = get()
      set({ properties: [...properties, newProperty] })
      return newProperty
    } catch (error) {
      console.error('Failed to add property:', error)
    } finally {
      set({ loading: false })
    }
  },

  updateCurrentProperty: async (id: number, property: UpdatePropertyInput) => {
    set({ loading: true })
    try {
      const updatedProperty: Property = await updateProperty(id, property)
      if (!updatedProperty) {
        throw new Error('Error updating property')
      }

      const { properties } = get()
      const index = properties.findIndex((p) => p.id === id)

      if (index !== -1) {
        const updatedProperties = [...properties]
        updatedProperties[index] = updatedProperty
        set({ properties: updatedProperties })
      } else {
        throw new Error('Property not found in the store')
      }
    } catch (error) {
      console.error('Failed to update property:', error)
    } finally {
      set({ loading: false })
    }
  },

  removeProperty: async (id: number) => {
    set({ loading: true })
    try {
      await deleteProperty(id)

      const { properties } = get()
      const index = properties.findIndex((p) => p.id === id)
      if (index !== -1) {
        const updatedProperties = [...properties]
        updatedProperties[index].isDeleted = true
        set({ properties: updatedProperties })
      } else {
        throw new Error('Property not found in the store')
      }
    } catch (error) {
      console.error('Failed to delete property:', error)
    } finally {
      set({ loading: false })
    }
  },

  clearCurrentProperty: () => {
    set({ currentProperty: null })
  },
})) 