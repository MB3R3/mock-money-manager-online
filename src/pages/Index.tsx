
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Banknote, Coins, History, Moon, Sun, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  time: string;
  description: string;
}

const Index = () => {
  const [balance, setBalance] = useState(2500.75);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingTransaction, setPendingTransaction] = useState<{type: 'deposit' | 'withdrawal', amount: number} | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'deposit',
      amount: 1000,
      date: '2024-06-09',
      time: '14:30',
      description: 'Direct Deposit - Salary'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 250,
      date: '2024-06-08',
      time: '10:15',
      description: 'ATM Withdrawal'
    },
    {
      id: 3,
      type: 'deposit',
      amount: 500,
      date: '2024-06-07',
      time: '16:45',
      description: 'Mobile Check Deposit'
    }
  ]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const initiateTransaction = (type: 'deposit' | 'withdrawal', amount: string) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: `Please enter a valid ${type} amount.`,
        variant: "destructive",
      });
      return;
    }

    if (type === 'withdrawal' && parsedAmount > balance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this withdrawal.",
        variant: "destructive",
      });
      return;
    }

    setPendingTransaction({ type, amount: parsedAmount });
    setShowPasswordModal(true);
  };

  const verifyPassword = () => {
    if (password !== '1234') {
      toast({
        title: "Invalid Password",
        description: "Please enter the correct password to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!pendingTransaction) return;

    const { type, amount } = pendingTransaction;
    
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      amount,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      description: `Mobile App ${type === 'deposit' ? 'Deposit' : 'Withdrawal'}`
    };

    if (type === 'deposit') {
      setBalance(prev => prev + amount);
      setDepositAmount('');
    } else {
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
    }

    setTransactions(prev => [newTransaction, ...prev]);
    
    toast({
      title: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} Successful!`,
      description: `$${amount.toFixed(2)} has been ${type === 'deposit' ? 'deposited to' : 'withdrawn from'} your account.`,
    });

    // Reset modal state
    setShowPasswordModal(false);
    setPassword('');
    setPendingTransaction(null);
  };

  const cancelTransaction = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPendingTransaction(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50'
    }`}>
      {/* Header */}
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

      {/* Password Modal */}
      {showPasswordModal && (
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
                  onClick={verifyPassword} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={!password}
                >
                  Confirm
                </Button>
                <Button 
                  onClick={cancelTransaction} 
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
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white/90 text-lg">Account Balance</CardTitle>
            <CardDescription className="text-blue-100">Checking Account •••• 4829</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">${balance.toFixed(2)}</div>
            <div className="text-blue-100 text-sm">Available Balance</div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Actions */}
          <div className="space-y-6">
            {/* Deposit Card */}
            <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
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
                }`}>Add money to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deposit" className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Amount</Label>
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className={`mt-1 transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                </div>
                <Button 
                  onClick={() => initiateTransaction('deposit', depositAmount)} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!depositAmount}
                >
                  Deposit Funds
                </Button>
              </CardContent>
            </Card>

            {/* Withdraw Card */}
            <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Banknote className="h-5 w-5 text-red-600" />
                  <span>Make a Withdrawal</span>
                </CardTitle>
                <CardDescription className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>Withdraw money from your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="withdraw" className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>Amount</Label>
                  <Input
                    id="withdraw"
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className={`mt-1 transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}
                  />
                </div>
                <Button 
                  onClick={() => initiateTransaction('withdrawal', withdrawAmount)} 
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!withdrawAmount}
                >
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <Card className={`shadow-lg transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardHeader>
              <CardTitle className={`flex items-center space-x-2 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <History className="h-5 w-5 text-blue-600" />
                <span>Recent Transactions</span>
              </CardTitle>
              <CardDescription className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Your latest account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-4 rounded-lg hover:opacity-80 transition-all duration-200 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <Coins className="h-4 w-4" />
                        ) : (
                          <Banknote className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className={`font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {transaction.description}
                        </div>
                        <div className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {transaction.date} at {transaction.time}
                        </div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'deposit' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {transactions.filter(t => t.type === 'deposit').length}
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Total Deposits</div>
            </CardContent>
          </Card>
          
          <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {transactions.filter(t => t.type === 'withdrawal').length}
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Total Withdrawals</div>
            </CardContent>
          </Card>
          
          <Card className={`text-center shadow-lg hover:shadow-xl transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600 mb-2">
                ${transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </div>
              <div className={`text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Total Deposited</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
