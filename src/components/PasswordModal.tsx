
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className={`w-96 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Lock className="h-5 w-5 text-blue-600" />
            <span>Verify Transaction</span>
          </CardTitle>
          <CardDescription className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Enter your password to confirm the {pendingTransaction?.type} of ${pendingTransaction?.amount.toFixed(2)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="password" className={`transition-colors duration-300 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
              }`}
            />
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={onConfirm} 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!password}
            >
              Confirm
            </Button>
            <Button 
              onClick={onCancel} 
              variant="outline"
              className={`flex-1 transition-colors duration-300 ${
                isDarkMode ? 'border-gray-600 text-gray-200 hover:bg-gray-700' : ''
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
