import { render, screen, fireEvent, within } from '@testing-library/react';
import { TransactionTable } from '../TransactionTable';
import {
  useGetTransactionsQuery,
  useGetTransactionStatsQuery,
} from '../../../../redux/api/apiSlice';
import { formatCurrencyToUSD, formatRelativeTime } from '../../../../lib/utils';
import { TransactionStats } from '../TransactionStats';

jest.mock('../../../../redux/api/apiSlice');
jest.mock('../../../../lib/utils');

const mockTransactions = [
  {
    id: '1',
    date: '2024-01-01T10:00:00Z',
    description: 'Coffee Shop',
    amount: 5.99,
    type: 'debit',
  },
  {
    id: '2',
    date: '2024-01-02T15:30:00Z',
    description: 'Salary Deposit',
    amount: 2500.0,
    type: 'credit',
  },
];

describe('TransactionTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (formatCurrencyToUSD as jest.Mock).mockImplementation(
      (amount) => `$${amount}`
    );
    (formatRelativeTime as jest.Mock).mockImplementation((date) => date);
  });

  it('renders loading state correctly', () => {
    (useGetTransactionStatsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { container } = render(<TransactionStats />);

    const shimmerElements = container.querySelectorAll('.animate-pulse');

    expect(shimmerElements).toHaveLength(6); // 3 cards × 2 shimmer blocks each
  });

  it('renders empty state when no transactions', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: [],
      error: null,
    });

    render(<TransactionTable />);

    expect(screen.getByText('No transactions found')).toBeInTheDocument();
    expect(
      screen.getByText('Transactions will appear here once they are made')
    ).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const mockRefetch = jest.fn();
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: [],
      error: new Error('Failed to fetch'),
      refetch: mockRefetch,
    });

    render(<TransactionTable />);

    expect(screen.getByText('Unable to load transactions')).toBeInTheDocument();

    // Test retry functionality
    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders transactions correctly', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: mockTransactions,
      error: null,
    });

    render(<TransactionTable />);

    mockTransactions.forEach((transaction) => {
      expect(screen.getByText(transaction.description)).toBeInTheDocument();
      expect(screen.getByText(transaction.type)).toBeInTheDocument();
    });
  });

  it('handles sorting correctly', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: mockTransactions,
      error: null,
    });

    render(<TransactionTable />);

    // Find the Date header by role and name
    const headers = screen.getAllByRole('columnheader');
    const dateHeader = headers.find((header) =>
      within(header).getByText('Date')
    );
    expect(dateHeader).toBeTruthy();

    // Click the header to sort
    fireEvent.click(dateHeader!);

    // Verify sort indicator
    const sortIndicator = within(dateHeader!).getByText('↑');
    expect(sortIndicator).toBeInTheDocument();

    // Click again to reverse sort
    fireEvent.click(dateHeader!);
    const reverseSortIndicator = within(dateHeader!).getByText('↓');
    expect(reverseSortIndicator).toBeInTheDocument();
  });

  it('applies correct styling for credit and debit transactions', () => {
    (useGetTransactionsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: mockTransactions,
      error: null,
    });

    render(<TransactionTable />);

    // Check for credit styling
    const creditTransaction = mockTransactions.find(
      (t) => t.type === 'credit'
    )!;
    const creditElement = screen.getByText(creditTransaction.type);
    expect(creditElement).toHaveClass('bg-green-100', 'text-green-800');

    // Check for debit styling
    const debitTransaction = mockTransactions.find((t) => t.type === 'debit')!;
    const debitElement = screen.getByText(debitTransaction.type);
    expect(debitElement).toHaveClass('bg-red-100', 'text-red-800');
  });
});
