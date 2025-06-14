
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Create a default demo user
    const demoUser: User = {
      id: 1,
      Name: "Demo User",
      balance: 1500.50,
      account_number: 1001,
      password: "demo123",
      isAdmin: false
    };
    
    setUser(demoUser);
    setIsLoading(false);
  }, []);

  const logout = () => {
    // For demo purposes, just reload the page
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
