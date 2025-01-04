import { UserOverview } from '../../components/features/user/UserOverview';
import { TransactionTable } from '../../components/features/transactions/TransactionTable';

export default function Dashboard() {
  return (
    <div className="max-w-7xl space-y-11 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div>
        <h2 className="text-2xl  font-bold text-gray-900 mb-2">
          Account overview
        </h2>
        <UserOverview />
      </div>

      <div>
        <h2 className="text-2xl  font-bold text-gray-900 mb-4">
          Recent Transactions
        </h2>
        <TransactionTable />
      </div>
    </div>
  );
}
