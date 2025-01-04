import React from 'react';
import { useGetUserQuery } from '../../../redux/api/apiSlice';
import { LoadingShimmerBlock } from '../../LoadingShimmerBlock';
import { AlertCircle } from 'lucide-react';

export const UserOverview: React.FC = () => {
  const {
    data: user,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetUserQuery('1');

  if (isLoading || isFetching) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-3">
            <LoadingShimmerBlock className="h-8 w-48" />
            <LoadingShimmerBlock className="h-4 w-32" />
          </div>
          <div className="text-right space-y-2">
            <LoadingShimmerBlock className="h-4 w-28 ml-auto" />
            <LoadingShimmerBlock className="h-10 w-36 ml-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center py-6">
          <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Unable to load account information
          </h3>
          <p className="text-gray-500 text-center mb-4">
            There was a problem fetching your account details
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600">{user?.accountNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-3xl font-bold text-green-600">
            ${user?.accountBalance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
