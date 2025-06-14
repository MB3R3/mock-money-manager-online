
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import BankingHeader from '@/components/BankingHeader';
import BalanceCard from '@/components/BalanceCard';
import QuickStats from '@/components/QuickStats';
import TransactionForms from '@/components/TransactionForms';
import TransactionHistory from '@/components/TransactionHistory';
import WelcomeMessage from '@/components/WelcomeMessage';
import { useDarkMode } from '@/hooks/useDarkMode';

const Index = () => {
  const { user, isLoading } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <BankingHeader toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="container mx-auto p-6">
        <WelcomeMessage />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard />
            <QuickStats />
            <TransactionForms />
          </div>
          <div>
            <TransactionHistory />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
