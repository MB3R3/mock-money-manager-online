import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Repeat } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  description?: string;
  bank?: string;
  sender?: string;
  type?: 'deposit' | 'withdrawal' | 'transfer';
  date?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  isDarkMode: boolean;
  onTransactionClick?: (tx: Transaction) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const isLast7Days = (dateStr?: string): boolean => {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  return date >= sevenDaysAgo && date <= today;
};

const TransactionHistory = ({ transactions, isDarkMode, onTransactionClick }: TransactionHistoryProps) => {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'all' | 'debits' | 'last7days'>('all');

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'debits') return tx.type === 'withdrawal' || tx.type === 'transfer';
    if (filter === 'last7days') return isLast7Days(tx.date);
    return true;
  });

  const visibleTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 3);

  const getIcon = (type?: string) => {
    switch (type) {
      case 'deposit': return <ArrowDown className="text-green-500 w-4 h-4" />;
      case 'withdrawal': return <ArrowUp className="text-red-500 w-4 h-4" />;
      case 'transfer': return <Repeat className="text-yellow-500 w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className={`rounded-xl p-6 shadow-md h-full flex flex-col justify-between ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div>
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <button
            onClick={() => setShowAll(prev => !prev)}
            className={`text-sm font-medium focus:outline-none ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
          >
            {showAll ? 'Show less' : 'See all'}
          </button>
        </div>

        <div className="flex space-x-2 mb-3 text-sm">
          <button
            className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} text-xs`}
            onClick={() => setFilter('all')}
          >All</button>
          <button
            className={`px-2 py-1 rounded ${filter === 'debits' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} text-xs`}
            onClick={() => setFilter('debits')}
          >Debits Only</button>
          <button
            className={`px-2 py-1 rounded ${filter === 'last7days' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} text-xs`}
            onClick={() => setFilter('last7days')}
          >Last 7 Days</button>
        </div>

        {visibleTransactions.length === 0 ? (
          <p className="text-sm text-gray-400">No transactions match filter.</p>
        ) : (
          <ul className="space-y-3">
            {visibleTransactions.map(tx => (
              <li
                key={tx.id}
                onClick={() => onTransactionClick && onTransactionClick(tx)}
                className={`p-4 rounded-xl cursor-pointer transition hover:shadow-lg border flex items-center space-x-3 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {getIcon(tx.type)}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 w-full">
                  <span className="text-base font-semibold">{formatCurrency(tx.amount)}</span>
                  <span className="text-sm text-gray-500 truncate max-w-full sm:max-w-[60%]">
                    {tx.description || 'No description'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
