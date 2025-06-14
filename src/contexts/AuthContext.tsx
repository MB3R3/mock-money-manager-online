
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: number;
  Name: string | null;
  balance: number | null;
  account_number: number | null;
  password?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (accountNumber: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('bankingUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (accountNumber: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Set the user context for RLS
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: '1', // We'll update this after we find the user
      } as any);

      // First, try to find the user without RLS interference
      const { data: userData, error } = await supabase
        .from('Users')
        .select('*')
        .eq('account_number', parseInt(accountNumber))
        .eq('password', password)
        .single();

      if (error || !userData) {
        return { success: false, error: 'Invalid account number or password' };
      }

      // Set the correct user context for RLS
      await supabase.rpc('set_config', {
        setting_name: 'app.current_user_id',
        setting_value: userData.id.toString(),
      } as any);

      // Check if this is an admin user (account 9999)
      const isAdmin = userData.account_number === 9999;
      if (isAdmin) {
        await supabase.rpc('set_config', {
          setting_name: 'app.user_role',
          setting_value: 'admin',
        } as any);
      }

      const userWithAdmin = { ...userData, isAdmin, password };
      setUser(userWithAdmin);
      localStorage.setItem('bankingUser', JSON.stringify(userWithAdmin));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bankingUser');
    // Clear RLS settings
    supabase.rpc('set_config', {
      setting_name: 'app.current_user_id',
      setting_value: '',
    } as any);
    supabase.rpc('set_config', {
      setting_name: 'app.user_role',
      setting_value: '',
    } as any);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
