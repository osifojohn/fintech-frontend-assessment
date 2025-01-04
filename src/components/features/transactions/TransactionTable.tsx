import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Transaction } from '../../../types';
import { LoadingShimmerBlock } from '../../LoadingShimmerBlock';
import { TransactionControls } from './TransactionControls';
import { useGetTransactionsQuery } from '../../../redux/api/apiSlice';
import { formatCurrencyToUSD, formatRelativeTime } from '../../../lib/utils';

interface TableHeaderProps {
  label: string;
  sortable?: boolean;
  field?: string;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  sortable,
  field,
  sortField,
  sortDirection,
  onSort,
}) => (
  <th
    onClick={() => {
      if (sortable && field) {
        const newDirection =
          field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
        onSort(field, newDirection);
      }
    }}
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
      sortable ? 'cursor-pointer hover:bg-gray-50' : ''
    }`}
  >
    <div className="flex items-center space-x-1">
      <span>{label}</span>
      {sortable && field && sortField === field && (
        <span className="text-gray-400">
          {sortDirection === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </div>
  </th>
);

const ShimmerRow: React.FC = () => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <LoadingShimmerBlock className="h-4 w-24" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <LoadingShimmerBlock className="h-4 w-40" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <LoadingShimmerBlock className="h-4 w-20" />
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <LoadingShimmerBlock className="h-6 w-16" />
    </td>
  </tr>
);

const EmptyState: React.FC = () => (
  <tr>
    <td colSpan={4} className="px-6 py-12">
      <div className="text-center">
        <p className="text-gray-500 text-lg mb-2">No transactions found</p>
        <p className="text-sm text-gray-400">
          Transactions will appear here once they are made
        </p>
      </div>
    </td>
  </tr>
);

const ErrorState: React.FC<{ onRefetch: () => void }> = ({ onRefetch }) => (
  <tr>
    <td colSpan={4} className="px-6 py-12">
      <div className="flex flex-col items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Unable to load transactions
        </h3>
        <p className="text-gray-500 text-center mb-4">
          There was a problem fetching your transaction history
        </p>
        <button
          onClick={onRefetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </td>
  </tr>
);

export const TransactionTable: React.FC = ({
  isMostRecentTransactions = false,
}: {
  isMostRecentTransactions?: boolean;
}) => {
  const {
    data: transactions = [],
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetTransactionsQuery();

  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (isMostRecentTransactions)
      setFilteredTransactions(transactions.slice(0, 10));
    else setFilteredTransactions(transactions);
  }, [transactions, isMostRecentTransactions]);

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortField === 'amount') {
      return sortDirection === 'asc'
        ? a.amount - b.amount
        : b.amount - a.amount;
    }
    if (sortField === 'type') {
      return sortDirection === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    }
    return 0;
  });

  return (
    <section>
      <div className="w-full flex justify-end mb-4">
        <TransactionControls
          transactions={transactions}
          onFilteredTransactionsChange={setFilteredTransactions}
          onSortChange={handleSort}
        />
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl  divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader
                  label="Date"
                  sortable
                  field="date"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Description"
                  sortable={false}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Amount"
                  sortable
                  field="amount"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
                <TableHeader
                  label="Type"
                  sortable
                  field="type"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {error ? (
                <ErrorState onRefetch={refetch} />
              ) : isLoading || isFetching ? (
                <>
                  <ShimmerRow />
                  <ShimmerRow />
                  <ShimmerRow />
                  <ShimmerRow />
                  <ShimmerRow />
                </>
              ) : !transactions.length ? (
                <EmptyState />
              ) : (
                sortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={
                          transaction.type === 'credit'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatCurrencyToUSD(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === 'credit'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
