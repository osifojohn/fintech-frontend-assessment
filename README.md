# Fintech Frontend Assessment

A modern fintech application built with React, TypeScript, and Redux Toolkit, focusing on loan management and transactions.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Approach](#approach)
- [Data Source](#data-source)

## Overview

This frontend application provides a comprehensive interface for managing loans, transactions, and user data with a focus on performance and user experience.

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Jest & Testing Library
- Vite

## Project Structure

```
├──coverage                   # test coverage report
├──public
src/
├── mocks/                      # Mock data and mock service implementations
│   └── fileMocks.ts           # File mock configurations for testing
├── tests/                      # Global test utilities and setup
│   └── test-utils.tsx         # Common test utilities and render helpers
├── assets/                     # Static assets (images, fonts, etc.)
├── components/                 # Reusable UI components
│   └── features/              # Feature-specific components
│       ├── loans/             # Loan management related components
│       │   ├── tests/         # Loan component tests
│       │   ├── ActiveLoans.tsx    # Displays active loan information
│       │   ├── LoanHistory.tsx    # Shows loan transaction history
│       │   └── LoanRequestForm.tsx # Form for new loan requests
│       ├── transactions/      # Transaction management components
│       │   ├── tests/         # Transaction component tests
│       │   ├── TransactionControls.tsx  # Transaction control buttons/actions
│       │   ├── TransactionData.tsx      # Transaction data display
│       │   └── TransactionTable.tsx     # Tabular view of transactions
│       └── user/              # User-related components
│           ├── tests/         # User component tests
│           └── UserAccountOverview.tsx # Account overview information
├── layouts/                    # Layout components and templates
│   └── dashboard/             # Dashboard-specific layout
│       ├── DashboardLayout.tsx # Main dashboard layout wrapper
│       ├── Header.tsx         # Dashboard header component
│       └── Sidebar.tsx        # Dashboard sidebar navigation
├── lib/                       # Core utilities and constants
│   ├── constants.ts          # Application constants
│   └── utils.ts              # Utility functions
├── pages/                     # Page components
│   ├── dashboard/            # Dashboard pages
│   │   └── index.tsx         # Main dashboard page
│   └── NotFound.tsx          # 404 error page
├── providers/                 # Context providers
├── redux/                     # Redux state management
│   ├── api/                  # API integration with Redux
│   │   └── apiSlice.ts      # RTK Query API definitions
│   ├── slices/              # Redux state slices
│   └── store.ts             # Redux store configuration
├── routes/                   # Route definitions and config
├── types/                    # TypeScript type definitions
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
└── vite-env.d.ts            # Vite environment type declarations
```

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/osifojohn/fintech-frontend-assessment.git
cd fintech-frontend-assessment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build       # Build for production (runs TypeScript build first)
npm run lint        # Run ESLint
npm run preview     # Preview production build
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

## Testing

The project uses Jest and React Testing Library for testing. Tests are co-located with their components in `tests` directories. To run tests:

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Approach

The application follows these key architectural and development principles:

1. **Component Organization**

   - Feature-based architecture for better scalability
   - Shared components for consistent UI/UX
   - Co-located tests with components

2. **State Management**

   - Redux Toolkit for global state
   - RTK Query for efficient data fetching and caching
   - Local state for component-specific data

3. **Code Quality**
   - TypeScript for type safety
   - Comprehensive test coverage
   - ESLint and Prettier for code consistency

## Data Source

The application utilizes [My JSON Server](https://my-json-server.typicode.com) (JSONPlaceholder) as a mock REST API for development and testing. Below are the relevant endpoints:

- **Database Endpoint**:  
  [`https://my-json-server.typicode.com/osifojohn/fintech-core-server/db`](https://my-json-server.typicode.com/osifojohn/fintech-core-server/db)

- **API Documentation**:  
  [`https://my-json-server.typicode.com/osifojohn/fintech-core-server`](https://my-json-server.typicode.com/osifojohn/fintech-core-server)

The mock API provides endpoints for:

- Transaction history
- Loan information
- Account details

## Key Features

- Dashboard
  - Account overview
  - Recent Transaction Table View
- Loan Management
  - Active Loans Overview
  - Loan History
  - Loan Request Form
- Transaction Management
  - Transaction Controls
  - Transaction Table View
  - Transaction Data Analysis

## Project Architecture

- Feature-based component organization
- Redux Toolkit for state management
- RTK Query for data fetching and caching
- Centralized routing configuration
- TypeScript for type safety
- Comprehensive test coverage
- Custom layouts for different views

## **Author**

[Osifo John](https://github.com/osifojohn)

Feel free to explore, contribute, or raise issues!
