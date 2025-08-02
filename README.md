# Property Studio

Property Studio is a Property Listings Management Dashboard for a real estate CRM made with Next.js, TypeScript, TailwindCSS, and Zustand.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Start Production Server

```sh
npm start
```

### Lint with ESLint

```sh
npm run lint
```

### Format with Prettier

```sh
npm run format
```

## Testing

The application includes comprehensive testing using Jest and React Testing Library.

### Run Tests

```sh
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm test -- --testPathPatterns="PropertyItem|PropertyList"
```

### Test Coverage

The test suite includes **85 tests** covering:

- ✅ **Utility Functions** (2 tests) - Price formatting and status color helpers
- ✅ **Components** (33 tests) - All UI components with full functionality
- 🔄 **Page Tests** (50 tests) - Page components (some configuration issues being resolved)
- ✅ **Form Validation** - Required fields, data types, file uploads
- ✅ **User Interactions** - Click events, form inputs, state changes
- ✅ **Data Management** - CRUD operations, filtering, sorting, pagination
- 🔄 **Search Functionality** - Query processing and results display

### Current Test Status

**✅ Working Tests: 37/85 (43.5%)**
- All utility function tests (2/2) ✅
- All component tests (33/33) ✅
- Some page tests (2/50) 🔄

**🔄 Issues Being Resolved:**
- HomePage tests: Global mock configuration
- SearchPage tests: Search results rendering and query handling

### Test Structure

```
src/__tests__/
├── components/           # Component tests (33 tests)
│   ├── PropertyItem.test.tsx
│   ├── PropertyList.test.tsx
│   ├── TheHeader.test.tsx
│   ├── DropdownButton.test.tsx
│   └── PaginationComponent.test.tsx
├── pages/               # Page component tests (50 tests)
│   ├── HomePage.test.tsx
│   ├── PropertyDetailPage.test.tsx
│   ├── AddPropertyPage.test.tsx
│   ├── EditPropertyPage.test.tsx
│   └── SearchPage.test.tsx
└── utils/               # Utility function tests (2 tests)
    └── helpers.test.ts
```

For detailed testing documentation, see [TESTING.md](./TESTING.md).

## Project Structure

Below are the folders inside the src

- `app/` – Next.js app router pages and layouts
- `components/` – Reusable React components used throughout the application
- `data/` – Mock data used for development or testing purposes
- `services/` – Mock API service functions simulating backend calls
- `store/` – Zustand store modules for managing application state
- `types/` – TypeScript interfaces and types for consistent data structures
- `utils/` – Utility functions and helper methods

## Features

- Property listing with filtering and sorting
- Property detail view
- Add new properties
- Edit existing properties
- Delete properties
- Search functionality
- Responsive design
- Form validation
- Modern UI with Tailwind CSS
- **Comprehensive testing suite**

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Font**: Montserrat
- **Testing**: Jest + React Testing Library

## Routing

- `/` - Home page with property listings
- `/properties/[id]` - Property detail page
- `/properties/add` - Add new property page
- `/properties/[id]/edit` - Edit property page
- `/properties/search` - Search results page

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) with the following extensions:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## Customize configuration

See [Next.js Configuration Reference](https://nextjs.org/docs/app/api-reference/file-conventions).
