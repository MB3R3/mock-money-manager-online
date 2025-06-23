
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

interface User {
  id: number;
  Name: string | null;
  balance: number | null;
  account_number: number | null;
  email: string | null;
  password?: string;
  is_admin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (email: string, password: string, name: string) => Promise<{ error: any }>;
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
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('banking_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        return { error: { message: 'Invalid email or password' } };
      }

      setUser(data);
      localStorage.setItem('banking_user', JSON.stringify(data));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.Name}!`,
      });

      return { error: null };
    } catch (error) {
      return { error: { message: 'Login failed. Please try again.' } };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // Check if email already exists
      const { data: existingUser } = await supabase
        .from('Users')
        .select('email')
        .eq('email', email)
        .single();

      if (existingUser) {
        return { error: { message: 'Email already exists' } };
      }

      // Generate account number
      const accountNumber = Math.floor(Math.random() * 9000) + 1000;

      // Insert new user
      const { data, error } = await supabase
        .from('Users')
        .insert({
          Name: name,
          email: email,
          password: password,
          account_number: accountNumber,
          balance: 0,
          is_admin: false
        })
        .select()
        .single();

      if (error) {
        return { error: { message: 'Registration failed. Please try again.' } };
      }

      setUser(data);
      localStorage.setItem('banking_user', JSON.stringify(data));

      toast({
        title: "Registration Successful",
        description: `Welcome to SecureBank, ${data.Name}!`,
      });

      return { error: null };
    } catch (error) {
      return { error: { message: 'Registration failed. Please try again.' } };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('banking_user');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
