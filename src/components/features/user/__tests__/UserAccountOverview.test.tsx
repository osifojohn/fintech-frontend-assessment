import { render, screen, fireEvent } from '@testing-library/react';
import { useGetUserAccountOverviewQuery } from '@/redux/api/apiSlice';

import { UserAccountOverview } from '../UserAccountOverview';

jest.mock('../../../../redux/api/apiSlice');

jest.mock('../../../LoadingShimmerBlock', () => ({
  LoadingShimmerBlock: () => <div data-testid="loading-shimmer" />,
}));

describe('UserAccountOverview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when fetching data', () => {
    (useGetUserAccountOverviewQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
      error: null,
      data: null,
    });

    render(<UserAccountOverview />);

    expect(screen.getAllByTestId('loading-shimmer')).toHaveLength(4);
  });

  it('shows error state with retry button when API call fails', () => {
    const mockRefetch = jest.fn();

    (useGetUserAccountOverviewQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: { status: 500, data: 'Error fetching user' },
      refetch: mockRefetch,
    });

    render(<UserAccountOverview />);

    expect(
      screen.getByText('Unable to load account information')
    ).toBeInTheDocument();
    expect(
      screen.getByText('There was a problem fetching your account details')
    ).toBeInTheDocument();

    const retryButton = screen.getByText('Try Again');
    fireEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('displays user information when data is successfully loaded', () => {
    const mockUser = {
      name: 'John Doe',
      accountNumber: '1234567890',
      accountBalance: 50000,
    };

    (useGetUserAccountOverviewQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: mockUser,
    });

    render(<UserAccountOverview />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('$50,000')).toBeInTheDocument();
    expect(screen.getByText('Available Balance')).toBeInTheDocument();
  });

  it('shows loading state when refetching data', () => {
    (useGetUserAccountOverviewQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: true,
      error: null,
      data: null,
    });

    render(<UserAccountOverview />);

    expect(screen.getAllByTestId('loading-shimmer')).toHaveLength(4);
  });
});
