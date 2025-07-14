import React, { useState, useEffect } from 'react';
import {
  Eye,
  EyeOff,
  CreditCard,
  ArrowUpDown,
  DollarSign,
  Smartphone,
  Shield,
  ShieldOff,
  Bell,
  TrendingUp,
  Gift,
  FileText,
  Phone,
  MessageCircle,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Plus,
  Minus,
  Building,
  PiggyBank,
  Home,
  TrendingDown
} from 'lucide-react';

// Types
interface Account {
  id: string;
  type: 'checking' | 'savings' | 'credit' | 'loan' | 'investment';
  name: string;
  accountNumber: string;
  balance: number;
  availableBalance?: number;
  creditLimit?: number;
  interestRate?: number;
  nextPaymentDue?: Date;
  nextPaymentAmount?: number;
  status: 'active' | 'frozen' | 'closed';
}

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  status: 'posted' | 'pending';
  category: string;
}

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  timestamp: Date;
}

interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: Date;
  type: 'bill' | 'transfer' | 'loan';
}

const AccountSummary: React.FC = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string>('checking-001');

  // Mock data - replace with actual API calls
  const accounts: Account[] = [
    {
      id: 'checking-001',
      type: 'checking',
      name: 'Primary Checking',
      accountNumber: '****4892',
      balance: 12450.50,
      availableBalance: 12200.50,
      status: 'active'
    },
    {
      id: 'savings-001',
      type: 'savings',
      name: 'High Yield Savings',
      accountNumber: '****7341',
      balance: 45230.75,
      availableBalance: 45230.75,
      interestRate: 4.5,
      status: 'active'
    },
    {
      id: 'credit-001',
      type: 'credit',
      name: 'Rewards Credit Card',
      accountNumber: '****9876',
      balance: 1245.30,
      creditLimit: 15000,
      status: 'active'
    },
    {
      id: 'loan-001',
      type: 'loan',
      name: 'Home Mortgage',
      accountNumber: '****5432',
      balance: 185000,
      nextPaymentDue: new Date('2025-08-01'),
      nextPaymentAmount: 1850.00,
      status: 'active'
    },
    {
      id: 'investment-001',
      type: 'investment',
      name: 'Investment Portfolio',
      accountNumber: '****1234',
      balance: 25750.80,
      status: 'active'
    }
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      date: new Date('2025-07-14'),
      description: 'Electric Company Payment',
      amount: -125.50,
      type: 'debit',
      status: 'posted',
      category: 'utilities'
    },
    {
      id: '2',
      date: new Date('2025-07-13'),
      description: 'Salary Deposit',
      amount: 3250.00,
      type: 'credit',
      status: 'posted',
      category: 'income'
    },
    {
      id: '3',
      date: new Date('2025-07-12'),
      description: 'Online Purchase - Amazon',
      amount: -89.99,
      type: 'debit',
      status: 'posted',
      category: 'shopping'
    },
    {
      id: '4',
      date: new Date('2025-07-11'),
      description: 'ATM Withdrawal',
      amount: -200.00,
      type: 'debit',
      status: 'posted',
      category: 'cash'
    },
    {
      id: '5',
      date: new Date('2025-07-10'),
      description: 'Mobile Deposit',
      amount: 450.00,
      type: 'credit',
      status: 'posted',
      category: 'deposit'
    }
  ];

  const pendingTransactions: Transaction[] = [
    {
      id: '6',
      date: new Date('2025-07-14'),
      description: 'Gas Station Purchase',
      amount: -45.20,
      type: 'debit',
      status: 'pending',
      category: 'gas'
    },
    {
      id: '7',
      date: new Date('2025-07-14'),
      description: 'Restaurant Payment',
      amount: -67.85,
      type: 'debit',
      status: 'pending',
      category: 'dining'
    }
  ];

  const upcomingPayments: UpcomingPayment[] = [
    {
      id: '1',
      description: 'Mortgage Payment',
      amount: 1850.00,
      dueDate: new Date('2025-08-01'),
      type: 'loan'
    },
    {
      id: '2',
      description: 'Internet Bill',
      amount: 79.99,
      dueDate: new Date('2025-07-20'),
      type: 'bill'
    },
    {
      id: '3',
      description: 'Auto Transfer to Savings',
      amount: 500.00,
      dueDate: new Date('2025-07-15'),
      type: 'transfer'
    }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      message: 'Large transaction detected: $1,245.30 charge on Rewards Credit Card',
      timestamp: new Date('2025-07-14')
    },
    {
      id: '2',
      type: 'info',
      message: 'Your savings account earned $15.25 in interest this month',
      timestamp: new Date('2025-07-13')
    }
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return <Building className="w-5 h-5" />;
      case 'savings':
        return <PiggyBank className="w-5 h-5" />;
      case 'credit':
        return <CreditCard className="w-5 h-5" />;
      case 'loan':
        return <Home className="w-5 h-5" />;
      case 'investment':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Summary</h1>
          <p className="text-gray-600">Overview of your financial accounts and recent activity</p>
        </div>

        {/* Account Balances Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Primary Account Balance</h2>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                >
                  {balanceVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  <span className="text-sm">{balanceVisible ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              
              {selectedAccountData && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {getAccountIcon(selectedAccountData.type)}
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedAccountData.name}</h3>
                      <p className="text-sm text-gray-500">{selectedAccountData.accountNumber}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Available Balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        {balanceVisible ? formatCurrency(selectedAccountData.availableBalance || selectedAccountData.balance) : '••••••'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Balance</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {balanceVisible ? formatCurrency(selectedAccountData.balance) : '••••••'}
                      </p>
                    </div>
                  </div>
                  
                  {selectedAccountData.type === 'checking' && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">Overdraft Protection: Active</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <ArrowUpDown className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Transfer Money</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-medium">Pay Bills</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Deposit Checks</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="font-medium">Freeze/Unfreeze Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* All Accounts List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Accounts</h2>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedAccount === account.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedAccount(account.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAccountIcon(account.type)}
                      <div>
                        <h3 className="font-medium text-gray-900">{account.name}</h3>
                        <p className="text-sm text-gray-500">{account.accountNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {balanceVisible ? formatCurrency(account.balance) : '••••••'}
                      </p>
                      {account.creditLimit && (
                        <p className="text-sm text-gray-500">
                          Limit: {formatCurrency(account.creditLimit)}
                        </p>
                      )}
                      {account.nextPaymentDue && (
                        <p className="text-sm text-orange-600">
                          Due: {formatDate(account.nextPaymentDue)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Alerts & Notifications</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage Alerts
              </button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(alert.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions & Pending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                <span>View All</span>
                <ExternalLink size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Transactions</h2>
            <div className="space-y-3">
              {pendingTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-orange-600">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Payments & Interest/Rewards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Payments</h2>
            <div className="space-y-3">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-500">Due: {formatDate(payment.dueDate)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-gray-500 capitalize">{payment.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Interest & Rewards</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Interest Earned (This Month)</p>
                    <p className="text-sm text-gray-500">High Yield Savings</p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">+$15.25</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Gift className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Cashback Points</p>
                    <p className="text-sm text-gray-500">Rewards Credit Card</p>
                  </div>
                </div>
                <p className="font-semibold text-blue-600">1,247 pts</p>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <p className="font-medium text-gray-900">Credit Score</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">742</p>
                <p className="text-sm text-gray-500">Good • Updated July 10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Shortcuts */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Statements & Documents</p>
                <p className="text-sm text-gray-500">View and download statements</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Customer Support</p>
                <p className="text-sm text-gray-500">Chat or call for help</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <Building className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Account Details</p>
                <p className="text-sm text-gray-500">Routing & account numbers</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;