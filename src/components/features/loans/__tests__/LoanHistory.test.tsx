import { render, screen, fireEvent } from '@testing-library/react';
import { LoanHistory } from '../LoanHistory';
import { useGetLoanHistoryQuery } from '../../../../redux/api/apiSlice';

jest.mock('../../../../redux/api/apiSlice', () => ({
  useGetLoanHistoryQuery: jest.fn(),
}));

const mockRefetch = jest.fn();

describe('LoanHistory Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading shimmer UI during loading state', () => {
    (useGetLoanHistoryQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });
    const { container } = render(<LoanHistory />);

    const titleElement = container.querySelector('h2');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Loan History');

    const shimmerBlocks = container.querySelectorAll('.animate-pulse');
    expect(shimmerBlocks).toHaveLength(12); // 3 shimmer groups, 2 shimmer blocks each for 2 for a array with two objects
  });

  test('renders error state', () => {
    (useGetLoanHistoryQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: { message: 'Failed to fetch' },
      refetch: mockRefetch,
    });

    render(<LoanHistory />);

    expect(screen.getByText('Unable to load loan history')).toBeInTheDocument();
    expect(
      screen.getByText('There was a problem fetching your loan history')
    ).toBeInTheDocument();

    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test('renders empty state', () => {
    (useGetLoanHistoryQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<LoanHistory />);

    expect(screen.getByText('Loan History')).toBeInTheDocument();
    expect(screen.getByText('No loan history found')).toBeInTheDocument();
    expect(
      screen.getByText('When you take out a loan, it will appear here')
    ).toBeInTheDocument();
  });

  test('renders loan history', () => {
    const mockLoans = [
      {
        id: 1,
        amount: 5000,
        purpose: 'Car Loan',
        status: 'active',
        startDate: '2025-01-01',
      },
      {
        id: 2,
        amount: 2000,
        purpose: 'Business Loan',
        status: 'completed',
        startDate: '2023-06-15',
      },
    ];

    (useGetLoanHistoryQuery as jest.Mock).mockReturnValue({
      data: mockLoans,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<LoanHistory />);

    expect(screen.getByText('Loan History')).toBeInTheDocument();
    expect(screen.getByText('Amount: $5,000')).toBeInTheDocument();
    expect(screen.getByText('Purpose: Car Loan')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2025')).toBeInTheDocument();

    expect(screen.getByText('Amount: $2,000')).toBeInTheDocument();
    expect(screen.getByText('Purpose: Business Loan')).toBeInTheDocument();
    expect(screen.getByText('completed')).toBeInTheDocument();
    expect(screen.getByText('Jun 15, 2023')).toBeInTheDocument();
  });
});
