import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveClass(...classNames: string[]): R
      toHaveValue(value: string | number | string[]): R
      toBeDisabled(): R
      toHaveTextContent(text: string | RegExp): R
    }
  }

  var mockRouter: {
    push: jest.Mock
    replace: jest.Mock
    prefetch: jest.Mock
    back: jest.Mock
    forward: jest.Mock
    refresh: jest.Mock
  }

  var mockPropertyStore: jest.Mock
  var mockSearchParams: URLSearchParams
}

export {} 