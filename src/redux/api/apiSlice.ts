import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Loan, Transaction, User } from '../../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://my-json-server.typicode.com/osifojohn/fintech-core-server',
  }),
  tagTypes: ['User', 'Transaction', 'Loan'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),

    getTransactions: builder.query<Transaction[], void>({
      query: () => '/transactions',
      providesTags: ['Transaction'],
    }),

    getLoanHistory: builder.query<Loan[], void>({
      query: () => '/loans',
      providesTags: ['Loan'],
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
      // Optimistic update
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

    createTransaction: builder.mutation<
      Transaction,
      Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
    >({
      query: (transactionData) => ({
        url: '/transactions',
        method: 'POST',
        body: transactionData,
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetTransactionsQuery,
  useGetLoanHistoryQuery,
  useCreateLoanRequestMutation,
  useCreateTransactionMutation,
} = api;
