import { render, screen } from '@testing-library/react'
import PropertyItem from '@/components/property/PropertyItem'

const mockProperty = {
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
}

describe('PropertyItem', () => {
  it('renders property information correctly', () => {
    render(<PropertyItem property={mockProperty} />)

    // Check if property name is displayed
    expect(screen.getByText('Test Property 1')).toBeInTheDocument()

    // Check if address is displayed
    expect(screen.getByText('123 Test St, Test City, TC')).toBeInTheDocument()

    // Check if price is formatted and displayed
    expect(screen.getByText('$500,000')).toBeInTheDocument()

    // Check if status is displayed
    expect(screen.getByText('Available')).toBeInTheDocument()

    // Check if image is rendered
    const image = screen.getByAltText('Property Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/test1.jpg')
  })

  it('renders as a link with correct href', () => {
    render(<PropertyItem property={mockProperty} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/properties/1')
  })

  it('applies correct CSS classes', () => {
    render(<PropertyItem property={mockProperty} />)

    const link = screen.getByRole('link')
    expect(link).toHaveClass('bg-white', 'shadow-md', 'rounded-xl', 'overflow-hidden', 'flex', 'flex-col')
  })

  it('displays status indicator with correct styling', () => {
    render(<PropertyItem property={mockProperty} />)

    const statusContainer = screen.getByText('Available').closest('div')
    expect(statusContainer).toHaveClass('px-3', 'py-1', 'text-xs', 'bg-white/80', 'absolute', 'top-2', 'right-2', 'rounded-full', 'flex')
  })

  it('handles different property statuses', () => {
    const soldProperty = { ...mockProperty, status: 'Sold' as const }
    render(<PropertyItem property={soldProperty} />)

    expect(screen.getByText('Sold')).toBeInTheDocument()
  })
}) 