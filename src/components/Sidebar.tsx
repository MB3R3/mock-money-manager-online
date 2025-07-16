// src/components/Sidebar.tsx

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const getLinkStyle = (path: string) => {
    const baseStyle = "flex items-center p-3 rounded-lg transition-colors duration-200 text-sm font-medium";
    const isActive = isActivePath(path);
    
    if (isActive) {
      return `${baseStyle} bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500`;
    }
    
    return `${baseStyle} hover:bg-blue-50 dark:hover:bg-gray-700 ${
      isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
    }`;
  };

  const navLinks = (
    <nav className="flex flex-col space-y-1 px-2">
      <Link to="/" className={getLinkStyle('/')}>
        <Home className="w-5 h-5 mr-3" /> Dashboard
      </Link>
      <Link to="/virtual-cards" className={getLinkStyle('/virtual-cards')}>
        <CreditCard className="w-5 h-5 mr-3" /> Virtual Cards
      </Link>
      <Link to="/account-summary" className={getLinkStyle('/account-summary')}>
        <FileText className="w-5 h-5 mr-3" /> Account Summary
      </Link>
      <Link to="/my-account" className={getLinkStyle('/my-account')}>
        <Settings className="w-5 h-5 mr-3" /> My Account
      </Link>
      <Link to="/account-settings" className={getLinkStyle('/account-settings')}>
        <Settings className="w-5 h-5 mr-3" /> Account Settings
      </Link>
      <Link to="/kyc-status" className={getLinkStyle('/kyc-status')}>
        <UserCheck className="w-5 h-5 mr-3" /> KYC Status
      </Link>
      <Link to="/local-transfer" className={getLinkStyle('/local-transfer')}>
        <Send className="w-5 h-5 mr-3" /> Local Transfer
      </Link>
      <Link to="/pay-bill" className={getLinkStyle('/pay-bill')}>
        <FileMinus className="w-5 h-5 mr-3" /> Pay Bill
      </Link>
      <Link to="/support" className={getLinkStyle('/support')}>
        <HelpCircle className="w-5 h-5 mr-3" /> Support
      </Link>
    </nav>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* User Profile Section */}
      <div className="flex-shrink-0 px-4 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center text-center">
          {user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="w-16 h-16 rounded-full mb-3 object-cover border-2 border-gray-200 dark:border-gray-600"
            />
          ) : (
            <div className="w-16 h-16 rounded-full mb-3 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                {user.Name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <h2 className={`text-lg font-semibold mb-1 truncate max-w-full ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {user.Name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            Account #{user.account_number.toString()}
          </p>
          {user.kyc_status && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mt-2">
              KYC: {user.kyc_status}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 overflow-y-auto">
        {navLinks}
      </div>

      {/* Footer (optional) */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          © 2025 Your Bank
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block lg:fixed lg:inset-y-0 lg:z-50 lg:w-64">
        <div className="h-full border-r border-gray-200 dark:border-gray-700">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile sidebar */}
          <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
            <div className="relative h-full">
              {/* Close button */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-label="Close sidebar"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Sidebar content */}
              <div className="h-full border-r border-gray-200 dark:border-gray-700">
                {sidebarContent}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;