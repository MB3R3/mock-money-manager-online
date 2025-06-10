
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Lock } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  adminPassword: string;
  setAdminPassword: (value: string) => void;
  onAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  depositAmount: string;
  setDepositAmount: (value: string) => void;
  onDeposit: () => void;
  isDarkMode: boolean;
}

const AdminModal = ({
  isOpen,
  onClose,
  adminPassword,
  setAdminPassword,
  onAdminLogin,
  isAdminLoggedIn,
  depositAmount,
  setDepositAmount,
  onDeposit,
  isDarkMode
}: AdminModalProps) => {
  const handleAdminLogin = () => {
    if (adminPassword === 'B==3') {
      onAdminLogin();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-md mx-auto transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
      }`}>
        <DialogHeader>
          <DialogTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Lock className="h-5 w-5 text-blue-600" />
            <span>Admin Access</span>
          </DialogTitle>
          <DialogDescription className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {!isAdminLoggedIn ? 'Enter admin password to access admin features' : 'Admin Panel'}
          </DialogDescription>
        </DialogHeader>

        {!isAdminLoggedIn ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminPassword" className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Admin Password
              </Label>
              <Input
                id="adminPassword"
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className={`mt-1 transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                }`}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdminLogin} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Card className={`shadow-lg transition-all duration-300 ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Coins className="h-5 w-5 text-green-600" />
                <span>Make a Deposit</span>
              </CardTitle>
              <CardDescription className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Add money to the account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminDeposit" className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Amount</Label>
                <Input
                  id="adminDeposit"
                  type="number"
                  placeholder="Enter amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className={`mt-1 transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : ''
                  }`}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={onDeposit} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!depositAmount}
                >
                  Deposit Funds
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
