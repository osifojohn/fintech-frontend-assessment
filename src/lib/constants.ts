export const ROUTES = {
  HOME: '/',
  DASHBOARD: {
    ROOT: 'dashboard',
    TRANSACTIONS: 'dashboard/transactions',
    LOANS: 'dashboard/loans',
  },
} as const;

export const API_TAGS = {
  UserAccountOverview: 'UserAccountOverview',
  TRANSACTION: 'Transaction',
  LOAN: 'Loan',
  ACTIVE_LOAN: 'ActiveLoan',
} as const;

export const DAYS_IN_MONTH = 30;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTE = 60;
export const MILLISECONDS_IN_SECOND = 1000;
export const DEFAULT_INTEREST_RATE = 8.5;
