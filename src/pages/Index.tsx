
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import BankingHeader from '@/components/BankingHeader';
import BalanceCard from '@/components/BalanceCard';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import PasswordModal from '@/components/PasswordModal';
import AdminModal from '@/components/AdminModal';
import QuickStats from '@/components/QuickStats';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  time: string;
  description: string;
}

const Index = () => {
  const [balance, setBalance] = useState(2500.75);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<{type: 'deposit' | 'withdrawal' | 'transfer', amount: number, recipientAccount?: string} | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'deposit',
      amount: 1000,
      date: '2024-06-09',
      time: '14:30',
      description: 'Direct Deposit - Salary'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 250,
      date: '2024-06-08',
      time: '10:15',
      description: 'ATM Withdrawal'
    },
    {
      id: 3,
      type: 'transfer',
      amount: 500,
      date: '2024-06-07',
      time: '16:45',
      description: 'Transfer to Account ****5678'
    }
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const initiateTransaction = (type: 'deposit' | 'withdrawal' | 'transfer', amount: string, recipientAccount?: string) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a valid ${type} amount.`,
        variant: "destructive",
      });
      return;
    }

    if ((type === 'withdrawal' || type === 'transfer') && parsedAmount > balance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this transaction.",
        variant: "destructive",
      });
      return;
    }

    if (type === 'transfer' && !recipientAccount) {
      toast({
        title: "Missing Account Number",
        description: "Please enter a recipient account number.",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type, amount: parsedAmount, recipientAccount });
    setShowPasswordModal(true);
  };

  const verifyPassword = () => {
    if (password !== '1234') {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!pendingTransaction) return;

    const { type, amount, recipientAccount } = pendingTransaction;
    
    let description = '';
    if (type === 'deposit') {
      description = 'Mobile App Deposit';
    } else if (type === 'withdrawal') {
      description = 'Mobile App Withdrawal';
    } else if (type === 'transfer') {
      description = `Transfer to Account ****${recipientAccount?.slice(-4)}`;
    }

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      description
    };

    if (type === 'deposit') {
      setBalance(prev => prev + amount);
      setDepositAmount('');
    } else if (type === 'withdrawal') {
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
    } else if (type === 'transfer') {
      setBalance(prev => prev - amount);
      setTransferAmount('');
      setRecipientAccount('');
    }

    setTransactions(prev => [newTransaction, ...prev]);
    
    let successMessage = '';
    if (type === 'deposit') {
      successMessage = `$${amount.toFixed(2)} has been deposited to your account.`;
    } else if (type === 'withdrawal') {
      successMessage = `$${amount.toFixed(2)} has been withdrawn from your account.`;
    } else if (type === 'transfer') {
      successMessage = `$${amount.toFixed(2)} has been transferred to account ****${recipientAccount?.slice(-4)}.`;
    }

    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Successful!`,
      description: successMessage,
    });

    // Reset modal state
    setShowPasswordModal(false);
    setPassword('');
    setPendingTransaction(null);
  };

  const cancelTransaction = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPendingTransaction(null);
  };

  const handleAdminAccess = () => {
    setShowAdminModal(true);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setAdminPassword('');
  };

  const handleAdminClose = () => {
    setShowAdminModal(false);
    setIsAdminLoggedIn(false);
    setAdminPassword('');
  };

  const handleDeposit = () => {
    initiateTransaction('deposit', depositAmount);
    setShowAdminModal(false);
    setIsAdminLoggedIn(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      <BankingHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <PasswordModal
        isOpen={showPasswordModal}
        password={password}
        setPassword={setPassword}
        onConfirm={verifyPassword}
        onCancel={cancelTransaction}
        pendingTransaction={pendingTransaction}
        isDarkMode={isDarkMode}
      />

      <AdminModal
        isOpen={showAdminModal}
        onClose={handleAdminClose}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        onAdminLogin={handleAdminLogin}
        isAdminLoggedIn={isAdminLoggedIn}
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        onDeposit={handleDeposit}
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
            onWithdraw={() => initiateTransaction('withdrawal', withdrawAmount)}
            onTransfer={() => initiateTransaction('transfer', transferAmount, recipientAccount)}
            onAdminAccess={handleAdminAccess}
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
