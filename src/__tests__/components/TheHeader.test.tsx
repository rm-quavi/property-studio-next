import { render, screen, fireEvent } from '@testing-library/react'
import TheHeader from '@/components/TheHeader'

describe('TheHeader', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders logo and title', () => {
    render(<TheHeader />)

    expect(screen.getByAltText('Property Studio logo')).toBeInTheDocument()
    expect(screen.getByText('Property Studio')).toBeInTheDocument()
  })

  it('renders search input', () => {
    render(<TheHeader />)

    const searchInput = screen.getByPlaceholderText('Search property..')
    expect(searchInput).toBeInTheDocument()
  })

  it('renders add property button', () => {
    render(<TheHeader />)

    const addButton = screen.getByText('Add new property')
    expect(addButton).toBeInTheDocument()
    expect(addButton).toHaveAttribute('href', '/properties/add')
  })

  it('updates search query when typing', () => {
    render(<TheHeader />)

    const searchInput = screen.getByPlaceholderText('Search property..')
    fireEvent.change(searchInput, { target: { value: 'test search' } })

    expect(searchInput).toHaveValue('test search')
  })

  it('renders home link with correct href', () => {
    render(<TheHeader />)

    const homeLink = screen.getByText('Property Studio').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })
}) 