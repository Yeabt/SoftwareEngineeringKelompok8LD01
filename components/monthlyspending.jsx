"use client";
import { useTransactionStore } from '@/app/lib/stores/transactionStorage';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const categories = [
  'Food & Beverages',
  'Household',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Other Expense'
];

export default function MonthlySpending() {
  const { transactions, currentMonth } = useTransactionStore();
  const [maxSpending, setMaxSpending] = useState({});
  const [editMode, setEditMode] = useState({});
  const [tempValues, setTempValues] = useState({});
  
  useEffect(() => {
    const savedMaxSpending = localStorage.getItem('categoryMaxSpending');
    if (savedMaxSpending) {
      setMaxSpending(JSON.parse(savedMaxSpending));
    } else {
      const initialMaxSpending = {};
      categories.forEach(cat => {
        initialMaxSpending[cat] = 0;
      });
      setMaxSpending(initialMaxSpending);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categoryMaxSpending', JSON.stringify(maxSpending));
  }, [maxSpending]);

  const monthYearFilter = format(currentMonth, 'MM-yyyy');
  const currentMonthTransactions = transactions.filter(t => 
    t.monthYear === monthYearFilter
  );
  const expenseTransactions = currentMonthTransactions.filter(
    t => t.type === 'expense'
  );

  const categorySpending = {};
  categories.forEach(cat => {
    categorySpending[cat] = 0;
  });

  expenseTransactions.forEach(transaction => {
    const category = transaction.category;
    if (categories.includes(category)) {
      categorySpending[category] += Math.abs(transaction.amount);
    } else {
      categorySpending['Other Expense'] += Math.abs(transaction.amount);
    }
  });

  const totalSpending = expenseTransactions.reduce(
    (sum, t) => sum + Math.abs(t.amount), 
    0
  );

  const spendingData = {
    labels: Object.keys(categorySpending),
    datasets: [
      {
        data: Object.values(categorySpending).map(amount => amount),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#C9CBCF'
        ],
        borderWidth: 0,
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const displayMonth = format(currentMonth, 'MMMM yyyy');

  const handleMaxSpendingChange = (category, value) => {
    setTempValues(prev => ({ ...prev, [category]: value }));
  };

  const saveMaxSpending = (category) => {
    const value = parseFloat(tempValues[category] || '0');
    setMaxSpending(prev => ({ ...prev, [category]: value }));
    setEditMode(prev => ({ ...prev, [category]: false }));
  };

  const toggleEditMode = (category) => {
    setEditMode(prev => ({ ...prev, [category]: !prev[category] }));
    setTempValues(prev => ({ ...prev, [category]: maxSpending[category]?.toString() || '0' }));
  };

  return (
    <div className="max-w-4xl min-w-auto w-3xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-yellow-500 font-bold mb-4">Monthly Spending</h2>
      <div className="items-center justify-center">
        <h3 className="text-center text-2xl font-semibold text-gray-700 mb-6 border-2 bg-yellow-200 rounded-md">
          {displayMonth}
        </h3>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="w-100 h-100 md:mr-8">
          <Doughnut 
            data={spendingData} 
            options={{ 
              cutout: '70%',
              plugins: {
                legend: { display: false },
              },
            }} 
          />
        </div>

        <div className="mt-6 md:mt-0 w-full md:w-auto">
          {spendingData.labels.map((label, index) => {
            const spent = categorySpending[label];
            const max = maxSpending[label] || 0;
            const percentage = max > 0 ? Math.min(100, (spent / max) * 100) : 0;
            const isOverBudget = max > 0 && spent >= max;
            
            return (
              <div key={label} className="mb-4">
                <div className="flex items-center mb-1">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: spendingData.datasets[0].backgroundColor[index] }}
                  />
                  <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-700'}`}>
                    {label} {isOverBudget && '(Warning!)'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-4 mr-2">
                    <div 
                      className={`h-4 rounded-full ${isOverBudget ? 'bg-red-500' : ''}`}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: isOverBudget 
                          ? '#EF4444' 
                          : spendingData.datasets[0].backgroundColor[index],
                        transition: 'width 0.5s ease'
                      }}
                    />
                  </div>
                  <span className={`text-sm ${isOverBudget ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                
                <div className="flex justify-between text-xs mt-1">
                  <span className={isOverBudget ? 'text-red-600' : 'text-gray-500'}>
                    Spent: {formatCurrency(spent)}
                  </span>
                  <span className={isOverBudget ? 'text-red-600' : 'text-gray-500'}>
                    Max: {formatCurrency(max)}
                  </span>
                </div>
                
                <div className="mt-1 flex items-center">
                  {editMode[label] ? (
                    <>
                      <input
                        type="number"
                        value={tempValues[label] || ''}
                        onChange={(e) => handleMaxSpendingChange(label, e.target.value)}
                        className="w-24 p-1 border rounded text-sm mr-2 text-black"
                        placeholder="Max amount"
                      />
                      <button
                        onClick={() => saveMaxSpending(label)}
                        className="bg-green-500 text-white px-2 py-1 rounded text-sm mr-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(prev => ({ ...prev, [label]: false }))}
                        className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => toggleEditMode(label)}
                      className="text-blue-500 text-sm underline"
                    >
                      Set budget
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-gray-500">Total Spending</p>
        <p className="text-2xl text-red-700 font-bold">
          {formatCurrency(totalSpending)}
        </p>
      </div>
    </div>
  );
}