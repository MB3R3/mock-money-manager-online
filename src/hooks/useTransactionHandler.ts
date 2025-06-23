
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PendingTransaction } from '@/types';

interface UseTransactionHandlerProps {
  balance: number;
  setBalance: (balance: number) => void;
  loadTransactions: () => void;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
  transferAmount: string;
  setTransferAmount: (amount: string) => void;
  setRecipientAccount: (account: string) => void;
}

export const useTransactionHandler = ({
  balance,
  setBalance,
  loadTransactions,
  transferAmount,
  setTransferAmount,
  setRecipientAccount
}: UseTransactionHandlerProps) => {
  const { user } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingTransaction, setPendingTransaction] = useState<PendingTransaction | null>(null);

  const initiateTransaction = (type: 'transfer', amount: string, description: string, recipientAccount?: string) => {
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
    if (password !== (user as any)?.password) {
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
      
      if (type === 'transfer') {
        setTransferAmount('');
        setRecipientAccount('');
      }

      let successMessage = '';
      if (type === 'transfer') {
        successMessage = `$${amount.toFixed(2)} has been transferred to account ****${recipientAccount?.slice(-4)}.`;
      }

      toast({
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Successful!`,
        description: successMessage,
      });

      loadTransactions();

    } catch (error) {
      console.error('Transaction error:', error);
      toast({
        title: "Transaction Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    }

    setShowPasswordModal(false);
    setPassword('');
    setPendingTransaction(null);
  };

  const cancelTransaction = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPendingTransaction(null);
  };

  const handleTransfer = (description: string) => {
    initiateTransaction('transfer', transferAmount, description, undefined);
  };

  return {
    showPasswordModal,
    password,
    setPassword,
    pendingTransaction,
    verifyPassword,
    cancelTransaction,
    handleTransfer
  };
};
