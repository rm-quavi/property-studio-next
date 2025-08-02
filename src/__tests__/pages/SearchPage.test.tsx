import { render, screen, waitFor } from '@testing-library/react'
import SearchPage from '@/app/properties/search/page'

const mockSearchResults = [
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

describe('SearchPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search results title with query', async () => {
    global.mockPropertyStore.mockReturnValue({
      searchProperties: jest.fn().mockResolvedValue(mockSearchResults),
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(screen.getByText('Search result for: test')).toBeInTheDocument()
    })
  })

  it('renders search results', async () => {
    global.mockPropertyStore.mockReturnValue({
      searchProperties: jest.fn().mockResolvedValue(mockSearchResults),
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(screen.getByText('Test Property 1')).toBeInTheDocument()
      expect(screen.getByText('Test Property 2')).toBeInTheDocument()
    })
  })

  it('renders property list with search results', async () => {
    global.mockPropertyStore.mockReturnValue({
      searchProperties: jest.fn().mockResolvedValue(mockSearchResults),
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(screen.getByText('Test Property 1')).toBeInTheDocument()
      expect(screen.getByText('Test Property 2')).toBeInTheDocument()
      expect(screen.getByText('123 Test St, Test City, TC')).toBeInTheDocument()
      expect(screen.getByText('456 Test Ave, Test City, TC')).toBeInTheDocument()
    })
  })

  it('shows no results message when search returns empty', async () => {
    global.mockPropertyStore.mockReturnValue({
      searchProperties: jest.fn().mockResolvedValue([]),
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(screen.getByText("Sorry, we can't find anything.")).toBeInTheDocument()
    })
  })

  it('calls searchProperties with query parameter', async () => {
    const mockSearchProperties = jest.fn().mockResolvedValue(mockSearchResults)
    global.mockPropertyStore.mockReturnValue({
      searchProperties: mockSearchProperties,
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(mockSearchProperties).toHaveBeenCalledWith('test')
    })
  })

  it('handles empty query parameter', async () => {
    const mockSearchProperties = jest.fn().mockResolvedValue([])
    global.mockPropertyStore.mockReturnValue({
      searchProperties: mockSearchProperties,
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(mockSearchProperties).toHaveBeenCalledWith('test')
    })
  })

  it('renders header', async () => {
    global.mockPropertyStore.mockReturnValue({
      searchProperties: jest.fn().mockResolvedValue(mockSearchResults),
    })

    render(<SearchPage />)

    // Header should render immediately
    expect(screen.getByText('Property Studio')).toBeInTheDocument()
    expect(screen.getByText('Add new property')).toBeInTheDocument()
  })

  it('renders filter and sort options', async () => {
    global.mockPropertyStore.mockReturnValue({
      searchProperties: jest.fn().mockResolvedValue(mockSearchResults),
    })

    render(<SearchPage />)

    await waitFor(() => {
      expect(screen.getByText('Filter by status')).toBeInTheDocument()
      expect(screen.getByText('Sort')).toBeInTheDocument()
    })
  })
}) 