'use client'

interface PaginationComponentProps {
  currentPage: number
  totalPages: number
  onUpdatePagination: (page: number) => void
  className?: string
}

export default function PaginationComponent({ currentPage, totalPages, onUpdatePagination, className = '' }: PaginationComponentProps) {
  function goToPage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) {
      return
    }
    onUpdatePagination(newPage)
  }

  return (
    <nav className={`flex justify-center items-center space-x-2 mt-6 ${className}`}>
      {/* Previous Button */}
      <button
        className="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 shadow-sm"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-3 py-1 text-sm rounded border shadow-sm ${
            currentPage === page
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="px-3 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 shadow-sm"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  )
} 