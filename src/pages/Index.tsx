
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BankingHeader from '@/components/BankingHeader';
import BalanceCard from '@/components/BalanceCard';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import PasswordModal from '@/components/PasswordModal';
import QuickStats from '@/components/QuickStats';
import { useTransactions } from '@/hooks/useTransactions';
import { useBalance } from '@/hooks/useBalance';
import { useTransactionHandler } from '@/hooks/useTransactionHandler';
import { useDarkMode } from '@/hooks/useDarkMode';

const Index = () => {
  const { user, logout } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');

  const { transactions, loadTransactions } = useTransactions();
  const { balance, setBalance } = useBalance();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const {
    showPasswordModal,
    password,
    setPassword,
    pendingTransaction,
    verifyPassword,
    cancelTransaction,
    handleWithdraw,
    handleTransfer
  } = useTransactionHandler({
    balance,
    setBalance,
    loadTransactions,
    withdrawAmount,
    setWithdrawAmount,
    transferAmount,
    setTransferAmount,
    setRecipientAccount
  });

  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute, but just in case
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <BankingHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onLogout={logout} />

      <PasswordModal
        isOpen={showPasswordModal}
        password={password}
        setPassword={setPassword}
        onConfirm={verifyPassword}
        onCancel={cancelTransaction}
        pendingTransaction={pendingTransaction}
        isDarkMode={isDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <BalanceCard balance={balance} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <TransactionForms
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={setWithdrawAmount}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            recipientAccount={recipientAccount}
            setRecipientAccount={setRecipientAccount}
            onWithdraw={handleWithdraw}
            onTransfer={handleTransfer}
            isDarkMode={isDarkMode}
          />

          <TransactionHistory transactions={transactions} isDarkMode={isDarkMode} />
        </div>

        <QuickStats transactions={transactions} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default Index;
