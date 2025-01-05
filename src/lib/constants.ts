export const ROUTES = {
  HOME: '/',
  DASHBOARD: {
    ROOT: 'dashboard',
    TRANSACTIONS: 'dashboard/transactions',
    LOANS: 'dashboard/loans',
  },
} as const;

export const API_TAGS = {
  USER: 'User',
  TRANSACTION: 'Transaction',
  LOAN: 'Loan',
  ACTIVE_LOAN: 'ActiveLoan',
} as const;
