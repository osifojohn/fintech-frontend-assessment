import React from 'react';
import { LoadingShimmerBlock } from '../../LoadingShimmerBlock';
import { useGetTransactionStatsQuery } from '../../../redux/api/apiSlice';
import { AlertCircle } from 'lucide-react';

const StatCard: React.FC<{
  title: string;
  amount: number;
  colorClass: string;
  loading?: boolean;
}> = ({ title, amount, colorClass, loading }) => (
  <div className="bg-white rounded-lg shadow p-6">
    {loading ? (
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <LoadingShimmerBlock className="h-8 w-32" />
      </div>
    ) : (
      <>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className={`mt-2 text-3xl font-bold ${colorClass}`}>
          ${amount.toLocaleString()}
        </p>
      </>
    )}
  </div>
);

export const TransactionStats: React.FC = () => {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
  } = useGetTransactionStatsQuery();

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center justify-center py-6">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Unable to load transaction stats
          </h3>
          <p className="text-gray-500 text-center mb-4">
            There was a problem fetching your transaction stats history
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Income"
        amount={stats?.totalIncome ?? 0}
        colorClass="text-green-600"
        loading={isLoading}
      />
      <StatCard
        title="Total Expenses"
        amount={stats?.totalExpenses ?? 0}
        colorClass="text-red-600"
        loading={isLoading}
      />
      <StatCard
        title="Net Balance"
        amount={stats?.netBalance ?? 0}
        colorClass="text-blue-600"
        loading={isLoading}
      />
    </div>
  );
};
