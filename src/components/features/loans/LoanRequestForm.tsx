import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateLoanRequestMutation } from '../../../redux/api/apiSlice';
import { toast } from 'sonner';
import { ErrorResponse } from '@/types';

const loanSchema = z.object({
  amount: z
    .string()
    .nonempty('Amount is required')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'Please enter a valid number',
    })
    .refine((val) => val >= 500, {
      message: 'Minimum loan amount is $500',
    })
    .refine((val) => val <= 40000, {
      message: 'Maximum loan amount is $40,000',
    }),

  tenure: z
    .string()
    .nonempty('Tenure is required')
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: 'Please enter a valid number',
    })
    .refine((val) => val >= 3, {
      message: 'Minimum tenure is 3 months',
    })
    .refine((val) => val <= 60, {
      message: 'Maximum tenure is 60 months',
    }),

  purpose: z
    .string()
    .nonempty('Purpose is required')
    .min(
      10,
      'Please provide more detail about the purpose (minimum 10 characters)'
    )
    .max(500, 'Purpose cannot exceed 500 characters')
    .transform((val) => val.trim()),
});

type LoanFormData = z.infer<typeof loanSchema>;

const LoanRequestForm: React.FC = () => {
  const [createLoan, { isLoading, error }] = useCreateLoanRequestMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoanFormData) => {
    try {
      const payload = {
        ...data,
        status: 'pending' as const,
        startDate: new Date().toISOString(),
        endDate: new Date(
          Date.now() + Number(data.tenure) * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        interestRate: 8.5,
      };

      await createLoan(payload).unwrap();
      reset();
      toast.success('Loan request submitted successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      const err = error as ErrorResponse;
      toast.error(
        err?.data?.message || err?.message || 'Failed to submit loan request'
      );
    }
  }, [error]);

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
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Loan Amount ($)
          </label>
          <input
            id="amount"
            type="number"
            {...register('amount')}
            placeholder="Enter amount between $500 - $40,000"
            className={`block w-full rounded-md border ${
              errors.amount
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:ring focus:border focus:outline-none h-10 px-3`}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="tenure"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tenure (months)
          </label>
          <input
            id="tenure"
            type="number"
            {...register('tenure')}
            placeholder="Enter months between 3 - 60"
            className={`block w-full rounded-md border ${
              errors.tenure
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:ring focus:border focus:outline-none h-10 px-3`}
          />
          {errors.tenure && (
            <p className="mt-1 text-sm text-red-600">{errors.tenure.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Purpose
          </label>
          <textarea
            id="purpose"
            {...register('purpose')}
            placeholder="Describe the purpose of your loan (10-500 characters)"
            className={`block w-full rounded-md border ${
              errors.purpose
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:ring focus:border focus:outline-none p-3`}
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed h-10"
        >
          {isLoading ? 'Submitting...' : 'Submit Loan Request'}
        </button>
      </div>
    </form>
  );
};

export default LoanRequestForm;
