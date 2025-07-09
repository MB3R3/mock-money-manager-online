// src/components/TransactionHistory.tsx

import React, { useState } from 'react';

interface Transaction {
  id: string;
  amount: number;
  description?: string;
  bank?: string;
  sender?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  isDarkMode: boolean;
  onTransactionClick?: (tx: Transaction) => void;
}

const TransactionHistory = ({ transactions, isDarkMode, onTransactionClick }: TransactionHistoryProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleTransactions = showAll ? transactions : transactions.slice(0, 3);

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

        {visibleTransactions.length === 0 ? (
          <p className="text-sm text-gray-400">No transactions yet.</p>
        ) : (
          <ul className="space-y-3">
            {visibleTransactions.map(tx => (
              <li
                key={tx.id}
                onClick={() => onTransactionClick && onTransactionClick(tx)}
                className={`p-4 rounded-xl cursor-pointer transition hover:shadow-lg border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-base font-semibold">${tx.amount}</span>
                  <span className="text-sm text-gray-500 truncate max-w-full sm:max-w-[60%]">{tx.description || 'No description'}</span>
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
