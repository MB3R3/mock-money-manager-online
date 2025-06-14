
import { useAuth } from '@/contexts/AuthContext';
import BankingHeader from '@/components/BankingHeader';
import BalanceCard from '@/components/BalanceCard';
import QuickStats from '@/components/QuickStats';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import WelcomeMessage from '@/components/WelcomeMessage';
import PasswordModal from '@/components/PasswordModal';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useBalance } from '@/hooks/useBalance';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionHandler } from '@/hooks/useTransactionHandler';
import { useState } from 'react';

const Index = () => {
  const { user, isLoading, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { balance, setBalance } = useBalance();
  const { transactions, loadTransactions } = useTransactions();
  
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BankingHeader 
        toggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode} 
        onLogout={logout}
      />
      <main className="container mx-auto p-6">
        <WelcomeMessage />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard balance={balance} />
            <QuickStats transactions={transactions} isDarkMode={isDarkMode} />
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
          </div>
          <div>
            <TransactionHistory transactions={transactions} isDarkMode={isDarkMode} />
          </div>
        </div>
      </main>

      <PasswordModal
        isOpen={showPasswordModal}
        onCancel={cancelTransaction}
        onConfirm={verifyPassword}
        password={password}
        setPassword={setPassword}
        transactionType={pendingTransaction?.type || 'withdrawal'}
        amount={pendingTransaction?.amount || 0}
        recipientAccount={pendingTransaction?.recipientAccount}
      />
    </div>
  );
};

export default Index;
