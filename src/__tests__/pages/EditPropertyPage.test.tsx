import { render, screen, fireEvent } from '@testing-library/react'
import EditPropertyPage from '@/app/properties/[id]/edit/page'

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

describe('EditPropertyPage', () => {
  const mockParams = { id: '1' }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders page title', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // Check for both mobile and desktop titles
    const titles = screen.getAllByText('Edit property')
    expect(titles.length).toBeGreaterThan(0)
  })

  it('renders form fields with current property data', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    expect(screen.getByDisplayValue('Test Property')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123 Test St, Test City, TC')).toBeInTheDocument()
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('A test property for testing purposes.')).toBeInTheDocument()
  })

  it('renders property image', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    const image = screen.getByAltText('Property Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/test.jpg')
  })

  it('renders save button', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    expect(screen.getByText('Save Property')).toBeInTheDocument()
  })

  it('calls fetchCurrentProperty on mount', () => {
    const mockFetchCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: mockFetchCurrentProperty,
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    expect(mockFetchCurrentProperty).toHaveBeenCalledWith(1)
  })

  it('calls clearCurrentProperty on unmount', () => {
    const mockClearCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: mockClearCurrentProperty,
    })

    const { unmount } = render(<EditPropertyPage params={mockParams} />)
    unmount()

    expect(mockClearCurrentProperty).toHaveBeenCalled()
  })

  it('shows loading state when property is not loaded', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: null,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('updates form fields when user types', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    const nameInput = screen.getByDisplayValue('Test Property')
    fireEvent.change(nameInput, { target: { value: 'Updated Property' } })

    expect(nameInput).toHaveValue('Updated Property')
  })

  it('shows validation errors for empty required fields', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // Clear a required field
    const nameInput = screen.getByDisplayValue('Test Property')
    fireEvent.change(nameInput, { target: { value: '' } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('shows validation error for invalid price', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    const priceInput = screen.getByDisplayValue('500000')
    fireEvent.change(priceInput, { target: { value: '0' } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(screen.getByText('This field must be a positive number')).toBeInTheDocument()
  })

  it('calls updateCurrentProperty when form is valid', () => {
    const mockUpdateCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: mockUpdateCurrentProperty,
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // Update a field
    const nameInput = screen.getByDisplayValue('Test Property')
    fireEvent.change(nameInput, { target: { value: 'Updated Property' } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(mockUpdateCurrentProperty).toHaveBeenCalledWith(1, expect.objectContaining({
      name: 'Updated Property',
    }))
  })

  it('allows image replacement', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // First remove the existing image to show the upload area
    const removeButton = screen.getByText('Remove Image')
    fireEvent.click(removeButton)

    // Now the upload area should be visible
    const fileInput = screen.getByLabelText(/Select an image/)
    const file = new File(['test'], 'new-image.jpg', { type: 'image/jpeg' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Should show remove button again
    expect(screen.getByText('Remove Image')).toBeInTheDocument()
  })

  it('allows image removal', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // Click remove button
    const removeButton = screen.getByText('Remove Image')
    fireEvent.click(removeButton)

    // Should show upload area
    expect(screen.getByText('Select an image')).toBeInTheDocument()
  })

  it('shows validation error for missing image after removal', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // Remove image
    const removeButton = screen.getByText('Remove Image')
    fireEvent.click(removeButton)

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(screen.getByText('Please select an image for the property')).toBeInTheDocument()
  })

  it('clears validation errors when user starts typing', () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(<EditPropertyPage params={mockParams} />)

    // Clear a field to trigger validation
    const nameInput = screen.getByDisplayValue('Test Property')
    fireEvent.change(nameInput, { target: { value: '' } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(screen.getByText('This field is required')).toBeInTheDocument()

    // Start typing again
    fireEvent.change(nameInput, { target: { value: 'Test' } })

    // Error should be cleared
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument()
  })
}) 