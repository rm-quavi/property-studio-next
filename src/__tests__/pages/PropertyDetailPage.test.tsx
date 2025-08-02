import { render, screen, fireEvent } from '@testing-library/react'
import PropertyDetailPage from '@/app/properties/[id]/page'

const mockProperty = {
  id: 1,
  name: 'Test Property',
  address: '123 Test St, Test City, TC',
  price: 500000,
  description: 'A test property for testing purposes.',
  status: 'Available' as const,
  image: 'https://example.com/test.jpg',
  isDeleted: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('PropertyDetailPage', () => {
  const mockParams = { id: '1' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders property details correctly', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    expect(screen.getByText('Test Property')).toBeInTheDocument()
    expect(screen.getByText('123 Test St, Test City, TC')).toBeInTheDocument()
    expect(screen.getByText('$500,000')).toBeInTheDocument()
    expect(screen.getByText('A test property for testing purposes.')).toBeInTheDocument()
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('renders property image', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    const image = screen.getByAltText('Property Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/test.jpg')
  })

  it('renders edit and delete buttons', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('calls fetchCurrentProperty on mount', () => {
    const mockFetchCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: mockFetchCurrentProperty,
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    expect(mockFetchCurrentProperty).toHaveBeenCalledWith(1)
  })

  it('calls clearCurrentProperty on unmount', () => {
    const mockClearCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: mockClearCurrentProperty,
    })

    const { unmount } = render(<PropertyDetailPage params={mockParams} />)
    unmount()

    expect(mockClearCurrentProperty).toHaveBeenCalled()
  })

  it('shows loading state when property is not loaded', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: null,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('calls removeProperty when delete button is clicked', () => {
    const mockRemoveProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: mockRemoveProperty,
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockRemoveProperty).toHaveBeenCalledWith(1)
  })

  it('renders edit link with correct href', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    const editLink = screen.getByText('Edit').closest('a')
    expect(editLink).toHaveAttribute('href', '/properties/1/edit')
  })

  it('displays status with correct styling', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      removeProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<PropertyDetailPage params={mockParams} />)

    const statusContainer = screen.getByText('Available').closest('div')
    expect(statusContainer).toHaveClass('px-3', 'bg-white', 'rounded-xl', 'flex', 'border', 'border-gray-300')
  })
}) 