import React, { useState, useEffect } from 'react';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  transactions: Transaction[];
  onFilteredTransactionsChange: (transactions: Transaction[]) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
};

export const TransactionControls: React.FC<Props> = ({
  transactions,
  onFilteredTransactionsChange,
  onSortChange,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'debit'>(
    'all'
  );
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      if (filterType === 'all') return true;
      return transaction.type === filterType;
    });
    onFilteredTransactionsChange(filteredTransactions);
  }, [filterType, transactions, onFilteredTransactionsChange]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as 'all' | 'credit' | 'debit');
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortField = e.target.value as 'date' | 'amount';
    setSortField(newSortField);
    setSortDirection('asc');
    onSortChange(newSortField, 'asc');
  };

  const handleSortDirectionToggle = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onSortChange(sortField, newDirection);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <form className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <label
            htmlFor="filter-by"
            className="text-sm mb-1 md:mb-0 text-gray-600"
          >
            Filter by:
          </label>
          <select
            id="filter-by"
            value={filterType}
            onChange={handleFilterChange}
            className="rounded-md border-gray-300 shadow-sm pr-4 py-2 bg-white"
          >
            <option value="all">All Transactions</option>
            <option value="credit">Credits Only</option>
            <option value="debit">Debits Only</option>
          </select>
        </form>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
          <label
            htmlFor="sort-by"
            className="text-sm mb-1 md:mb-0 text-gray-600"
          >
            Sort by:
          </label>
          <div className="flex items-center space-x-1">
            <select
              id="sort-by"
              value={sortField}
              onChange={handleSortFieldChange}
              className="rounded-md border-gray-300 shadow-sm pr-4 py-2 bg-white"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <button
              onClick={handleSortDirectionToggle}
              className="p-2 rounded-md hover:bg-gray-100"
              aria-label={`Sort ${
                sortDirection === 'asc' ? 'descending' : 'ascending'
              }`}
            >
              {sortDirection === 'asc' ? '🔼' : '🔽'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
