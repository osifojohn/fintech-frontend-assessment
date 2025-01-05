import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TransactionStats } from '../TransactionStats';
import { useGetTransactionStatsQuery } from '../../../../redux/api/apiSlice';

jest.mock('../../../../redux/api/apiSlice', () => ({
  useGetTransactionStatsQuery: jest.fn(),
}));

describe('TransactionStats Component', () => {
  it('renders loading state correctly', () => {
    (useGetTransactionStatsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    const { container } = render(<TransactionStats />);

    const shimmerElements = container.querySelectorAll('.animate-pulse');

    expect(shimmerElements).toHaveLength(3); // 3 cards × 1 shimmer blocks each;
  });

  it('renders error state correctly', () => {
    const mockRefetch = jest.fn();

    (useGetTransactionStatsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { status: 500 },
      refetch: mockRefetch,
    });

    render(<TransactionStats />);

    // Assert error message and retry button
    expect(
      screen.getByText(/unable to load transaction stats/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();

    //  retry simulation
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('renders StatCards with fetched data correctly', () => {
    (useGetTransactionStatsQuery as jest.Mock).mockReturnValue({
      data: {
        totalIncome: 5000,
        totalExpenses: 2000,
        netBalance: 3000,
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<TransactionStats />);

    // Assert data is rendered correctly
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('$5,000')).toBeInTheDocument();

    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('$2,000')).toBeInTheDocument();

    expect(screen.getByText('Net Balance')).toBeInTheDocument();
    expect(screen.getByText('$3,000')).toBeInTheDocument();
  });
});
