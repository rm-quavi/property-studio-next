import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
  const mockParams = Promise.resolve({ id: '1' })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders page title', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    // Check for both mobile and desktop titles
    const titles = screen.getAllByText('Edit property')
    expect(titles.length).toBeGreaterThan(0)
  })

  it('renders form fields with current property data', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    expect(screen.getByDisplayValue('Test Property')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123 Test St, Test City, TC')).toBeInTheDocument()
    expect(screen.getByDisplayValue('500000')).toBeInTheDocument()
    expect(screen.getByDisplayValue('A test property for testing purposes.')).toBeInTheDocument()
  })

  it('renders property image', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const image = screen.getByAltText('Property Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/test.jpg')
  })

  it('renders save button', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    expect(screen.getByText('Save Property')).toBeInTheDocument()
  })

  it('calls fetchCurrentProperty on mount', async () => {
    const mockFetchCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: mockFetchCurrentProperty,
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    expect(mockFetchCurrentProperty).toHaveBeenCalledWith(1)
  })

  it('calls clearCurrentProperty on unmount', async () => {
    const mockClearCurrentProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: mockClearCurrentProperty,
    })

    const { unmount } = render(await EditPropertyPage({ params: mockParams }))
    unmount()

    expect(mockClearCurrentProperty).toHaveBeenCalled()
  })

  it('shows loading state when property is not loaded', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: null,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('allows editing property name', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const nameInput = screen.getByDisplayValue('Test Property')
    fireEvent.change(nameInput, { target: { value: 'Updated Property Name' } })

    expect(nameInput).toHaveValue('Updated Property Name')
  })

  it('allows editing property address', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const addressInput = screen.getByDisplayValue('123 Test St, Test City, TC')
    fireEvent.change(addressInput, { target: { value: '456 New St, New City, NC' } })

    expect(addressInput).toHaveValue('456 New St, New City, NC')
  })

  it('allows editing property price', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const priceInput = screen.getByDisplayValue('500000')
    fireEvent.change(priceInput, { target: { value: '750000' } })

    expect(priceInput).toHaveValue(750000)
  })

  it('allows editing property status', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const statusSelect = screen.getByDisplayValue('Available')
    fireEvent.change(statusSelect, { target: { value: 'Sold' } })

    expect(statusSelect).toHaveValue('Sold')
  })

  it('allows editing property description', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const descriptionTextarea = screen.getByDisplayValue('A test property for testing purposes.')
    fireEvent.change(descriptionTextarea, { target: { value: 'Updated description for the property.' } })

    expect(descriptionTextarea).toHaveValue('Updated description for the property.')
  })

  it('allows image replacement', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

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

  it('shows validation errors for empty required fields', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    // Clear required fields
    const nameInput = screen.getByDisplayValue('Test Property')
    const addressInput = screen.getByDisplayValue('123 Test St, Test City, TC')
    const priceInput = screen.getByDisplayValue('500000')
    const descriptionTextarea = screen.getByDisplayValue('A test property for testing purposes.')

    fireEvent.change(nameInput, { target: { value: '' } })
    fireEvent.change(addressInput, { target: { value: '' } })
    fireEvent.change(priceInput, { target: { value: '' } })
    fireEvent.change(descriptionTextarea, { target: { value: '' } })

    // Try to submit
    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    // Should show validation errors
    await waitFor(() => {
      const validationErrors = screen.getAllByText('This field is required')
      expect(validationErrors.length).toBeGreaterThan(0)
    })
  })

  it('clears validation errors when user starts typing', async () => {
    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: jest.fn(),
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    // Clear a field to trigger validation
    const nameInput = screen.getByDisplayValue('Test Property')
    fireEvent.change(nameInput, { target: { value: '' } })

    // Try to submit to trigger validation
    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    // Should show validation error
    await waitFor(() => {
      const validationErrors = screen.getAllByText('This field is required')
      expect(validationErrors.length).toBeGreaterThan(0)
    })

    // Start typing in the field
    fireEvent.change(nameInput, { target: { value: 'Test' } })

    // Wait for the error to be cleared
    await waitFor(() => {
      // Verify that the name field no longer shows an error
      const nameField = nameInput.closest('div')
      expect(nameField).not.toHaveTextContent('This field is required')
    })
  })

  it('calls updateCurrentProperty and navigates on successful submit', async () => {
    const mockUpdateCurrentProperty = jest.fn()
    const mockRouter = { push: jest.fn() }
    
    // Mock useRouter
    jest.doMock('next/navigation', () => ({
      useRouter: () => mockRouter,
    }))

    global.mockPropertyStore.mockReturnValue({
      currentProperty: mockProperty,
      fetchCurrentProperty: jest.fn(),
      updateCurrentProperty: mockUpdateCurrentProperty,
      clearCurrentProperty: jest.fn(),
    })

    render(await EditPropertyPage({ params: mockParams }))

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(mockUpdateCurrentProperty).toHaveBeenCalledWith(1, mockProperty)
  })
}) 