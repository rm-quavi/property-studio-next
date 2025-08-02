import { render, screen, fireEvent } from '@testing-library/react'
import PaginationComponent from '@/components/shared/PaginationComponent'

describe('PaginationComponent', () => {
  const mockOnUpdatePagination = jest.fn()

  beforeEach(() => {
    mockOnUpdatePagination.mockClear()
  })

  it('renders pagination with correct number of pages', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders Previous and Next buttons', () => {
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('calls onUpdatePagination when page number is clicked', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    const page2Button = screen.getByText('2')
    fireEvent.click(page2Button)

    expect(mockOnUpdatePagination).toHaveBeenCalledWith(2)
  })

  it('calls onUpdatePagination when Previous button is clicked', () => {
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    const previousButton = screen.getByText('Previous')
    fireEvent.click(previousButton)

    expect(mockOnUpdatePagination).toHaveBeenCalledWith(1)
  })

  it('calls onUpdatePagination when Next button is clicked', () => {
    render(
      <PaginationComponent
        currentPage={2}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    expect(mockOnUpdatePagination).toHaveBeenCalledWith(3)
  })

  it('disables Previous button on first page', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    const previousButton = screen.getByText('Previous')
    expect(previousButton).toBeDisabled()
  })

  it('disables Next button on last page', () => {
    render(
      <PaginationComponent
        currentPage={3}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('does not call onUpdatePagination when clicking disabled buttons', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
      />
    )

    const previousButton = screen.getByText('Previous')
    fireEvent.click(previousButton)

    expect(mockOnUpdatePagination).not.toHaveBeenCalled()
  })

  it('applies custom className when provided', () => {
    render(
      <PaginationComponent
        currentPage={1}
        totalPages={3}
        onUpdatePagination={mockOnUpdatePagination}
        className="custom-pagination"
      />
    )

    const nav = screen.getByRole('navigation')
    expect(nav.className).toContain('custom-pagination')
  })
}) 