import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionControls } from '../TransactionControls';
import { Transaction } from '../../../../types';

describe('TransactionControls', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-01',
      amount: 100,
      type: 'credit',
      description: 'Salary deposit',
      category: 'Income',
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z',
    },
    {
      id: '2',
      date: '2024-01-02',
      amount: -50,
      type: 'debit',
      description: 'Grocery shopping',
      category: 'Food',
      createdAt: '2024-01-02T15:30:00Z',
      updatedAt: '2024-01-02T15:30:00Z',
    },
    {
      id: '3',
      date: '2024-01-03',
      amount: 75,
      type: 'credit',
      description: 'Freelance payment',
      category: 'Income',
      createdAt: '2024-01-03T09:15:00Z',
      updatedAt: '2024-01-03T09:15:00Z',
    },
  ];

  const mockOnFilteredTransactionsChange = jest.fn();
  const mockOnSortChange = jest.fn();

  const defaultProps = {
    transactions: mockTransactions,
    onFilteredTransactionsChange: mockOnFilteredTransactionsChange,
    onSortChange: mockOnSortChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders all filter and sort controls', () => {
      render(<TransactionControls {...defaultProps} />);

      expect(screen.getByLabelText('Filter by:')).toBeInTheDocument();
      expect(screen.getByLabelText('Sort by:')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders all filter options', () => {
      render(<TransactionControls {...defaultProps} />);

      const filterSelect = screen.getByLabelText('Filter by:');
      const options = Array.from(filterSelect.getElementsByTagName('option'));

      expect(options).toHaveLength(3);
      expect(options.map((opt) => opt.value)).toEqual([
        'all',
        'credit',
        'debit',
      ]);
      expect(options.map((opt) => opt.textContent)).toEqual([
        'All Transactions',
        'Credits Only',
        'Debits Only',
      ]);
    });

    it('renders all sort options', () => {
      render(<TransactionControls {...defaultProps} />);

      const sortSelect = screen.getByLabelText('Sort by:');
      const options = Array.from(sortSelect.getElementsByTagName('option'));

      expect(options).toHaveLength(2);
      expect(options.map((opt) => opt.value)).toEqual(['date', 'amount']);
      expect(options.map((opt) => opt.textContent)).toEqual(['Date', 'Amount']);
    });
  });

  describe('Filtering Functionality', () => {
    it('calls onFilteredTransactionsChange with credit transactions when credit filter is selected', () => {
      render(<TransactionControls {...defaultProps} />);

      const filterSelect = screen.getByLabelText('Filter by:');
      fireEvent.change(filterSelect, { target: { value: 'credit' } });

      const expectedTransactions = mockTransactions.filter(
        (t) => t.type === 'credit'
      );
      expect(mockOnFilteredTransactionsChange).toHaveBeenCalledWith(
        expectedTransactions
      );
    });

    it('calls onFilteredTransactionsChange with debit transactions when debit filter is selected', () => {
      render(<TransactionControls {...defaultProps} />);

      const filterSelect = screen.getByLabelText('Filter by:');
      fireEvent.change(filterSelect, { target: { value: 'debit' } });

      const expectedTransactions = mockTransactions.filter(
        (t) => t.type === 'debit'
      );
      expect(mockOnFilteredTransactionsChange).toHaveBeenCalledWith(
        expectedTransactions
      );
    });

    it('maintains filter when sorting changes', () => {
      render(<TransactionControls {...defaultProps} />);

      // Set filter to credit
      const filterSelect = screen.getByLabelText('Filter by:');
      fireEvent.change(filterSelect, { target: { value: 'credit' } });

      // Change sort
      const sortSelect = screen.getByLabelText('Sort by:');
      fireEvent.change(sortSelect, { target: { value: 'amount' } });

      // Verify filter is still applied
      const expectedTransactions = mockTransactions.filter(
        (t) => t.type === 'credit'
      );
      expect(mockOnFilteredTransactionsChange).toHaveBeenLastCalledWith(
        expectedTransactions
      );
    });
  });

  describe('Sorting Functionality', () => {
    it('calls onSortChange with correct parameters when sort field changes', () => {
      render(<TransactionControls {...defaultProps} />);

      const sortSelect = screen.getByLabelText('Sort by:');
      fireEvent.change(sortSelect, { target: { value: 'amount' } });

      expect(mockOnSortChange).toHaveBeenCalledWith('amount', 'asc');
    });

    it('resets sort direction to asc when changing sort field', () => {
      render(<TransactionControls {...defaultProps} />);

      const sortSelect = screen.getByLabelText('Sort by:');
      const sortButton = screen.getByRole('button');

      // Change sort field
      fireEvent.change(sortSelect, { target: { value: 'amount' } });

      expect(mockOnSortChange).toHaveBeenCalledWith('amount', 'asc');
      expect(sortButton).toHaveTextContent('🔼');
    });
  });
});
