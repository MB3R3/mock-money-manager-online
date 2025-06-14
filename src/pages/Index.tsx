
import React, { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import BankingHeader from '@/components/BankingHeader';
import BalanceCard from '@/components/BalanceCard';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import PasswordModal from '@/components/PasswordModal';
import QuickStats from '@/components/QuickStats';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  time: string;
  description: string;
  recipient_account_number?: number | null;
}

const Index = () => {
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState(user?.balance || 0);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingTransaction, setPendingTransaction] = useState<{type: 'withdrawal' | 'transfer', amount: number, recipientAccount?: string, description: string} | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      setBalance(user.balance || 0);
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading transactions:', error);
        return;
      }

      const formattedTransactions: Transaction[] = data.map(t => ({
        id: t.id,
        type: t.type as 'deposit' | 'withdrawal' | 'transfer',
        amount: Number(t.amount),
        date: new Date(t.created_at).toISOString().split('T')[0],
        time: new Date(t.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        description: t.description || '',
        recipient_account_number: t.recipient_account_number
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const initiateTransaction = (type: 'withdrawal' | 'transfer', amount: string, description: string, recipientAccount?: string) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a valid ${type} amount.`,
        variant: "destructive",
      });
      return;
    }

    if (parsedAmount > balance) {
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

    if (!description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please enter a transaction description.",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type, amount: parsedAmount, recipientAccount, description });
    setShowPasswordModal(true);
  };

  const verifyPassword = async () => {
    if (password !== user?.password) {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!pendingTransaction || !user) return;

    const { type, amount, recipientAccount, description } = pendingTransaction;

    try {
      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type,
          amount,
          recipient_account_number: recipientAccount ? parseInt(recipientAccount) : null,
          description
        });

      if (transactionError) {
        console.error('Transaction error:', transactionError);
        toast({
          title: "Transaction Failed",
          description: "There was an error processing your transaction.",
          variant: "destructive",
        });
        return;
      }

      // Update user balance
      const newBalance = balance - amount;
      const { error: balanceError } = await supabase
        .from('Users')
        .update({ balance: newBalance })
        .eq('id', user.id);

      if (balanceError) {
        console.error('Balance update error:', balanceError);
        toast({
          title: "Transaction Failed",
          description: "There was an error updating your balance.",
          variant: "destructive",
        });
        return;
      }

      setBalance(newBalance);
      
      if (type === 'withdrawal') {
        setWithdrawAmount('');
      } else if (type === 'transfer') {
        setTransferAmount('');
        setRecipientAccount('');
      }

      let successMessage = '';
      if (type === 'withdrawal') {
        successMessage = `$${amount.toFixed(2)} has been withdrawn from your account.`;
      } else if (type === 'transfer') {
        successMessage = `$${amount.toFixed(2)} has been transferred to account ****${recipientAccount?.slice(-4)}.`;
      }

      toast({
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Successful!`,
        description: successMessage,
      });

      // Reload transactions
      loadTransactions();

    } catch (error) {
      console.error('Transaction error:', error);
      toast({
        title: "Transaction Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    }

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

  const handleWithdraw = (description: string) => {
    initiateTransaction('withdrawal', withdrawAmount, description);
  };

  const handleTransfer = (description: string) => {
    initiateTransaction('transfer', transferAmount, description, recipientAccount);
  };

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
