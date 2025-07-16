// src/components/Layout.tsx

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import BankingHeader from '@/components/BankingHeader';
import Sidebar from '@/components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar isDarkMode={isDarkMode} user={user} />

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}
        <BankingHeader 
          toggleDarkMode={toggleDarkMode} 
          isDarkMode={isDarkMode} 
          onLogout={logout} 
        />

        {/* Page content */}
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;