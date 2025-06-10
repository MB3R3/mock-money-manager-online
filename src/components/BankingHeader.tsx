
import React from 'react';
import { Banknote, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BankingHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const BankingHeader = ({ isDarkMode, toggleDarkMode }: BankingHeaderProps) => {
  return (
    <div className={`shadow-sm border-b transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Banknote className="h-6 w-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>SecureBank</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className={`h-4 w-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-yellow-500'
              }`} />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Moon className={`h-4 w-4 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-gray-400'
              }`} />
            </div>
            <div className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Welcome back, John Doe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingHeader;
