import { render, screen, fireEvent } from '@testing-library/react'
import AddPropertyPage from '@/app/properties/add/page'

describe('AddPropertyPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders page title', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    // Check for both mobile and desktop titles
    const titles = screen.getAllByText('Add a new property')
    expect(titles.length).toBeGreaterThan(0)
  })

  it('renders all form fields', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Address/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Price/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument()
    // Check for status select by its options instead of label
    expect(screen.getByDisplayValue('Available')).toBeInTheDocument()
  })

  it('renders image upload area', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    expect(screen.getByText('Select an image')).toBeInTheDocument()
  })

  it('renders save button', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    expect(screen.getByText('Save Property')).toBeInTheDocument()
  })

  it('updates form fields when user types', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    const nameInput = screen.getByLabelText(/Name/)
    fireEvent.change(nameInput, { target: { value: 'Test Property' } })

    expect(nameInput).toHaveValue('Test Property')
  })

  it('shows validation errors for empty required fields', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    // Check that validation errors are present (multiple elements)
    const validationErrors = screen.getAllByText('This field is required')
    expect(validationErrors.length).toBeGreaterThan(0)
  })

  it('shows validation error for invalid price', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    const priceInput = screen.getByLabelText(/Price/)
    fireEvent.change(priceInput, { target: { value: '0' } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(screen.getByText('This field must be a positive number')).toBeInTheDocument()
  })

  it('shows validation error for missing image', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    // Fill in required fields
    const nameInput = screen.getByLabelText(/Name/)
    const addressInput = screen.getByLabelText(/Address/)
    const priceInput = screen.getByLabelText(/Price/)
    const descriptionInput = screen.getByLabelText(/Description/)

    fireEvent.change(nameInput, { target: { value: 'Test Property' } })
    fireEvent.change(addressInput, { target: { value: '123 Test St' } })
    fireEvent.change(priceInput, { target: { value: '500000' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(screen.getByText('Please select an image for the property')).toBeInTheDocument()
  })

  it('calls addNewProperty when form is valid', () => {
    const mockAddNewProperty = jest.fn()
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: mockAddNewProperty,
    })

    render(<AddPropertyPage />)

    // Fill in all required fields
    const nameInput = screen.getByLabelText(/Name/)
    const addressInput = screen.getByLabelText(/Address/)
    const priceInput = screen.getByLabelText(/Price/)
    const descriptionInput = screen.getByLabelText(/Description/)

    fireEvent.change(nameInput, { target: { value: 'Test Property' } })
    fireEvent.change(addressInput, { target: { value: '123 Test St' } })
    fireEvent.change(priceInput, { target: { value: '500000' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } })

    // Mock file upload
    const fileInput = screen.getByLabelText(/Select an image/)
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    expect(mockAddNewProperty).toHaveBeenCalled()
  })

  it('allows image removal', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    // Mock file upload first
    const fileInput = screen.getByLabelText(/Select an image/)
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    fireEvent.change(fileInput, { target: { files: [file] } })

    // Should show remove button
    expect(screen.getByText('Remove Image')).toBeInTheDocument()

    // Click remove button
    const removeButton = screen.getByText('Remove Image')
    fireEvent.click(removeButton)

    // Should show upload area again
    expect(screen.getByText('Select an image')).toBeInTheDocument()
  })

  it('clears validation errors when user starts typing', () => {
    global.mockPropertyStore.mockReturnValue({
      addNewProperty: jest.fn(),
    })

    render(<AddPropertyPage />)

    // Trigger validation error
    const saveButton = screen.getByText('Save Property')
    fireEvent.click(saveButton)

    // Check that validation errors are present
    const validationErrors = screen.getAllByText('This field is required')
    expect(validationErrors.length).toBeGreaterThan(0)

    // Start typing in name field
    const nameInput = screen.getByLabelText(/Name/)
    fireEvent.change(nameInput, { target: { value: 'Test' } })

    // The name field error should be cleared, but other field errors should remain
    // Check that there are still some validation errors (for other fields)
    const remainingErrors = screen.getAllByText('This field is required')
    expect(remainingErrors.length).toBeGreaterThan(0)
    
    // Verify that the name field no longer shows an error
    const nameField = nameInput.closest('div')
    expect(nameField).not.toHaveTextContent('This field is required')
  })
}) 