"use client";

import { useState } from 'react';
import TransactionTracker from './transactiontracker';
import MonthlySpending from './monthlyspending';

export default function AppWrapper() {
  // State to hold transactions (moved from TransactionTracker.jsx)
  const [transactions, setTransactions] = useState([]);

  return (
    <div>
      <TransactionTracker 
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <MonthlySpending transactions={transactions} />
    </div>
  );
}