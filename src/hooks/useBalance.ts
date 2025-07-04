import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useBalance = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (user) {
      setBalance(user.balance || 0);
    }
  }, [user]);

  return {
    balance,
    setBalance
  };
};