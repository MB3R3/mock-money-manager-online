import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAccountLookup, lookupAccountName } from '@/hooks/useAccountLookup';
import { supabase } from '@/integrations/supabase/client';

interface TransactionFormsProps {
  transferAmount: string;
  setTransferAmount: (amount: string) => void;
  recipientAccount: string;
  setRecipientAccount: (account: string) => void;
  onTransfer: (description: string, recipientAccount: string) => void;
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { lookupAccount, isLookingUp, lookupResult, clearLookup } = useAccountLookup();

  // Clear lookup when recipient account changes
  useEffect(() => {
    if (lookupResult) {
      clearLookup();
    }
  }, [recipientAccount]);



  const handleAccountLookup = async () => {
    if (recipientAccount && recipientAccount.length === 10) {
      await lookupAccount(recipientAccount);
    }
  };

  const handleRecipientAccountChange = (value: string) => {
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    setRecipientAccount(numericValue);
  };

  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (transferAmount && recipientAccount && transferDescription.trim() && lookupResult?.success) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmTransfer = () => {
    onTransfer(transferDescription, recipientAccount);
    setTransferDescription('');
    setShowConfirmation(false);
    clearLookup();
  };

  const handleCancelTransfer = () => {
    setShowConfirmation(false);
  };

  const isFormValid = transferAmount && recipientAccount.length === 10 && transferDescription.trim();
  const canProceed = isFormValid && lookupResult?.success;

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
          {!showConfirmation ? (
            <form onSubmit={handleProceedToConfirm} className="space-y-4">
              <div>
                <Label htmlFor="transferAmount" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Amount</Label>
                <Input
                  id="transferAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
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
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="recipientAccount"
                    type="text"
                    placeholder="Enter 10-digit account number"
                    value={recipientAccount}
                    onChange={(e) => handleRecipientAccountChange(e.target.value)}
                    className={`flex-1 transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAccountLookup}
                    disabled={recipientAccount.length !== 10 || isLookingUp}
                    className={`px-3 transition-colors duration-300 ${
                      isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''
                    }`}
                  >
                    {isLookingUp ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {/* Account Lookup Result */}
                {lookupResult && (
                  <div className={`mt-2 p-3 rounded-lg flex items-center space-x-2 ${
                    lookupResult.success
                      ? isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-50 text-green-800'
                      : isDarkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-800'
                  }`}>
                    {lookupResult.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {lookupResult.success 
                        ? `Account found: ${lookupResult.name}`
                        : lookupResult.error
                      }
                    </span>
                  </div>
                )}
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
                disabled={!canProceed}
              >
                Proceed to Transfer
              </Button>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className={`font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Confirm Transfer Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className={`flex justify-between ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>Amount:</span>
                    <span className="font-medium">${parseFloat(transferAmount).toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>To:</span>
                    <span className="font-medium">{lookupResult?.name}</span>
                  </div>
                  <div className={`flex justify-between ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>Account:</span>
                    <span className="font-medium">{recipientAccount}</span>
                  </div>
                  <div className={`flex justify-between ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>Description:</span>
                    <span className="font-medium">{transferDescription}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={handleConfirmTransfer}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Confirm Transfer
                </Button>
                <Button
                  onClick={handleCancelTransfer}
                  variant="outline"
                  className={`flex-1 ${
                    isDarkMode ? 'border-gray-600 hover:bg-gray-700' : ''
                  }`}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};


export default TransactionForms;