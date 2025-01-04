import { TransactionTable } from '../../components/features/transactions/TransactionTable';
import { TransactionStats } from '../../components/features/transactions/TransactionStats';

const Transactions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
      <TransactionStats />
      <TransactionTable />
    </div>
  );
};

export default Transactions;
