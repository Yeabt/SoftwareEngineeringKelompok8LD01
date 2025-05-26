    "use client";

    import { useState } from 'react';
    import { format, parseISO, addMonths, subMonths } from 'date-fns';
    import { id } from 'date-fns/locale';

    export default function TransactionTracker() {
    // Predefined categories
    const incomeCategories = [
        'Allowance',
        'Salary',
        'Investment',
        'Other Income'
    ];

    const expenseCategories = [
        'Food & Beverages',
        'Transportation',
        'Utilities',
        'Entertainment',
        'Healthcare',
        'Other Expense'
    ];

    // Sample initial transactions
    const initialTransactions = [];

    const [transactions, setTransactions] = useState(initialTransactions);
    const [showForm, setShowForm] = useState(false);
    const [formType, setFormType] = useState('income');
    const [formData, setFormData] = useState({
        date: format(new Date(), 'yyyy-MM-dd'),
        amount: '',
        category: '',
        description: ''
    });
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Calculate totals
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const total = income - expenses;

    // Format currency in IDR
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = parseISO(dateString);
        return format(date, 'dd-MM-yyyy, EEEE', { locale: id });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    // Open form with specific type (income/expense)
    const openForm = (type) => {
        setFormType(type);
        setFormData({
        date: format(new Date(), 'yyyy-MM-dd'),
        amount: '',
        category: type === 'income' ? incomeCategories[0] : expenseCategories[0],
        description: ''
        });
        setShowForm(true);
    };

    // Save new transaction
    const saveTransaction = () => {
        const newTransaction = {
        id: transactions.length + 1,
        date: formData.date,
        amount: formType === 'income' 
            ? Math.abs(Number(formData.amount)) 
            : -Math.abs(Number(formData.amount)),
        category: formData.category,
        description: formData.description,
        type: formType
        };

        setTransactions([...transactions, newTransaction]);
        setShowForm(false);
    };

    // Date navigation functions
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
        <div className="p-4">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl text-yellow-600 font-bold">SmartSpend</h1>
            <div className="flex items-center space-x-4">
            <div className="text-yellow-600 flex items-center bg-white rounded-lg shadow-sm p-1">
                <button 
                onClick={prevMonth}
                className="p-1 rounded hover:bg-gray-100"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                </button>
                <span className="px-4 font-medium">
                {format(currentMonth, 'MMMM yyyy', { locale: id })}
                </span>
                <button 
                onClick={nextMonth}
                className="p-1 rounded hover:bg-gray-100"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Income</h3>
            <p className="text-xl font-semibold text-blue-600">{formatCurrency(income)}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Expenses</h3>
            <p className="text-xl font-semibold text-red-600">{formatCurrency(expenses)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Total</h3>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(total)}</p>
            </div>
        </div>

        {/* Transaction Table */}
        <div className="mb-6 overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                <tr key={transaction.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.date)}
                    </td>
                    <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${
                    transaction.amount > 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                    {formatCurrency(Math.abs(transaction.amount))}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {transaction.description || '-'}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
            <button
            onClick={() => openForm('income')}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
            Change Income
            </button>
            <button
            onClick={() => openForm('expense')}
            className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
            Add Expenses
            </button>
        </div>

        {/* Popup Form */}
        {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`rounded-lg shadow-xl w-full max-w-md ${
                formType === 'income' ? 'bg-blue-50' : 'bg-red-50'
            }`}>
                <div className="p-6">
                <h3 className={`text-lg font-medium mb-4 ${
                    formType === 'income' ? 'text-blue-800' : 'text-red-800'
                }`}>
                    {formType === 'income' ? 'Income' : 'Expense'} Transaction
                </h3>
                
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (IDR)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                        placeholder="0"
                    />
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md bg-white text-black"
                    >
                        <option value="" disabled className="text-gray-400">Select a category</option>
                        {(formType === 'income' ? incomeCategories : expenseCategories).map(category => (
                        <option key={category} value={category} className="text-black">{category}</option>
                        ))}
                    </select>
                    </div>
                    
                    {formType === 'expense' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
                        placeholder="Optional"
                        />
                    </div>
                    )}
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={saveTransaction}
                    disabled={!formData.amount}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                        !formData.amount
                        ? 'bg-gray-400 cursor-not-allowed'
                        : formType === 'income'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-red-600 hover:bg-red-700'
                    }`}
                    >
                    Save
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    }