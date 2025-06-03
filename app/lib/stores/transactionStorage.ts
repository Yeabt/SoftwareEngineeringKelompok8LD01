import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description?: string;
  monthYear: string; // format: 'MM-yyyy'
};

type TransactionStore = {
  transactions: Transaction[];
  currentMonth: Date; // Shared month state
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
  setCurrentMonth: (date: Date) => void;
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      currentMonth: new Date(),
      
      addTransaction: (transaction) => {
        const newTransaction = {
          ...transaction,
          id: get().transactions.length + 1,
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },
      
      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },
      
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      
      deleteAllTransactions: () => set({ transactions: [] }),

      setCurrentMonth: (date) => {
        set({ currentMonth: date });
      },
    }),
    {
      name: 'transaction-storage', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);