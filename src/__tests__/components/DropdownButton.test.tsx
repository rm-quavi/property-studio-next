import { render, screen, fireEvent } from '@testing-library/react'
import DropdownButton from '@/components/shared/DropdownButton'

describe('DropdownButton', () => {
  const mockItems = ['Option 1', 'Option 2', 'Option 3']
  const mockOnItemSelect = jest.fn()

  beforeEach(() => {
    mockOnItemSelect.mockClear()
  })

  it('renders button with children content', () => {
    render(
      <DropdownButton items={mockItems} onItemSelect={mockOnItemSelect}>
        <span>Click me</span>
      </DropdownButton>
    )

    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('shows dropdown when button is clicked', () => {
    render(
      <DropdownButton items={mockItems} onItemSelect={mockOnItemSelect}>
        <span>Click me</span>
      </DropdownButton>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('hides dropdown when button is clicked again', () => {
    render(
      <DropdownButton items={mockItems} onItemSelect={mockOnItemSelect}>
        <span>Click me</span>
      </DropdownButton>
    )

    const button = screen.getByRole('button')
    
    // First click to open
    fireEvent.click(button)
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    
    // Second click to close
    fireEvent.click(button)
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('calls onItemSelect when an item is clicked', () => {
    render(
      <DropdownButton items={mockItems} onItemSelect={mockOnItemSelect}>
        <span>Click me</span>
      </DropdownButton>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const option2 = screen.getByText('Option 2')
    fireEvent.click(option2)

    expect(mockOnItemSelect).toHaveBeenCalledWith('Option 2')
  })

  it('closes dropdown after item selection', () => {
    render(
      <DropdownButton items={mockItems} onItemSelect={mockOnItemSelect}>
        <span>Click me</span>
      </DropdownButton>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const option1 = screen.getByText('Option 1')
    fireEvent.click(option1)

    expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(
      <DropdownButton items={mockItems} onItemSelect={mockOnItemSelect} className="custom-class">
        <span>Click me</span>
      </DropdownButton>
    )

    const container = screen.getByRole('button').parentElement
    expect(container).toHaveClass('custom-class')
  })
}) 