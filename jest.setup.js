import '@testing-library/jest-dom'

// Mock Next.js router with controllable mock
const mockPush = jest.fn()
const mockReplace = jest.fn()
const mockPrefetch = jest.fn()
const mockBack = jest.fn()
const mockForward = jest.fn()
const mockRefresh = jest.fn()

// Mock useSearchParams with controllable mock
const mockSearchParams = new URLSearchParams('?query=test')

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
    back: mockBack,
    forward: mockForward,
    refresh: mockRefresh,
  }),
  useSearchParams: () => mockSearchParams,
  usePathname: () => '',
}))

// Mock property store with proper default implementation
const mockUsePropertyStore = jest.fn().mockReturnValue({
  properties: [],
  currentProperty: null,
  loading: false,
  fetchAllProperties: jest.fn(),
  fetchCurrentProperty: jest.fn(),
  searchProperties: jest.fn(),
  addNewProperty: jest.fn(),
  updateCurrentProperty: jest.fn(),
  removeProperty: jest.fn(),
  clearCurrentProperty: jest.fn(),
})

jest.mock('@/store/propertyStore', () => ({
  usePropertyStore: mockUsePropertyStore,
}))

// Export mocks for use in tests
global.mockRouter = {
  push: mockPush,
  replace: mockReplace,
  prefetch: mockPrefetch,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
}

global.mockPropertyStore = mockUsePropertyStore
global.mockSearchParams = mockSearchParams

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

// Mock Next.js Image component
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }) => {
    return <img src={src} alt={alt} {...props} />
  }
  MockImage.displayName = 'MockImage'
  return MockImage
})

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.URL.createObjectURL = jest.fn(() => 'mocked-url')
global.URL.revokeObjectURL = jest.fn() 