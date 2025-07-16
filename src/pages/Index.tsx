// src/pages/Index.tsx

import { useAuth } from '@/contexts/AuthContext';
import BalanceCard from '@/components/BalanceCard';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import WelcomeMessage from '@/components/WelcomeMessage';
import PasswordModal from '@/components/PasswordModal';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useBalance } from '@/hooks/useBalance';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionHandler } from '@/hooks/useTransactionHandler';
import { useEffect, useState } from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  else if (hour < 18) return 'Good afternoon';
  else return 'Good evening';
};

const Index = () => {
  const { user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const { balance, setBalance } = useBalance();
  const { transactions, loadTransactions } = useTransactions();

  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [ipData, setIpData] = useState<{ ip: string; country_code: string } | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showLoanModal, setShowLoanModal] = useState(false);

  const {
    showPasswordModal,
    password,
    setPassword,
    pendingTransaction,
    verifyPassword,
    cancelTransaction,
    handleTransfer
  } = useTransactionHandler({
    balance,
    setBalance,
    loadTransactions,
    withdrawAmount: '',
    setWithdrawAmount: () => {},
    transferAmount,
    setTransferAmount,
    setRecipientAccount
  });

  useEffect(() => {
    fetch('https://ipapi.co/json')
      .then(res => res.json())
      .then(data => {
        setIpData({ ip: data.ip, country_code: data.country_code });
      });
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <WelcomeMessage />

      <h2 className={`text-xl font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {getGreeting()}, {user?.Name || 'User'} 👋
      </h2>

      {ipData && (
        <div className="flex items-center mb-4 text-sm text-gray-500">
          <img
            src={`https://flagcdn.com/w40/${ipData.country_code.toLowerCase()}.png`}
            alt="Country flag"
            className="w-5 h-5 mr-2 rounded-sm"
          />
          <span>Your IP: {ipData.ip}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BalanceCard balance={balance} accountNumber={user.account_number} />

          <div className="space-y-4">
            <div className={`p-6 rounded-xl shadow-md space-y-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">
                Loans and Lines of Credit
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Credit Score</h3>
                  <p className="text-2xl font-bold text-green-500">750</p>
                  <p className="text-sm text-gray-400 mt-1">Based on recent credit activity</p>
                </div>

                <div
                  onClick={() => setShowLoanModal(true)}
                  className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Business Support Loan</h3>
                  <p className="text-2xl font-bold text-blue-600">$600</p>
                  <p className="text-sm text-gray-400 mt-1">Active loan – repayment begins next month</p>
                </div>
              </div>
            </div>
          </div>

          <TransactionForms
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            recipientAccount={recipientAccount}
            setRecipientAccount={setRecipientAccount}
            onTransfer={handleTransfer}
            isDarkMode={isDarkMode}
          />
        </div>

        <div>
          <TransactionHistory
            transactions={transactions}
            isDarkMode={isDarkMode}
            onTransactionClick={setSelectedTransaction}
          />
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 w-[90%] max-w-md shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-lg font-bold mb-2">Transaction Details</h2>
            <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
            <p><strong>Bank:</strong> {selectedTransaction.bank || 'N/A'}</p>
            <p><strong>Sender:</strong> {selectedTransaction.sender || 'N/A'}</p>
            <p><strong>Description:</strong> {selectedTransaction.description || 'N/A'}</p>
            <button
              onClick={() => setSelectedTransaction(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Loan Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 w-[90%] max-w-md shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-lg font-bold mb-2">Business Support Loan Details</h2>
            <p><strong>Loan Amount:</strong> $600</p>
            <p><strong>Interest Rate:</strong> 5% per annum</p>
            <p><strong>Term:</strong> 12 months</p>
            <p><strong>Repayment Schedule:</strong> Monthly payments of $52.50</p>
            <button
              onClick={() => setShowLoanModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <PasswordModal
        isOpen={showPasswordModal}
        onCancel={cancelTransaction}
        onConfirm={verifyPassword}
        password={password}
        setPassword={setPassword}
        pendingTransaction={pendingTransaction}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Index;