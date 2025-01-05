import { UserAccountOverview } from '../../components/features/user/UserAccountOverview';
import { TransactionTable } from '../../components/features/transactions/TransactionTable';

export default function Dashboard() {
  return (
    <div className="max-w-7xl space-y-11 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl mb-14 font-bold text-gray-900">User Overview</h1>

      <div>
        <h2 className="text-xl  font-bold text-gray-900 mb-2">
          Account overview
        </h2>
        <UserAccountOverview />
      </div>

      <div>
        <h2 className="text-xl  font-bold text-gray-900 mb-4">
          Recent Transactions
        </h2>
        <TransactionTable />
      </div>
    </div>
  );
}
