import { create } from 'zustand';

type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description?: string;
  monthYear: string;
};

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addTransaction: (transaction) => 
    set((state) => ({ 
      transactions: [...state.transactions, transaction] 
    })),
  setTransactions: (transactions) => set({ transactions }),
}));