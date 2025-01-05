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
    baseUrl:
      'https://my-json-server.typicode.com/osifojohn/fintech-core-server',
  }),
  tagTypes: Object.values(API_TAGS),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: [API_TAGS.USER],
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

    getTransactionStats: builder.query<TransactionStats, void>({
      query: () => '/transactionStats',
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
  useGetUserQuery,
  useGetTransactionsQuery,
  useGetLoanHistoryQuery,
  useGetTransactionStatsQuery,
  useCreateLoanRequestMutation,
  useGetActiveLoansQuery,
} = api;
