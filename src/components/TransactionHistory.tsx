
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Coins, Banknote, Send } from "lucide-react";
import { Transaction } from '@/types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  isDarkMode: boolean;
}

const TransactionHistory = ({ transactions, isDarkMode }: TransactionHistoryProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Coins className="h-4 w-4" />;
      case 'withdrawal':
        return <Banknote className="h-4 w-4" />;
      case 'transfer':
        return <Send className="h-4 w-4" />;
      default:
        return <Coins className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-100 text-green-600';
      case 'withdrawal':
        return 'bg-red-100 text-red-600';
      case 'transfer':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-red-600';
      case 'transfer':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'deposit':
        return '+';
      case 'withdrawal':
        return '-';
      case 'transfer':
        return '-';
      default:
        return '';
    }
  };

  const formatDescription = (description: string) => {
    // Remove "admin deposit" from the description and clean it up
    return description
      .replace(/admin deposit/i, '')
      .replace(/^[^\w]*/, '') // Remove leading non-word characters
      .trim() || 'Deposit';
  };

  return (
    <Card className={`shadow-lg transition-all duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
    }`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <History className="h-5 w-5 text-blue-600" />
          <span>Recent Transactions</span>
        </CardTitle>
        <CardDescription className={`transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Your latest account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transactions.length === 0 ? (
            <div className={`text-center py-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No transactions found
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 rounded-lg hover:opacity-80 transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getTransactionColor(transaction.type)}`}>
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <div className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatDescription(transaction.description)}
                    </div>
                    <div className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {transaction.date} at {transaction.time}
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${getAmountColor(transaction.type)}`}>
                  {getAmountPrefix(transaction.type)}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
