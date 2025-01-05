export type User = {
  id: string;
  name: string;
  email: string;
  accountBalance: number;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type Loan = {
  id: string;
  amount: number;
  tenure: number;
  status: 'active' | 'completed' | 'pending';
  purpose: string;
  startDate: string;
  endDate: string;
  interestRate: number;
  createdAt: string;
  updatedAt: string;
};

export type TransactionStats = {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
};

type PaymentSchedule = {
  lastPaymentDate: string | null;
  nextPaymentAmount: number;
  isOverdue: boolean;
  daysUntilNextPayment: number;
};

export type ActiveLoan = {
  id: string;
  loanId: string;
  amount: number;
  outstandingAmount: number;
  tenure: number;
  remainingTenure: number;
  status: 'active' | 'closed' | 'defaulted';
  purpose: string;
  startDate: string;
  endDate: string;
  nextPaymentDate: string;
  interestRate: number;
  monthlyPayment: number;
  totalPaid: number;
  remainingPayments: number;
  paymentsMade: number;
  loanType: 'personal' | 'auto' | 'business' | 'home';
  paymentSchedule: PaymentSchedule;
  createdAt: string;
  updatedAt: string;
};

export type ErrorDetails = {
  name: string;
  success: boolean;
  status: number;
  message: string;
};

export type ErrorResponse = Error & {
  timestamp: string;
  data: ErrorDetails;
};
