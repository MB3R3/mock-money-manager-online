import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { PendingTransaction } from '@/types';

interface PasswordModalProps {
  isOpen: boolean;
  password: string;
  setPassword: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  pendingTransaction: PendingTransaction | null;
  isDarkMode: boolean;
}

const PasswordModal = ({
  isOpen,
  password,
  setPassword,
  onConfirm,
  onCancel,
  pendingTransaction,
  isDarkMode
}: PasswordModalProps) => {
  if (!isOpen) return null;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && password) {
      onConfirm();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <Card 
        className={`w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-4">
          <CardTitle className={`flex items-center space-x-2 text-lg sm:text-xl transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 flex-shrink-0" />
            <span>Verify Transaction</span>
          </CardTitle>
          <CardDescription className={`text-sm sm:text-base transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enter your password to confirm the{' '}
            <span className="font-medium">
              {pendingTransaction?.type}
            </span>
            {' '}of{' '}
            <span className="font-medium text-green-600">
              ${pendingTransaction?.amount.toFixed(2)}
            </span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label 
              htmlFor="password" 
              className={`text-sm sm:text-base transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              className={`transition-colors duration-300 text-sm sm:text-base ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'placeholder:text-gray-500'
              }`}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-2">
            <Button 
              onClick={onConfirm} 
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
              disabled={!password}
            >
              Confirm Transaction
            </Button>
            <Button 
              onClick={onCancel} 
              variant="outline"
              className={`w-full sm:flex-1 text-sm sm:text-base py-2 sm:py-3 transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-200 hover:bg-gray-700 hover:text-white' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordModal;