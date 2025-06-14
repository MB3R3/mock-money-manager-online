
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from '@/types';

interface QuickStatsProps {
  transactions: Transaction[];
  isDarkMode: boolean;
}

const QuickStats = ({ transactions, isDarkMode }: QuickStatsProps) => {
  const depositCount = transactions.filter(t => t.type === 'deposit').length;
  const withdrawalCount = transactions.filter(t => t.type === 'withdrawal').length;
  const transferCount = transactions.filter(t => t.type === 'transfer').length;
  const totalDeposited = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {depositCount}
          </div>
          <div className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Total Deposits</div>
        </CardContent>
      </Card>
      
      <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {withdrawalCount}
          </div>
          <div className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Total Withdrawals</div>
        </CardContent>
      </Card>
      
      <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {transferCount}
          </div>
          <div className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Total Transfers</div>
        </CardContent>
      </Card>
      
      <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600 mb-2">
            ${totalDeposited.toFixed(2)}
          </div>
          <div className={`text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Total Deposited</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickStats;
