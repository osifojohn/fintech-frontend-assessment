import React from 'react';
import { useState } from 'react';
import { Transaction } from '../../../types';

export type TransactionType = 'all' | 'credit' | 'debit';
export type SortDirection = 'asc' | 'desc';

interface TransactionControlsProps {
  transactions: Transaction[];
  onFilteredTransactionsChange: (transactions: Transaction[]) => void;
  onSortChange: (field: string, direction: SortDirection) => void;
}

export const TransactionControls: React.FC<TransactionControlsProps> = ({
  transactions,
  onFilteredTransactionsChange,
  onSortChange,
}) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterType, setFilterType] = useState<TransactionType>('all');

  // sorting
  const handleSort = (field: string) => {
    const newDirection =
      field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    setSortField(field);
    onSortChange(field, newDirection);
  };

  // filtering
  const handleFilterChange = (newFilterType: TransactionType) => {
    setFilterType(newFilterType);
    const filteredTransactions = transactions.filter((transaction) =>
      newFilterType === 'all' ? true : transaction.type === newFilterType
    );
    onFilteredTransactionsChange(filteredTransactions);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <label className="text-sm text-gray-600">Filter by:</label>
        <select
          value={filterType}
          onChange={(e) =>
            handleFilterChange(e.target.value as TransactionType)
          }
          className="rounded-md border-gray-300 shadow-sm pr-4 py-2 bg-white "
        >
          <option value="all">All Transactions</option>
          <option value="credit">Credits Only</option>
          <option value="debit">Debits Only</option>
        </select>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortField}
            onChange={(e) => handleSort(e.target.value)}
            className="rounded-md border-gray-300  shadow-sm pr-4 py-2 bg-white"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
          <button
            onClick={() => handleSort(sortField)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
};
