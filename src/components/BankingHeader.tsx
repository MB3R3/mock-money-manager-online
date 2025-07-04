import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut, User, Menu, X } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface BankingHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

const BankingHeader = ({ isDarkMode, toggleDarkMode, onLogout }: BankingHeaderProps) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
              <span className="text-white font-bold text-xl">💳</span>
            </div>
            <div className="min-w-0">
              <h1 className={`text-lg sm:text-xl font-bold transition-colors duration-300 truncate ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                SecureBank
              </h1>
              <p className={`text-xs sm:text-sm transition-colors duration-300 hidden sm:block ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Your trusted banking partner
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <User className="h-4 w-4 flex-shrink-0" />
                <span className={`text-sm font-medium transition-colors duration-300 truncate max-w-48 ${
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t transition-colors duration-300 ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user && (
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <User className="h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <span className={`text-sm font-medium transition-colors duration-300 block ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user.Name}
                    </span>
                    <span className={`text-xs transition-colors duration-300 block ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Account: {user.account_number}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-2 pt-2">
                <Button
                  variant="ghost"
                  onClick={toggleDarkMode}
                  className={`flex-1 justify-start transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className={`flex-1 justify-start transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default BankingHeader;