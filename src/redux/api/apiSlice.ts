import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ActiveLoan,
  Loan,
  Transaction,
  TransactionStats,
  User,
} from '../../types';
import { API_TAGS } from '../../lib/constants';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // Temporarily hardcoded; this value should ideally come from a .env file
    baseUrl:
      'https://my-json-server.typicode.com/osifojohn/fintech-core-server',
  }),
  tagTypes: Object.values(API_TAGS),
  endpoints: (builder) => ({
    getUserAccountOverview: builder.query<User, string>({
      query: (id) => `/userAccountOverview/${id}`,
      providesTags: [API_TAGS.UserAccountOverview],
    }),

    getTransactions: builder.query<Transaction[], void>({
      query: () => '/transactions',
      providesTags: [API_TAGS.TRANSACTION],
    }),

    getLoanHistory: builder.query<Loan[], void>({
      query: () => '/loans',
      providesTags: [API_TAGS.LOAN],
    }),
    getActiveLoans: builder.query<ActiveLoan[], void>({
      query: () => '/activeLoans',
      providesTags: [API_TAGS.ACTIVE_LOAN],
    }),

    getTransactionStats: builder.query<TransactionStats, string>({
      query: (id) => `/transactionStats/${id}`,
      providesTags: [API_TAGS.TRANSACTION],
    }),

    createLoanRequest: builder.mutation<
      Loan,
      Omit<Loan, 'id' | 'createdAt' | 'updatedAt'>
    >({
      query: (loanData) => ({
        url: '/loans',
        method: 'POST',
        body: loanData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newLoan } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData('getLoanHistory', undefined, (draft) => {
              draft.unshift(newLoan);
            })
          );
        } catch {
          // error handling
        }
      },
    }),
  }),
});

export const {
  useGetUserAccountOverviewQuery,
  useGetTransactionsQuery,
  useGetLoanHistoryQuery,
  useGetTransactionStatsQuery,
  useCreateLoanRequestMutation,
  useGetActiveLoansQuery,
} = api;
