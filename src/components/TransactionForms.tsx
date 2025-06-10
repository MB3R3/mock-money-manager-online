
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote, Coins } from "lucide-react";

interface TransactionFormsProps {
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  onDeposit: () => void;
  onWithdraw: () => void;
  isDarkMode: boolean;
}

const TransactionForms = ({
  depositAmount,
  setDepositAmount,
  withdrawAmount,
  setWithdrawAmount,
  onDeposit,
  onWithdraw,
  isDarkMode
}: TransactionFormsProps) => {
  return (
    <div className="space-y-6">
      {/* Deposit Card */}
      <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Coins className="h-5 w-5 text-green-600" />
            <span>Make a Deposit</span>
          </CardTitle>
          <CardDescription className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Add money to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="deposit" className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Amount</Label>
            <Input
              id="deposit"
              type="number"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className={`mt-1 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
              }`}
            />
          </div>
          <Button 
            onClick={onDeposit} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!depositAmount}
          >
            Deposit Funds
          </Button>
        </CardContent>
      </Card>

      {/* Withdraw Card */}
      <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Banknote className="h-5 w-5 text-red-600" />
            <span>Make a Withdrawal</span>
          </CardTitle>
          <CardDescription className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Withdraw money from your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="withdraw" className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Amount</Label>
            <Input
              id="withdraw"
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className={`mt-1 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
              }`}
            />
          </div>
          <Button 
            onClick={onWithdraw} 
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={!withdrawAmount}
          >
            Withdraw Funds
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForms;
