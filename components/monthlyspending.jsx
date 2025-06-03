"use client";
import { useTransactionStore } from '@/app/lib/stores/transactionStorage';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlySpending() {
  const { transactions, currentMonth } = useTransactionStore();
  
  // Format currentMonth to MM-yyyy for filtering
  const monthYearFilter = format(currentMonth, 'MM-yyyy');
  
  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(t => 
    t.monthYear === monthYearFilter
  );

  // Filter only expense transactions for the current month
  const expenseTransactions = currentMonthTransactions.filter(
    t => t.type === 'expense'
  );

  // Initialize category spending
  const categorySpending = {
    'Food & Beverages': 0,
    'Household': 0,
    'Transportation': 0,
    'Utilities': 0,
    'Entertainment': 0,
    'Healthcare': 0,
    'Other Expense': 0
  };

  // Calculate spending by category (using current month expenses)
  expenseTransactions.forEach(transaction => {
    const category = transaction.category;
    if (category in categorySpending) {
      categorySpending[category] += Math.abs(transaction.amount);
    } else {
      categorySpending['Other Expense'] += Math.abs(transaction.amount);
    }
  });

  // Calculate total spending (for current month)
  const totalSpending = expenseTransactions.reduce(
    (sum, t) => sum + Math.abs(t.amount), 
    0
  );

  // Prepare chart data
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

  // Format currency (IDR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format month for display
  const displayMonth = format(currentMonth, 'MMMM yyyy');

  return (
    <div className="max-w-4xl min-w-auto w-3xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-yellow-500 font-bold mb-4">Monthly Spending</h2>
      <h3 className="text-center text-lg font-semibold text-gray-700 mb-6">
        {displayMonth}
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Pie Chart - Always shown */}
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

        {/* Legend - Always shown with all categories */}
        <div className="mt-6 md:mt-0">
          {spendingData.labels.map((label, index) => (
            <div key={label} className="flex items-center mb-3">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: spendingData.datasets[0].backgroundColor[index] }}
              />
              <span className="text-gray-700">
                {label} - {formatCurrency(spendingData.datasets[0].data[index])}
              </span>
            </div>
          ))}
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