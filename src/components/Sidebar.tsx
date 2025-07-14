// src/components/Sidebar.tsx

import { Link } from 'react-router-dom';
import { Home, CreditCard, Settings, HelpCircle, FileText, UserCheck, Send, FileMinus } from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  user: {
    Name: string;
    account_number: number;
    profile_picture?: string; // Optional profile picture URL
    kyc_status?: string;
  };
}

const Sidebar = ({ isDarkMode, user }: SidebarProps) => {
  const linkStyle = `flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-gray-700 ${
    isDarkMode ? 'text-white' : 'text-gray-800'
  }`;

  return (
    <aside className="h-full w-64 px-4 py-6 space-y-6 overflow-y-auto">
      <div className="flex flex-col items-center mb-6">
        {user.profile_picture && (
          <img
            src={user.profile_picture}
            alt="Profile"
            className="w-16 h-16 rounded-full mb-2 object-cover border"
          />
        )}
        <span className="text-lg font-bold mb-1 truncate">
          {user.Name}
        </span>
        <span className="text-sm text-gray-500 truncate">
          Account #{user.account_number.toString()}
        </span>
        {user.kyc_status && (
          <span className="text-xs mt-1 px-2 py-0.5 rounded bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-300">
            KYC: {user.kyc_status}
          </span>
        )}
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

        <Link to="/kyc-status" className={linkStyle}>
          <UserCheck className="w-4 h-4 mr-2" /> KYC Status
        </Link>

        <Link to="/local-transfer" className={linkStyle}>
          <Send className="w-4 h-4 mr-2" /> Local Transfer
        </Link>

        <Link to="/pay-bill" className={linkStyle}>
          <FileMinus className="w-4 h-4 mr-2" /> Pay Bill
        </Link>

        <Link to="/support" className={linkStyle}>
          <HelpCircle className="w-4 h-4 mr-2" /> Support
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
