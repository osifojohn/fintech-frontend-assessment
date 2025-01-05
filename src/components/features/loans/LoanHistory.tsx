import { format } from 'date-fns';
import { useGetLoanHistoryQuery } from '../../../redux/api/apiSlice';
import { AlertCircle } from 'lucide-react';
import { LoadingShimmerBlock } from '../../LoadingShimmerBlock';

export const LoanHistory = () => {
  const {
    data: loans = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetLoanHistoryQuery();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center py-6">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Unable to load loan history
          </h3>
          <p className="text-gray-500 text-center mb-4">
            There was a problem fetching your loan history
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
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Loan History</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <LoadingShimmerBlock className="h-5 w-32" />
                  <LoadingShimmerBlock className="h-4 w-40" />
                </div>
                <div className="text-right space-y-2">
                  <LoadingShimmerBlock className="h-6 w-20 ml-auto" />
                  <LoadingShimmerBlock className="h-4 w-24 ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loans.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Loan History</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No loan history found</p>
          <p className="text-sm text-gray-400">
            When you take out a loan, it will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Loan History</h2>
      <div className="space-y-4">
        {loans.map((loan) => (
          <div key={loan.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  Amount: ${loan.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Purpose: {loan.purpose}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    loan.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : loan.status === 'completed'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {loan.status}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {format(new Date(loan.startDate), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanHistory;
