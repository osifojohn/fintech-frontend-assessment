import React from 'react';
import { Transaction } from '../../../types';
import { LoadingShimmerBlock } from '../../LoadingShimmerBlock';

interface TransactionStatsProps {
  transactions: Transaction[];
  loading?: boolean;
  error?: unknown;
}

const StatCard: React.FC<{
  title: string;
  amount: number;
  colorClass: string;
  loading?: boolean;
}> = ({ title, amount, colorClass, loading }) => (
  <div className="bg-white rounded-lg shadow p-6">
    {loading ? (
      <div className="space-y-3">
        <LoadingShimmerBlock className="h-4 w-24" />
        <LoadingShimmerBlock className=" h-8 w-32" />
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

export const TransactionStats: React.FC<TransactionStatsProps> = ({
  transactions,
  loading = false,
  error,
}) => {
  const stats = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'credit') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading transaction statistics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Income"
        amount={stats.totalIncome}
        colorClass="text-green-600"
        loading={loading}
      />
      <StatCard
        title="Total Expenses"
        amount={stats.totalExpenses}
        colorClass="text-red-600"
        loading={loading}
      />
      <StatCard
        title="Net Balance"
        amount={stats.totalIncome - stats.totalExpenses}
        colorClass="text-blue-600"
        loading={loading}
      />
    </div>
  );
};
