// src/pages/Transfer.tsx

import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useBalance } from '@/hooks/useBalance';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionHandler } from '@/hooks/useTransactionHandler';
import PasswordModal from '@/components/PasswordModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const { user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const { balance, setBalance } = useBalance();
  const { loadTransactions } = useTransactions();
  const navigate = useNavigate();

  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [transferDescription, setTransferDescription] = useState('');

  useTransactionHandler({
    balance,
    setBalance,
    loadTransactions,
    withdrawAmount: '',
    setWithdrawAmount: () => {},
    transferAmount,
    setTransferAmount,
    setRecipientAccount
  });

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSubmitTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update balance immediately without validation
    const amount = parseFloat(transferAmount);
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      
      // Add transaction to history
      const newTransaction = {
        id: Date.now(),
        type: 'transfer',
        amount: amount,
        description: transferDescription || 'Transfer',
        recipient: recipientAccount,
        recipientName: recipientName,
        date: new Date().toISOString(),
        status: 'completed'
      };
      
      // Load transactions to update history
      loadTransactions();
      
      // Navigate to success page with transaction details
      navigate('/transfer-success', { 
        state: { 
          amount, 
          recipientAccount, 
          recipientName, 
          description: transferDescription || 'Transfer',
          transactionId: newTransaction.id
        } 
      });
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToHome}
          className={`mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'text-white' : 'text-gray-600'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Transfer Money
        </h1>
      </div>

      {/* Current Balance Display */}
      <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-800'}`}>
        <p className="text-sm text-gray-500 mb-1">Available Balance</p>
        <p className="text-2xl font-bold text-blue-600">${balance.toFixed(2)}</p>
      </div>

      {/* Transfer Form */}
      <form onSubmit={handleSubmitTransfer} className={`p-6 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-lg font-semibold mb-4">Transfer Details</h2>
        
        <div className="space-y-4">
          {/* Recipient Account */}
          <div>
            <label htmlFor="recipientAccount" className="block text-sm font-medium mb-2">
              Recipient Account Number
            </label>
            <input
              type="text"
              id="recipientAccount"
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter recipient account number"
              required
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label htmlFor="recipientName" className="block text-sm font-medium mb-2">
              Recipient Name (Optional)
            </label>
            <input
              type="text"
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter recipient name"
            />
          </div>

          {/* Transfer Amount */}
          <div>
            <label htmlFor="transferAmount" className="block text-sm font-medium mb-2">
              Amount to Transfer
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                id="transferAmount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className={`w-full p-3 pl-8 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                max={balance}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="transferDescription" className="block text-sm font-medium mb-2">
              Description (Optional)
            </label>
            <textarea
              id="transferDescription"
              value={transferDescription}
              onChange={(e) => setTransferDescription(e.target.value)}
              className={`w-full p-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter transfer description"
              rows={3}
            />
          </div>

          {/* Transfer Summary */}
          {transferAmount && (
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className="text-sm font-medium mb-2">Transfer Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>${parseFloat(transferAmount || '0').toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Total:</span>
                  <span>${parseFloat(transferAmount || '0').toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Remaining Balance:</span>
                  <span>${(balance - parseFloat(transferAmount || '0')).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!transferAmount || !recipientAccount || parseFloat(transferAmount || '0') <= 0 || parseFloat(transferAmount || '0') > balance}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Transfer Money
          </button>
        </div>
      </form>

      {/* Password Modal - Remove this since we're not validating */}
      {/* <PasswordModal
        isOpen={showPasswordModal}
        onCancel={cancelTransaction}
        onConfirm={verifyPassword}
        password={password}
        setPassword={setPassword}
        pendingTransaction={pendingTransaction}
        isDarkMode={isDarkMode}
      /> */}
    </div>
  );
};

export default Transfer;