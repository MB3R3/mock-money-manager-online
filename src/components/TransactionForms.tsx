
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import TransferForm from './TransferForm';

interface TransactionFormsProps {
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  transferAmount: string;
  setTransferAmount: (value: string) => void;
  recipientAccount: string;
  setRecipientAccount: (value: string) => void;
  onWithdraw: (description: string) => void;
  onTransfer: (description: string) => void;
  isDarkMode: boolean;
}

const TransactionForms = ({
  withdrawAmount,
  setWithdrawAmount,
  transferAmount,
  setTransferAmount,
  recipientAccount,
  setRecipientAccount,
  onWithdraw,
  onTransfer,
  isDarkMode
}: TransactionFormsProps) => {
  const [withdrawDescription, setWithdrawDescription] = useState('');
  const [transferDescription, setTransferDescription] = useState('');

  const handleWithdraw = () => {
    onWithdraw(withdrawDescription);
    setWithdrawDescription('');
  };

  const handleTransfer = () => {
    onTransfer(transferDescription);
    setTransferDescription('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Withdraw Card */}
      <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader className="pb-4">
          <CardTitle className={`flex items-center space-x-2 text-lg sm:text-xl transition-colors duration-300 ${
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
          <div>
            <Label htmlFor="withdrawDescription" className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Description</Label>
            <Input
              id="withdrawDescription"
              type="text"
              placeholder="Enter transaction description"
              value={withdrawDescription}
              onChange={(e) => setWithdrawDescription(e.target.value)}
              className={`mt-1 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
              }`}
            />
          </div>
          <Button 
            onClick={handleWithdraw} 
            className="w-full bg-red-600 hover:bg-red-700"
            disabled={!withdrawAmount || !withdrawDescription}
          >
            Withdraw Funds
          </Button>
        </CardContent>
      </Card>

      {/* Transfer Form */}
      <TransferForm
        transferAmount={transferAmount}
        setTransferAmount={setTransferAmount}
        recipientAccount={recipientAccount}
        setRecipientAccount={setRecipientAccount}
        onTransfer={handleTransfer}
        transferDescription={transferDescription}
        setTransferDescription={setTransferDescription}
        isDarkMode={isDarkMode}
      />

      {/* Admin Access Card */}
      <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader className="pb-4">
          <CardTitle className={`flex items-center space-x-2 text-lg sm:text-xl transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Settings className="h-5 w-5 text-purple-600" />
            <span>Admin Access</span>
          </CardTitle>
          <CardDescription className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Access admin features</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/admin">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Go to Admin Panel
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForms;
