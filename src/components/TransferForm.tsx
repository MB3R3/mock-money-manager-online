
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface TransferFormProps {
  transferAmount: string;
  setTransferAmount: (value: string) => void;
  recipientAccount: string;
  setRecipientAccount: (value: string) => void;
  transferDescription: string;
  setTransferDescription: (value: string) => void;
  onTransfer: () => void;
  isDarkMode: boolean;
}

const TransferForm = ({
  transferAmount,
  setTransferAmount,
  recipientAccount,
  setRecipientAccount,
  transferDescription,
  setTransferDescription,
  onTransfer,
  isDarkMode
}: TransferFormProps) => {
  return (
    <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
    }`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <Send className="h-5 w-5 text-blue-600" />
          <span>Bank Transfer</span>
        </CardTitle>
        <CardDescription className={`transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>Transfer money to another bank account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label htmlFor="transferDescription" className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Description</Label>
          <Input
            id="transferDescription"
            type="text"
            placeholder="Enter transaction description"
            value={transferDescription}
            onChange={(e) => setTransferDescription(e.target.value)}
            className={`mt-1 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
            }`}
          />
        </div>
        <Button 
          onClick={onTransfer} 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!transferAmount || !recipientAccount || !transferDescription}
        >
          Transfer Funds
        </Button>
      </CardContent>
    </Card>
  );
};

export default TransferForm;
