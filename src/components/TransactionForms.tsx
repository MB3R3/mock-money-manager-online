
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight } from "lucide-react";

interface TransactionFormsProps {
  transferAmount: string;
  setTransferAmount: (amount: string) => void;
  recipientAccount: string;
  setRecipientAccount: (account: string) => void;
  onTransfer: (description: string) => void;
  isDarkMode: boolean;
  withdrawAmount?: string;
  setWithdrawAmount?: (amount: string) => void;
  onWithdraw?: (description: string) => void;
}

const TransactionForms = ({
  transferAmount,
  setTransferAmount,
  recipientAccount,
  setRecipientAccount,
  onTransfer,
  isDarkMode
}: TransactionFormsProps) => {
  const [transferDescription, setTransferDescription] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferAmount && recipientAccount && transferDescription.trim()) {
      onTransfer(transferDescription);
      setTransferDescription('');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Transfer Money Card */}
      <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <ArrowUpRight className="h-5 w-5 text-purple-600" />
            <span>Transfer Money</span>
          </CardTitle>
          <CardDescription className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Send money to another account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTransfer} className="space-y-4">
            <div>
              <Label htmlFor="transferAmount" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>Amount</Label>
              <Input
                id="transferAmount"
                type="number"
                placeholder="Enter amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className={`mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                }`}
              />
            </div>
            <div>
              <Label htmlFor="recipientAccount" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>Recipient Account Number</Label>
              <Input
                id="recipientAccount"
                type="text"
                placeholder="Enter account number"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
                className={`mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                }`}
              />
            </div>
            <div>
              <Label htmlFor="transferDescription" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>Description</Label>
              <Textarea
                id="transferDescription"
                placeholder="Enter transfer description"
                value={transferDescription}
                onChange={(e) => setTransferDescription(e.target.value)}
                className={`mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                }`}
                rows={3}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!transferAmount || !recipientAccount || !transferDescription.trim()}
            >
              Transfer Money
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForms;
