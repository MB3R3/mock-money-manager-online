
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Transaction } from '@/types';

export const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  return {
    transactions,
    loadTransactions
  };
};
