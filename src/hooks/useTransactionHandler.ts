
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

  const initiateTransaction = async (type: 'transfer' | 'deposit', amount: string, description: string, recipientAccount?: string) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a valid ${type} amount.`,
        variant: "destructive",
      });
      return;
    }

    if (type === 'transfer' && parsedAmount > balance) {
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

    // Validate recipient account exists for transfers
    if (type === 'transfer' && recipientAccount) {
      const { data: recipientUser, error } = await supabase
        .from('Users')
        .select('id, account_number')
        .eq('account_number', parseInt(recipientAccount))
        .maybeSingle();

      if (error) {
        console.error('Error checking recipient account:', error);
        toast({
          title: "Error",
          description: "Error validating recipient account.",
          variant: "destructive",
        });
        return;
      }

      if (!recipientUser) {
        toast({
          title: "Invalid Account Number",
          description: "The recipient account number does not exist.",
          variant: "destructive",
        });
        return;
      }

      // Check if user is trying to transfer to their own account
      if (recipientUser.account_number === user?.account_number) {
        toast({
          title: "Invalid Transfer",
          description: "You cannot transfer money to your own account.",
          variant: "destructive",
        });
        return;
      }
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

      // For deposits, add to balance; for transfers, subtract from balance
      const newBalance = type === 'deposit' ? balance + amount : balance - amount;
      
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

      // If it's a transfer, also add the amount to the recipient's balance
      if (type === 'transfer' && recipientAccount) {
        const { data: recipientUser } = await supabase
          .from('Users')
          .select('balance')
          .eq('account_number', parseInt(recipientAccount))
          .single();

        if (recipientUser) {
          const recipientNewBalance = (recipientUser.balance || 0) + amount;
          
          await supabase
            .from('Users')
            .update({ balance: recipientNewBalance })
            .eq('account_number', parseInt(recipientAccount));

          // Create a deposit transaction for the recipient
          await supabase
            .from('transactions')
            .insert({
              user_id: (await supabase
                .from('Users')
                .select('id')
                .eq('account_number', parseInt(recipientAccount))
                .single()).data?.id,
              type: 'deposit',
              amount,
              description: `Transfer received from account ****${user.account_number?.toString().slice(-4)}`
            });
        }
      }

      setBalance(newBalance);
      
      if (type === 'transfer') {
        setTransferAmount('');
        setRecipientAccount('');
      }

      let successMessage = '';
      if (type === 'transfer') {
        successMessage = `$${amount.toFixed(2)} has been transferred to account ****${recipientAccount?.slice(-4)}.`;
      } else if (type === 'deposit') {
        successMessage = `$${amount.toFixed(2)} has been deposited to your account.`;
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

  const handleTransfer = (description: string, recipientAccount: string) => {
    initiateTransaction('transfer', transferAmount, description, recipientAccount);
  };

  const handleDeposit = (amount: string, description: string) => {
    initiateTransaction('deposit', amount, description);
  };

  return {
    showPasswordModal,
    password,
    setPassword,
    pendingTransaction,
    verifyPassword,
    cancelTransaction,
    handleTransfer,
    handleDeposit
  };
};
