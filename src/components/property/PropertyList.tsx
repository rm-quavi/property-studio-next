'use client'

import { useState, useMemo, ReactNode } from 'react'
import { Funnel } from 'lucide-react'
import DropdownButton from '@/components/shared/DropdownButton'
import type { Property } from '@/types/Property'
import PropertyItem from './PropertyItem'
import PaginationComponent from '@/components/shared/PaginationComponent'

interface PropertyListProps {
  properties: Property[]
  children?: ReactNode
}

export default function PropertyList({ properties, children }: PropertyListProps) {
  // Filtering logic
  const filterOptions = ['All', 'Available', 'Sold', 'Under Contract']
  const [propertyFilter, setPropertyFilter] = useState('All')

  const handleFilterSelect = (selectedFilter: string) => {
    setPropertyFilter(selectedFilter)
    setCurrentPage(1)
  }

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      if (property.isDeleted) return false
      if (propertyFilter === 'All') return true
      return property.status === propertyFilter
    })
  }, [properties, propertyFilter])

  // Sorting logic
  const sortOptions = ['None', 'Price: Low to High', 'Price: High to Low']
  const [sortOrder, setSortOrder] = useState('None')

  const handleSortSelect = (selectedSort: string) => {
    setSortOrder(selectedSort)
    setCurrentPage(1)
  }

  const sortedProperties = useMemo(() => {
    if (sortOrder === 'Price: Low to High') {
      return [...filteredProperties].sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'Price: High to Low') {
      return [...filteredProperties].sort((a, b) => b.price - a.price)
    }
    return filteredProperties
  }, [filteredProperties, sortOrder])

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage)

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return sortedProperties.slice(start, start + itemsPerPage)
  }, [sortedProperties, currentPage])

  const handlePaginationUpdate = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="px-4 pt-4 my-2 items-center flex">
        {children}
        <div className="grow"></div>
        <div className="flex flex-col items-end md:flex-row">
          {/* Filter dropdown button */}
          <DropdownButton
            items={filterOptions}
            onItemSelect={handleFilterSelect}
            className="md:mr-4 mb-3 md:mb-0"
          >
            <Funnel className="h-4 w-4 mr-2" />
            <span>Filter by status</span>
          </DropdownButton>

          {/* Sort dropdown button */}
          <DropdownButton items={sortOptions} onItemSelect={handleSortSelect}>
            <Funnel className="h-4 w-4 mr-2" />
            <span>Sort</span>
          </DropdownButton>
        </div>
      </div>
      {/* Property items list */}
      <div className="property-list grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] justify-center gap-6 p-4">
        {paginatedProperties.map((property) => (
          <PropertyItem key={property.id} property={property} />
        ))}
      </div>
      {/* Pagination */}
      {sortedProperties.length > 10 && (
        <PaginationComponent
          className="my-6"
          currentPage={currentPage}
          totalPages={totalPages}
          onUpdatePagination={handlePaginationUpdate}
        />
      )}
    </div>
  )
} 