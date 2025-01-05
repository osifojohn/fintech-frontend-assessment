import { LoadingShimmerBlock } from '../../LoadingShimmerBlock';
import { formatCurrencyToUSD } from '../../../lib/utils';
import { useGetActiveLoansQuery } from '../../../redux/api/apiSlice';
import { format } from 'date-fns';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export const ActiveLoans = () => {
  const {
    data: activeLoans = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetActiveLoansQuery();

  const getLoanTypeColor = (loanType: string) => {
    const colors: { [key: string]: string } = {
      personal: 'bg-blue-100 text-blue-800',
      auto: 'bg-green-100 text-green-800',
      business: 'bg-purple-100 text-purple-800',
    };
    return colors[loanType] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading || isFetching) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Active Loans</h2>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <LoadingShimmerBlock className="h-6 w-1/3" />
                <LoadingShimmerBlock className="h-6 w-1/4" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <LoadingShimmerBlock className="h-10 w-full" />
                <LoadingShimmerBlock className="h-10 w-full" />
                <LoadingShimmerBlock className="h-6 w-3/4" />
                <LoadingShimmerBlock className="h-6 w-3/4" />
              </div>
              <LoadingShimmerBlock className="h-2.5 w-full rounded-full mt-4" />
              <LoadingShimmerBlock className="h-6 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Active Loans</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">
                There was a problem loading your active loans.
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!activeLoans.length) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Active Loans</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center justify-center h-48">
            <p className="text-gray-500 text-lg">No active loans found</p>
            <p className="text-gray-400 text-sm mt-2">
              Your active loans will appear here when you have any ongoing loans
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Active Loans</h2>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </button>
      </div>
      {activeLoans.map((loan) => (
        <div key={loan.id} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{loan.purpose}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getLoanTypeColor(
                  loan.loanType
                )}`}
              >
                {loan.loanType.charAt(0).toUpperCase() + loan.loanType.slice(1)}
              </span>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Outstanding Amount</p>
                <p className="text-2xl font-bold">
                  {formatCurrencyToUSD(loan.outstandingAmount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Loan Amount</p>
                <p className="text-2xl font-bold">
                  {formatCurrencyToUSD(loan.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest Rate</p>
                <p className="text-lg font-semibold">
                  {loan.interestRate}% APR
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="text-lg font-semibold">
                  {format(new Date(loan.endDate), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((loan.amount - loan.outstandingAmount) / loan.amount) * 100
                  }%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {formatCurrencyToUSD(loan.amount - loan.outstandingAmount)} paid
              of {formatCurrencyToUSD(loan.amount)}
            </p>
            {loan.paymentSchedule && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">Next Payment</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-medium">
                    {formatCurrencyToUSD(
                      loan.paymentSchedule.nextPaymentAmount
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due in {loan.paymentSchedule.daysUntilNextPayment} days
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
