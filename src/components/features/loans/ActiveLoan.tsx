import { format } from 'date-fns';
import { useGetLoanHistoryQuery } from '../../../redux/api/apiSlice';
import { AlertCircle } from 'lucide-react';

export const LoadingShimmerBlock = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const ActiveLoan = () => {
  const {
    data: loans = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetLoanHistoryQuery();
  const activeLoan = loans.find((loan) => loan.status === 'active');

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col items-center justify-center py-6">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Unable to load active loan
          </h3>
          <p className="text-gray-500 text-center mb-4">
            There was a problem fetching your loan information
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Loan</h2>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <LoadingShimmerBlock className="h-4 w-24 mb-2" />
              <LoadingShimmerBlock className="h-8 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!activeLoan) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Active Loan</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No active loans</p>
          <p className="text-sm text-gray-400">
            Your active loan details will appear here when you have an ongoing
            loan
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Active Loan</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Outstanding Amount</p>
          <p className="text-2xl font-bold">
            ${activeLoan.amount.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Interest Rate</p>
          <p className="text-2xl font-bold">{activeLoan.interestRate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">End Date</p>
          <p className="font-medium">
            {format(new Date(activeLoan.endDate), 'MMM d, yyyy')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Purpose</p>
          <p className="font-medium">{activeLoan.purpose}</p>
        </div>
      </div>
    </div>
  );
};

export default ActiveLoan;
