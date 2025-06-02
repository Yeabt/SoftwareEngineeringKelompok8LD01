'use client';

import Dashboard from '@/components/dashboard'
import GoalTracker from '@/components/GoalTracker'
import MonthlySpending from '@/components/monthlyspending'
import AppWrapper from '@/components/appwrapperParent';
import { useState } from 'react';

// import { useState } from 'react';
export default function DashBoardPage() {
    const [transactions, setTransactions] = useState([]);
    return (
        <>
        <div className="text-blue-500 container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Your Savings Goals</h1>
            <GoalTracker />
        </div>
        <div className="flex items-center justify-center p-7 gap-10">    
            <div>
                <MonthlySpending transactions={transactions}/>
            </div>
            <Dashboard />
        </div>
        </>
    )
}