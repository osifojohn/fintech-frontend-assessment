import { TransactionTable } from '../../components/features/transactions/TransactionTable';
import { TransactionStats } from '../../components/features/transactions/TransactionStats';

const Transactions = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl mb-14 font-bold text-gray-900">
        Transaction History
      </h1>

      <div className="mb-14">
        <h2 className="text-xl  font-bold text-gray-900 mb-2">
          Transactions overview
        </h2>
        <TransactionStats />
      </div>

      <div>
        <h2 className="text-xl  font-bold text-gray-900 mb-4">
          All Transactions
        </h2>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Transactions;
