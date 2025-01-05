import LoanRequestForm from '../../components/features/loans/LoanRequestForm';
import { ActiveLoans } from '../../components/features/loans/ActiveLoans';
import { LoanHistory } from '../../components/features/loans/LoanHistory';

const Loans = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-14">
          <h1 className="text-2xl font-bold text-gray-900">Loan Management</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ActiveLoans />
            <LoanHistory />
          </div>

          <div className="space-y-6">
            <LoanRequestForm />

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Loan Calculator</h2>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Monthly Payment = Loan Amount × (r × (1 + r)^n) / ((1 + r)^n -
                  1)
                  <br />
                  where r = Interest Rate/12, n = Number of Months
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-sm">
                  <p className="text-gray-600">Interest Rates from</p>
                  <p className="font-semibold">8.5% - 15.5% APR</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-600">Tenure Range</p>
                  <p className="font-semibold">3 - 60 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loans;
