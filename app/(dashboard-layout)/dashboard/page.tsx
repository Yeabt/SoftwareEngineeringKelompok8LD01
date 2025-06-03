'use client';

import Dashboard from '@/components/dashboard'
import GoalTracker from '@/components/goaltracker'
import MonthlySpending from '@/components/monthlyspending'
import AppWrapper from '@/components/appwrapperParent';
import { useState } from 'react';

// import { useState } from 'react';
export default function DashBoardPage() {
    const [transactions, setTransactions] = useState();
    const [savingsGoal] = useState({
        name: 'Vacation Fund',
        targetAmount: 5000000, // 5 million IDR
        });
    return (
        <>
        <div className="text-center text-blue-500 mx-auto p-4">
            {/* <h1 className="text-3xl font-bold mb-8">Your Savings Goals</h1> */}
            <GoalTracker goal={savingsGoal}/>
        </div>
        <div className="flex justify-center mx-auto p-4 gap-10">    
            <MonthlySpending />
            <div className="object-top">
                <Dashboard />
            </div>
            
        </div>
        </>
    )
}