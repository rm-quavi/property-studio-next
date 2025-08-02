import { render, screen, fireEvent } from '@testing-library/react'
import PropertyList from '@/components/property/PropertyList'

// Mock the store
jest.mock('@/store/propertyStore', () => ({
  usePropertyStore: jest.fn(),
}))

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
  {
    id: 3,
    name: 'Test Property 3',
    address: '789 Test Blvd, Test City, TC',
    price: 300000,
    description: 'A third test property for testing purposes.',
    status: 'Under Contract' as const,
    image: 'https://example.com/test3.jpg',
    isDeleted: false,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
]

describe('PropertyList', () => {
  it('renders property items correctly', () => {
    render(<PropertyList properties={mockProperties} />)

    expect(screen.getByText('Test Property 1')).toBeInTheDocument()
    expect(screen.getByText('Test Property 2')).toBeInTheDocument()
    expect(screen.getByText('Test Property 3')).toBeInTheDocument()
  })

  it('renders header content when provided', () => {
    render(
      <PropertyList properties={mockProperties}>
        <h1>Test Header</h1>
      </PropertyList>
    )

    expect(screen.getByText('Test Header')).toBeInTheDocument()
  })

  it('renders filter and sort buttons', () => {
    render(<PropertyList properties={mockProperties} />)

    expect(screen.getByText('Filter by status')).toBeInTheDocument()
    expect(screen.getByText('Sort')).toBeInTheDocument()
  })

  it('filters properties by status when filter is selected', () => {
    render(<PropertyList properties={mockProperties} />)

    // Click filter button
    const filterButton = screen.getByText('Filter by status')
    fireEvent.click(filterButton)

    // Click "Available" option from dropdown
    const availableOptions = screen.getAllByText('Available')
    const dropdownOption = availableOptions.find(option => 
      option.closest('li') && option.closest('ul')
    )
    if (dropdownOption) {
      fireEvent.click(dropdownOption)
    }

    // Should only show available properties
    expect(screen.getByText('Test Property 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Property 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Property 3')).not.toBeInTheDocument()
  })

  it('sorts properties by price when sort is selected', () => {
    render(<PropertyList properties={mockProperties} />)

    // Click sort button
    const sortButton = screen.getByText('Sort')
    fireEvent.click(sortButton)

    // Click "Price: Low to High" option
    const lowToHighOption = screen.getByText('Price: Low to High')
    fireEvent.click(lowToHighOption)

    // Properties should be sorted by price (low to high)
    const propertyItems = screen.getAllByRole('link')
    expect(propertyItems[0]).toHaveTextContent('Test Property 3') // $300,000
    expect(propertyItems[1]).toHaveTextContent('Test Property 1') // $500,000
    expect(propertyItems[2]).toHaveTextContent('Test Property 2') // $750,000
  })

  it('shows pagination when there are more than 10 properties', () => {
    const manyProperties = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `Property ${i + 1}`,
      address: `Address ${i + 1}`,
      price: 100000 + (i * 50000),
      description: `Description ${i + 1}`,
      status: 'Available' as const,
      image: `https://example.com/property${i + 1}.jpg`,
      isDeleted: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    }))

    render(<PropertyList properties={manyProperties} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('does not show pagination when there are 10 or fewer properties', () => {
    render(<PropertyList properties={mockProperties} />)

    expect(screen.queryByText('Previous')).not.toBeInTheDocument()
    expect(screen.queryByText('Next')).not.toBeInTheDocument()
  })

  it('excludes deleted properties from display', () => {
    const propertiesWithDeleted = [
      ...mockProperties,
      {
        id: 4,
        name: 'Deleted Property',
        address: 'Deleted Address',
        price: 100000,
        description: 'This property is deleted',
        status: 'Available' as const,
        image: 'https://example.com/deleted.jpg',
        isDeleted: true,
        createdAt: '2024-01-04T00:00:00Z',
        updatedAt: '2024-01-04T00:00:00Z',
      },
    ]

    render(<PropertyList properties={propertiesWithDeleted} />)

    expect(screen.queryByText('Deleted Property')).not.toBeInTheDocument()
  })
}) 