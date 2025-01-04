import { useEffect, useState } from 'react';
import { useGetTransactionsQuery } from '../../redux/api/apiSlice';
import { UserOverview } from '../../components/features/user/UserOverview';
import { TransactionTable } from '../../components/features/transactions/TransactionTable';
import { TransactionControls } from '../../components/features/transactions/TransactionControls';

export default function Dashboard() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <UserOverview />
      <div className="mt-8">
        <div className="w-full flex justify-end">
          <TransactionControls
            transactions={transactions}
            onFilteredTransactionsChange={setFilteredTransactions}
            onSortChange={handleSort}
          />
        </div>

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
    </div>
  );
}
