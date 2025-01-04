import { useState, useEffect } from 'react';
import { useGetTransactionsQuery } from '../../redux/api/apiSlice';
import { TransactionTable } from '../../components/features/transactions/TransactionTable';
import { TransactionControls } from '../../components/features/transactions/TransactionControls';
import { TransactionStats } from '../../components/features/transactions/TransactionStats';

const Transactions = () => {
  const {
    data: transactions = [],
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetTransactionsQuery();
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>

      <div className="w-full flex justify-end">
        <TransactionControls
          transactions={transactions}
          onFilteredTransactionsChange={setFilteredTransactions}
          onSortChange={handleSort}
        />
      </div>

      <TransactionStats
        transactions={filteredTransactions}
        loading={isLoading}
        error={error}
      />

      <TransactionTable
        transactions={filteredTransactions}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        loading={isLoading}
        error={error}
        onRefetch={refetch}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Transactions;
