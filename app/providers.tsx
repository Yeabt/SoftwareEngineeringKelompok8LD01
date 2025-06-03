'use client';
import { type ReactNode } from 'react';
import { useTransactionStore } from './lib/stores/transactionStorage';

export default function Providers({ children }: { children: ReactNode }) {
  // Initialize store on client
  useTransactionStore.persist.rehydrate();
  return <>{children}</>;
}