import { render, screen, fireEvent } from '@testing-library/react';
import { ActiveLoans } from '../ActiveLoans';
import { useGetActiveLoansQuery } from '../../../../redux/api/apiSlice';

jest.mock('../../../../redux/api/apiSlice', () => ({
  useGetActiveLoansQuery: jest.fn(),
}));

const mockRefetch = jest.fn();

describe('ActiveLoans Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state with shimmer blocks', () => {
    (useGetActiveLoansQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    const { container } = render(<ActiveLoans />);

    expect(screen.getByText('Active Loans')).toBeInTheDocument();

    const shimmerElements = container.querySelectorAll('.animate-pulse');
    expect(shimmerElements).toHaveLength(16);
  });

  test('renders error state', async () => {
    (useGetActiveLoansQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: { message: 'Failed to fetch' },
      refetch: mockRefetch,
    });

    render(<ActiveLoans />);

    expect(screen.getByText('Active Loans')).toBeInTheDocument();
    expect(
      screen.getByText('There was a problem loading your active loans.')
    ).toBeInTheDocument();

    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  test('renders empty state', () => {
    (useGetActiveLoansQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ActiveLoans />);

    expect(screen.getByText('Active Loans')).toBeInTheDocument();
    expect(screen.getByText('No active loans found')).toBeInTheDocument();
  });

  test('renders active loans', async () => {
    const mockLoans = [
      {
        id: 1,
        purpose: 'Car Loan',
        loanType: 'auto',
        outstandingAmount: 5000,
        amount: 10000,
        interestRate: 5,
        endDate: '2025-12-31',
        paymentSchedule: {
          nextPaymentAmount: 1000,
          daysUntilNextPayment: 15,
        },
      },
    ];

    (useGetActiveLoansQuery as jest.Mock).mockReturnValue({
      data: mockLoans,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ActiveLoans />);

    expect(screen.getByText('Active Loans')).toBeInTheDocument();
    expect(screen.getByText('Car Loan')).toBeInTheDocument();
    expect(screen.getByText('Outstanding Amount')).toBeInTheDocument();
    expect(screen.getByText('$5,000.00')).toBeInTheDocument();
    expect(screen.getByText('$10,000.00')).toBeInTheDocument();
    expect(screen.getByText('5% APR')).toBeInTheDocument();
    expect(screen.getByText('Dec 31, 2025')).toBeInTheDocument();
    expect(screen.getByText('Next Payment')).toBeInTheDocument();
    expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    expect(screen.getByText('Due in 15 days')).toBeInTheDocument();
  });

  test('calls refetch on refresh button click', () => {
    const mockLoans = [
      {
        id: 1,
        purpose: 'Business Loan',
        loanType: 'business',
        outstandingAmount: 2000,
        amount: 5000,
        interestRate: 10,
        endDate: '2025-11-30',
      },
    ];

    (useGetActiveLoansQuery as jest.Mock).mockReturnValue({
      data: mockLoans,
      isLoading: false,
      isFetching: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<ActiveLoans />);

    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);

    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });
});
