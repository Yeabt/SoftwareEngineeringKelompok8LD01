"use client";
import { useState, useEffect } from 'react';
import { useTransactionStore } from '@/app/lib/stores/transactionStorage';
export default function GoalTracker({ goal }) {
  const { transactions } = useTransactionStore();
  const [currentAmount, setCurrentAmount] = useState(0);
  
  // Calculate total income and expenses
  useEffect(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => Math.abs(t.amount), 0);
      
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const netSavings = income - expenses;
    setCurrentAmount(netSavings > 0 ? netSavings : 0);
  }, [transactions]);

  const progressPercentage = Math.min(
    (currentAmount / goal.targetAmount) * 100,
    100
  );

  // Format currency (IDR)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Savings Goal Tracker</h2>
      
      <div className="mb-4">
        <h3 className="text-red-500 text-xl font-semibold">
          {goal.name} - {formatCurrency(goal.targetAmount)}
        </h3>
        
        {/* Progress Bar */}
        <div className="max-w-full bg-gray-200 rounded-full h-6 mt-2">
          <div 
            className="bg-yellow-600 h-6 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Progress Text */}
        <p className="mt-2 text-right">
          {formatCurrency(currentAmount)} / {formatCurrency(goal.targetAmount)} 
          <span className="ml-2">({Math.round(progressPercentage)}%)</span>
        </p>
      </div>

      {/* Money Retained Display */}
      <div className="max-w-full bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-gray-600">Money Retained</p>
        <p className="text-2xl font-bold text-blue-700">
          {formatCurrency(currentAmount)}
        </p>
      </div>
    </div>
  );
}




// "use client";
// import { useState, useEffect } from 'react';

// export default function GoalTracker() {
//   const [goal, setGoal] = useState({
//     name: 'Piano',
//     targetAmount: 2000000,
//     currentAmount: 0,
//     percentage: 20, // 20% of income
//   });
  
//   const [income, setIncome] = useState(0);
//   const [newGoal, setNewGoal] = useState({
//     name: '',
//     targetAmount: '',
//     percentage: 20,
//   });
//   const [showNewGoalForm, setShowNewGoalForm] = useState(false);

//   // Load saved data from localStorage on component mount
//   useEffect(() => {
//     const savedGoal = localStorage.getItem('savingsGoal');
//     const savedIncome = localStorage.getItem('monthlyIncome');
    
//     if (savedGoal) setGoal(JSON.parse(savedGoal));
//     if (savedIncome) setIncome(parseFloat(savedIncome));
//   }, []);

//   // Save data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('savingsGoal', JSON.stringify(goal));
//     localStorage.setItem('monthlyIncome', income.toString());
//   }, [goal, income]);

//   const handleIncomeChange = (e) => {
//     setIncome(parseFloat(e.target.value) || 0);
//   };

//   const addMonthlySavings = () => {
//     const savings = income * (goal.percentage / 100);
//     const newAmount = goal.currentAmount + savings;
    
//     setGoal(prev => ({
//       ...prev,
//       currentAmount: newAmount > prev.targetAmount ? prev.targetAmount : newAmount,
//     }));

//     // If goal is reached, show new goal form
//     if (newAmount >= goal.targetAmount) {
//       setShowNewGoalForm(true);
//     }
//   };

//   const handleNewGoalChange = (e) => {
//     setNewGoal({
//       ...newGoal,
//       [e.target.name]: e.target.name === 'percentage' 
//         ? parseInt(e.target.value) 
//         : e.target.value,
//     });
//   };

//   const setNewGoalHandler = () => {
//     setGoal({
//       name: newGoal.name,
//       targetAmount: parseFloat(newGoal.targetAmount),
//       currentAmount: 0,
//       percentage: newGoal.percentage,
//     });
//     setShowNewGoalForm(false);
//     setNewGoal({
//       name: '',
//       targetAmount: '',
//       percentage: 20,
//     });
//   };

//   const progressPercentage = Math.min(
//     (goal.currentAmount / goal.targetAmount) * 100,
//     100
//   );

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Savings Goal Tracker</h2>
      
//       {!showNewGoalForm ? (
//         <>
//           <div className="mb-4">
//             <h3 className="text-xl font-semibold">
//               {goal.name} - {new Intl.NumberFormat('id-ID', {
//                 style: 'currency',
//                 currency: 'IDR',
//                 minimumFractionDigits: 0,
//               }).format(goal.targetAmount)}
//             </h3>
//             <div className="w-full bg-gray-200 rounded-full h-6 mt-2">
//               <div 
//                 className="bg-blue-600 h-6 rounded-full transition-all duration-500" 
//                 style={{ width: `${progressPercentage}%` }}
//               ></div>
//             </div>
//             <p className="mt-2 text-right">
//               {new Intl.NumberFormat('id-ID', {
//                 style: 'currency',
//                 currency: 'IDR',
//                 minimumFractionDigits: 0,
//               }).format(goal.currentAmount)} / {new Intl.NumberFormat('id-ID', {
//                 style: 'currency',
//                 currency: 'IDR',
//                 minimumFractionDigits: 0,
//               }).format(goal.targetAmount)} ({Math.round(progressPercentage)}%)
//             </p>
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2">
//               Monthly Income (IDR):
//               <input
//                 type="number"
//                 value={income}
//                 onChange={handleIncomeChange}
//                 className="w-full p-2 border rounded mt-1"
//               />
//             </label>
//             <label className="block mb-2">
//               Savings Percentage:
//               <div className="flex items-center mt-1">
//                 <input
//                   type="range"
//                   min="1"
//                   max="100"
//                   value={goal.percentage}
//                   onChange={(e) => setGoal({...goal, percentage: parseInt(e.target.value)})}
//                   className="flex-1"
//                 />
//                 <span className="ml-2 w-10">{goal.percentage}%</span>
//               </div>
//             </label>
//           </div>

//           <button
//             onClick={addMonthlySavings}
//             disabled={income <= 0}
//             className={`w-full py-2 px-4 rounded ${income <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//           >
//             Add Monthly Savings
//           </button>

//           {progressPercentage >= 100 && (
//             <button
//               onClick={() => setShowNewGoalForm(true)}
//               className="w-full mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded"
//             >
//               Set New Goal
//             </button>
//           )}
//         </>
//       ) : (
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <h3 className="text-xl font-semibold mb-4">Set New Goal</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block mb-1">Goal Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={newGoal.name}
//                 onChange={handleNewGoalChange}
//                 className="w-full p-2 border rounded"
//                 placeholder="e.g., New Laptop"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Target Amount (IDR):</label>
//               <input
//                 type="number"
//                 name="targetAmount"
//                 value={newGoal.targetAmount}
//                 onChange={handleNewGoalChange}
//                 className="w-full p-2 border rounded"
//                 placeholder="e.g., 2000000"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Savings Percentage:</label>
//               <div className="flex items-center">
//                 <input
//                   type="range"
//                   name="percentage"
//                   min="1"
//                   max="100"
//                   value={newGoal.percentage}
//                   onChange={handleNewGoalChange}
//                   className="flex-1"
//                 />
//                 <span className="ml-2 w-10">{newGoal.percentage}%</span>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={setNewGoalHandler}
//                 disabled={!newGoal.name || !newGoal.targetAmount}
//                 className={`flex-1 py-2 px-4 rounded ${!newGoal.name || !newGoal.targetAmount ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
//               >
//                 Save Goal
//               </button>
//               <button
//                 onClick={() => setShowNewGoalForm(false)}
//                 className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }