// src/components/Sidebar.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home, CreditCard, Settings, HelpCircle, FileText, UserCheck, Send, FileMinus, X, Menu
} from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
  user: {
    Name: string;
    account_number: number;
    profile_picture?: string;
    kyc_status?: string;
  };
}

const Sidebar = ({ isDarkMode, user }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkStyle = `flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-blue-100 dark:hover:bg-gray-700 ${
    isDarkMode ? 'text-white' : 'text-gray-800'
  }`;

  const navLinks = (
    <nav className="flex flex-col space-y-2">
      <Link to="/" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <Home className="w-4 h-4 mr-2" /> Dashboard
      </Link>
      <Link to="/virtual-cards" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <CreditCard className="w-4 h-4 mr-2" /> Virtual Cards
      </Link>
      <Link to="/account-summary" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <FileText className="w-4 h-4 mr-2" /> Account Summary
      </Link>
      <Link to="/my-account" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <Settings className="w-4 h-4 mr-2" /> My Account
      </Link>
      <Link to="/account-settings" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <Settings className="w-4 h-4 mr-2" /> Account Settings
      </Link>
      <Link to="/kyc-status" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <UserCheck className="w-4 h-4 mr-2" /> KYC Status
      </Link>
      <Link to="/local-transfer" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <Send className="w-4 h-4 mr-2" /> Local Transfer
      </Link>
      <Link to="/pay-bill" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <FileMinus className="w-4 h-4 mr-2" /> Pay Bill
      </Link>
      <Link to="/support" className={linkStyle} onClick={() => setMobileOpen(false)}>
        <HelpCircle className="w-4 h-4 mr-2" /> Support
      </Link>
    </nav>
  );

  const sidebarContent = (
    <div className="h-full w-64 px-4 py-6 space-y-6 overflow-y-auto bg-white dark:bg-gray-900 z-40">
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
      {navLinks}
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-600 dark:text-white focus:outline-none"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-40 transition-transform transform translate-x-0">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-600 dark:text-white focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
