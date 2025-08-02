import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

const mockProperties = [
  {
    id: 1,
    name: 'Test Property 1',
    address: '123 Test St, Test City, TC',
    price: 500000,
    description: 'A test property for testing purposes.',
    status: 'Available' as const,
    image: 'https://example.com/test1.jpg',
    isDeleted: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Test Property 2',
    address: '456 Test Ave, Test City, TC',
    price: 750000,
    description: 'Another test property for testing purposes.',
    status: 'Sold' as const,
    image: 'https://example.com/test2.jpg',
    isDeleted: false,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
]

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders header', () => {
    global.mockPropertyStore.mockReturnValue({
      properties: mockProperties,
      fetchAllProperties: jest.fn(),
    })

    render(<HomePage />)

    expect(screen.getByText('Property Studio')).toBeInTheDocument()
    expect(screen.getByText('Add new property')).toBeInTheDocument()
  })

  it('renders page title', () => {
    global.mockPropertyStore.mockReturnValue({
      properties: mockProperties,
      fetchAllProperties: jest.fn(),
    })

    render(<HomePage />)

    expect(screen.getByText('Your properties')).toBeInTheDocument()
  })

  it('renders property list with properties', () => {
    global.mockPropertyStore.mockReturnValue({
      properties: mockProperties,
      fetchAllProperties: jest.fn(),
    })

    render(<HomePage />)

    expect(screen.getByText('Test Property 1')).toBeInTheDocument()
    expect(screen.getByText('Test Property 2')).toBeInTheDocument()
  })

  it('calls fetchAllProperties on mount', () => {
    const mockFetchAllProperties = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      properties: mockProperties,
      fetchAllProperties: mockFetchAllProperties,
    })

    render(<HomePage />)

    expect(mockFetchAllProperties).toHaveBeenCalled()
  })

  it('renders empty state when no properties', () => {
    global.mockPropertyStore.mockReturnValue({
      properties: [],
      fetchAllProperties: jest.fn(),
    })

    render(<HomePage />)

    expect(screen.getByText('Your properties')).toBeInTheDocument()
    // Should not show any property items
    expect(screen.queryByText('Test Property 1')).not.toBeInTheDocument()
  })
}) 