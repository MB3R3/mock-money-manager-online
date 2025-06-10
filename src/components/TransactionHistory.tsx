
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Coins, Banknote } from "lucide-react";

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  time: string;
  description: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  isDarkMode: boolean;
}

const TransactionHistory = ({ transactions, isDarkMode }: TransactionHistoryProps) => {
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
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 rounded-lg hover:opacity-80 transition-all duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'deposit' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? (
                    <Coins className="h-4 w-4" />
                  ) : (
                    <Banknote className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {transaction.description}
                  </div>
                  <div className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {transaction.date} at {transaction.time}
                  </div>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'deposit' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
