
import React from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, User } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface BankingHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

const BankingHeader = ({ isDarkMode, toggleDarkMode, onLogout }: BankingHeaderProps) => {
  const { user } = useAuth();
  
  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">💳</span>
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                SecureBank
              </h1>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your trusted banking partner
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <User className="h-4 w-4" />
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {user.Name} ({user.account_number})
                </span>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BankingHeader;
