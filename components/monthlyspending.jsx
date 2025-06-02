"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlySpending({ transactions }) {
  // const Initialtransactions = [
  const initialtransactions= [{
      id: 1,
      date: '2024-05-01',
      amount: -150000, // Expense (negative)
      category: 'Food',
      type: 'expense',
      description: 'Grocery shopping',
      monthYear: '05-2024'
  },
  {
      id: 2,
      date: '2024-05-05',
      amount: 5000000, // Income (positive)
      category: 'Salary',
      type: 'income',
      description: 'Monthly salary',
      monthYear: '05-2024'
  },
  {
      id: 3,
      date: '2024-05-10',
      amount: -75000,
      category: 'Transportation',
      type: 'expense',
      description: 'Fuel',
      monthYear: '05-2024'
  },
  {
      id: 4,
      date: '2024-05-15',
      amount: -300000,
      category: 'Utilities',
      type: 'expense',
      description: 'Electric bill',
      monthYear: '05-2024'
  }] 
  transactions = initialtransactions
  // Filter only expense transactions (since we're showing spending)
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  // Calculate spending by category
  const categorySpending = {
    'Food & Beverages': 0,
    'Household': 0,
    'Transportation': 0,
    'Utilities': 0,
    'Entertainment': 0,
    'Healthcare': 0,
    'Other Expense': 0
  };

  // Sum amounts by category
  expenseTransactions.forEach(transaction => {
    const category = transaction.category;
    if (category in categorySpending) {
      categorySpending[category] += Math.abs(transaction.amount);
    } else {
      categorySpending['Other Expense'] += Math.abs(transaction.amount);
    }
  });

  // Calculate total spending
  const totalSpending = expenseTransactions.reduce(
    (sum, t) => sum + Math.abs(t.amount), 
    0
  );

  // Prepare data for the chart
  const spendingData = {
    labels: Object.keys(categorySpending),
    datasets: [
      {
        data: Object.values(categorySpending).map(amount => 
          totalSpending > 0 ? Math.round((amount / totalSpending) * 100) : 0
        ),
        backgroundColor: [
          '#FF6384', // Food & Beverages (Pink)
          '#36A2EB', // Household (Blue)
          '#FFCE56', // Transportation (Yellow)
          '#4BC0C0', // Utilities (Teal)
          '#9966FF', // Entertainment (Purple)
          '#FF9F40', // Healthcare (Orange)
          '#C9CBCF'  // Other Expense (Gray)
        ],
        borderWidth: 0,
      }
    ]
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get current month name
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-yellow-500 font-bold mb-4">Monthly Spending</h2>
      <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">{currentMonth}</h3>
      
      {totalSpending > 0 ? (
        <>
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Pie Chart */}
            <div className="w-48 h-48 md:mr-8">
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

            {/* Legend */}
            <div className="mt-6 md:mt-0">
              {spendingData.labels.map((label, index) => (
                categorySpending[label] > 0 && (
                  <div key={label} className="flex items-center mb-3">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: spendingData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-gray-700">
                      {label} - {spendingData.datasets[0].data[index]}%
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-500">Total Spending</p>
            <p className="text-2xl text-red-700 font-bold">
              {formatCurrency(totalSpending)}
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No spending data available for this month
        </div>
      )}
    </div>
  );
}