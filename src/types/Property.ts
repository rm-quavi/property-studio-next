export interface Property {
  id: number
  name: string
  address: string
  price: number
  description: string
  status: 'Available' | 'Under Contract' | 'Sold'
  image: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type CreatePropertyInput = Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>
export type UpdatePropertyInput = Partial<CreatePropertyInput> 