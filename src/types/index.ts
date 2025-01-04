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
