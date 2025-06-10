
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import BankingHeader from '@/components/BankingHeader';
import BalanceCard from '@/components/BalanceCard';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import PasswordModal from '@/components/PasswordModal';
import QuickStats from '@/components/QuickStats';

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  time: string;
  description: string;
}

const Index = () => {
  const [balance, setBalance] = useState(2500.75);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingTransaction, setPendingTransaction] = useState<{type: 'deposit' | 'withdrawal', amount: number} | null>(null);
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
      type: 'deposit',
      amount: 500,
      date: '2024-06-07',
      time: '16:45',
      description: 'Mobile Check Deposit'
    }
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const initiateTransaction = (type: 'deposit' | 'withdrawal', amount: string) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a valid ${type} amount.`,
        variant: "destructive",
      });
      return;
    }

    if (type === 'withdrawal' && parsedAmount > balance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type, amount: parsedAmount });
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

    const { type, amount } = pendingTransaction;
    
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      description: `Mobile App ${type === 'deposit' ? 'Deposit' : 'Withdrawal'}`
    };

    if (type === 'deposit') {
      setBalance(prev => prev + amount);
      setDepositAmount('');
    } else {
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
    }

    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} Successful!`,
      description: `$${amount.toFixed(2)} has been ${type === 'deposit' ? 'deposited to' : 'withdrawn from'} your account.`,
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BalanceCard balance={balance} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TransactionForms
            depositAmount={depositAmount}
            setDepositAmount={setDepositAmount}
            withdrawAmount={withdrawAmount}
            setWithdrawAmount={setWithdrawAmount}
            onDeposit={() => initiateTransaction('deposit', depositAmount)}
            onWithdraw={() => initiateTransaction('withdrawal', withdrawAmount)}
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
