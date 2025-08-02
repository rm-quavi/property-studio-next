import { formatPrice, getStatusTextColor } from '@/utils/helpers'
import { updateProperty, addProperty, getAllProperties } from '@/services/mockApi'

describe('Helper Functions', () => {
  describe('formatPrice', () => {
    it('formats price correctly', () => {
      expect(formatPrice(500000)).toBe('$500,000')
      expect(formatPrice(750000)).toBe('$750,000')
      expect(formatPrice(1000000)).toBe('$1,000,000')
    })

    it('handles decimal values', () => {
      expect(formatPrice(500000.99)).toBe('$500,001')
    })
  })

  describe('getStatusTextColor', () => {
    it('returns correct color for Available status', () => {
      expect(getStatusTextColor('Available')).toBe('text-green-700')
    })

    it('returns correct color for Sold status', () => {
      expect(getStatusTextColor('Sold')).toBe('text-orange-400')
    })

    it('returns correct color for Under Contract status', () => {
      expect(getStatusTextColor('Under Contract')).toBe('text-blue-800')
    })
  })
})

describe('Mock API Functions', () => {
  describe('updateProperty', () => {
    it('actually updates the property in the data source', async () => {
      // Get initial properties
      const initialProperties = await getAllProperties()
      const propertyToUpdate = initialProperties[0]
      const originalName = propertyToUpdate.name

      // Update the property
      const updatedProperty = await updateProperty(propertyToUpdate.id, {
        name: 'Updated Property Name',
        address: propertyToUpdate.address,
        price: propertyToUpdate.price,
        description: propertyToUpdate.description,
        status: propertyToUpdate.status,
        image: propertyToUpdate.image,
      })

      // Verify the returned property is updated
      expect(updatedProperty.name).toBe('Updated Property Name')
      expect(updatedProperty.updatedAt).toBeDefined()

      // Get properties again and verify the change persisted
      const updatedProperties = await getAllProperties()
      const foundProperty = updatedProperties.find(p => p.id === propertyToUpdate.id)
      expect(foundProperty?.name).toBe('Updated Property Name')

      // Restore the original name for other tests
      await updateProperty(propertyToUpdate.id, {
        name: originalName,
        address: propertyToUpdate.address,
        price: propertyToUpdate.price,
        description: propertyToUpdate.description,
        status: propertyToUpdate.status,
        image: propertyToUpdate.image,
      })
    })
  })

  describe('addProperty', () => {
    it('actually adds the property to the data source', async () => {
      // Get initial count
      const initialProperties = await getAllProperties()
      const initialCount = initialProperties.length

      // Add a new property
      const newProperty = await addProperty({
        name: 'Test Property',
        address: '123 Test St',
        price: 500000,
        description: 'A test property',
        status: 'Available' as const,
        image: 'https://example.com/test.jpg',
      })

      // Verify the returned property has correct data
      expect(newProperty.name).toBe('Test Property')
      expect(newProperty.id).toBeDefined()
      expect(newProperty.createdAt).toBeDefined()
      expect(newProperty.updatedAt).toBeDefined()

      // Get properties again and verify the count increased
      const updatedProperties = await getAllProperties()
      expect(updatedProperties.length).toBe(initialCount + 1)

      // Verify the new property is in the list
      const foundProperty = updatedProperties.find(p => p.id === newProperty.id)
      expect(foundProperty).toBeDefined()
      expect(foundProperty?.name).toBe('Test Property')
    })
  })
}) 