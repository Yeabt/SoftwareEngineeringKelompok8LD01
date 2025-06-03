// tung tung tung sahur. please let me do this ~michi, ur useless gal
'use client'

import TransactionTracker from '@/components/transactiontracker'
import { useState } from 'react';

export default function TransactionPage (){
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">SmartSpend Transaction Tracker</h1>
                <TransactionTracker />
            </div>
        </div>
    );
}