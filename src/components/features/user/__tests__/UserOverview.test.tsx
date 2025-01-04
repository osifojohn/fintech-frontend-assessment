import { render, screen, fireEvent } from '@testing-library/react';
import { useGetUserQuery } from '@/redux/api/apiSlice';

import { UserOverview } from '../UserOverview';

jest.mock('../../../../redux/api/apiSlice');

jest.mock('../../../LoadingShimmerBlock', () => ({
  LoadingShimmerBlock: () => <div data-testid="loading-shimmer" />,
}));

describe('UserOverview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when fetching data', () => {
    (useGetUserQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: false,
      error: null,
      data: null,
    });

    render(<UserOverview />);

    expect(screen.getAllByTestId('loading-shimmer')).toHaveLength(4);
  });

  it('shows error state with retry button when API call fails', () => {
    const mockRefetch = jest.fn();

    (useGetUserQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: { status: 500, data: 'Error fetching user' },
      refetch: mockRefetch,
    });

    render(<UserOverview />);

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

    // Mock the hook to return success state with data
    (useGetUserQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      error: null,
      data: mockUser,
    });

    render(<UserOverview />);

    // Verify user information is displayed correctly
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('$50,000')).toBeInTheDocument();
    expect(screen.getByText('Available Balance')).toBeInTheDocument();
  });

  it('shows loading state when refetching data', () => {
    // Mock the hook to return fetching state
    (useGetUserQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: true,
      error: null,
      data: null,
    });

    render(<UserOverview />);

    // Verify loading shimmer blocks are displayed
    expect(screen.getAllByTestId('loading-shimmer')).toHaveLength(4);
  });
});
