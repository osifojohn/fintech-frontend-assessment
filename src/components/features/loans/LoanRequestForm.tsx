import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateLoanRequestMutation } from '../../../redux/api/apiSlice';
import { toast } from 'sonner';

const schema = z.object({
  amount: z
    .number()
    .min(500, 'Minimum loan amount is $5,000')
    .max(40000, 'Maximum loan amount is $40,000')
    .refine((val) => !isNaN(val), { message: 'Amount is required' }),

  tenure: z
    .number()
    .min(3, 'Minimum tenure is 3 months')
    .max(60, 'Maximum tenure is 60 months')
    .refine((val) => !isNaN(val), { message: 'Tenure is required' }),

  purpose: z
    .string()
    .min(10, 'Please provide more detail about the purpose')
    .max(500, 'Purpose cannot exceed 500 characters')
    .refine((val) => val.trim() !== '', { message: 'Purpose is required' }),
});

type FormData = z.infer<typeof schema>;

export const LoanRequestForm: React.FC = () => {
  const [createLoan, { isLoading, error, isError }] =
    useCreateLoanRequestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const amount = parseFloat(data.amount as unknown as string);
    const tenure = parseInt(data.tenure as unknown as string, 10);

    try {
      await createLoan({
        ...data,
        amount,
        status: 'pending',
        startDate: new Date().toISOString(),
        endDate: new Date(
          Date.now() + tenure * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        interestRate: 8.5,
      }).unwrap();
    } catch (error) {
      console.error('Failed to submit loan request:', error);
    }
  };

  useEffect(() => {
    if (isError && error) {
      const errorMessage = 'Failed to submit loan request.';
      console.log('error', error);

      toast.error(errorMessage);
    }
  }, [isError, error]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow p-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Request New Loan
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            {...register('amount')}
            className={`block w-full rounded-md border ${
              errors.amount
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:ring focus:border focus:outline-none h-8`}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tenure (months)
          </label>
          <input
            type="number"
            {...register('tenure')}
            className={`block w-full rounded-md border ${
              errors.tenure
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:ring focus:border focus:outline-none h-8`}
          />
          {errors.tenure && (
            <p className="mt-1 text-sm text-red-600">{errors.tenure.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose
          </label>
          <textarea
            {...register('purpose')}
            className={`block w-full rounded-md border ${
              errors.purpose
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:ring focus:border focus:outline-none`}
            rows={3}
          />
          {errors.purpose && (
            <p className="mt-1 text-sm text-red-600">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Loan Request'}
        </button>
      </div>
    </form>
  );
};
