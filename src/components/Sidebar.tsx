// src/components/Sidebar.tsx

import { Link } from 'react-router-dom';
import { Home, CreditCard, Settings, HelpCircle, FileText } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  user: {
    Name: string;
    account_number: number;
  };
}

const Sidebar = ({ isDarkMode, user }: SidebarProps) => {
  const linkStyle = `flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-gray-700 ${
    isDarkMode ? 'text-white' : 'text-gray-800'
  }`;

  return (
    <aside className="h-full w-64 px-4 py-6 space-y-6 overflow-y-auto">
      <div className="flex flex-col items-start mb-6">
        <span className="text-lg font-bold mb-1 truncate">
          {user.Name}
        </span>
        <span className="text-sm text-gray-500 truncate">
          Account #{user.account_number.toString()}
        </span>
      </div>

      <nav className="flex flex-col space-y-2">
        <Link to="/" className={linkStyle}>
          <Home className="w-4 h-4 mr-2" /> Dashboard
        </Link>

        <Link to="/virtual-cards" className={linkStyle}>
          <CreditCard className="w-4 h-4 mr-2" /> Virtual Cards
        </Link>

        <Link to="/account-summary" className={linkStyle}>
          <FileText className="w-4 h-4 mr-2" /> Account Summary
        </Link>

        <Link to="/my-account" className={linkStyle}>
          <Settings className="w-4 h-4 mr-2" /> My Account
        </Link>

        <Link to="/account-settings" className={linkStyle}>
          <Settings className="w-4 h-4 mr-2" /> Account Settings
        </Link>

        <Link to="/support" className={linkStyle}>
          <HelpCircle className="w-4 h-4 mr-2" /> Support
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
