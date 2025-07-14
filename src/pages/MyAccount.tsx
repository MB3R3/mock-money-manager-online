import React, { useState } from 'react';
import { 
  User, Lock, CreditCard, Bell, Link, Shield, FileText, 
  HelpCircle, Edit, Eye, EyeOff, Smartphone, Mail, 
  Phone, MapPin, Key, Users, Settings, Download,
  AlertTriangle, CheckCircle, XCircle, Plus, Minus,
  Globe, DollarSign, Calendar, Home, Building
} from 'lucide-react';

const MyAccounts = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    transactions: true,
    lowBalance: true,
    security: true,
    marketing: false
  });
  const [cardControls, setCardControls] = useState({
    active: true,
    dailyLimit: 1000,
    monthlyLimit: 5000,
    atmLimit: 500,
    international: false
  });

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'security', label: 'Login & Security', icon: Lock },
    { id: 'accounts', label: 'Account Management', icon: CreditCard },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'linked', label: 'Linked Accounts & Services', icon: Link },
    { id: 'cards', label: 'Card Controls', icon: CreditCard },
    { id: 'privacy', label: 'Privacy & Data Settings', icon: Shield },
    { id: 'documents', label: 'Documents & Statements', icon: FileText },
    { id: 'support', label: 'Customer Support', icon: HelpCircle }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <User className="mr-2" size={20} />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <span>John Michael Smith</span>
              <button className="text-blue-600 hover:text-blue-800">
                <Edit size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <span>March 15, 1985</span>
              <button className="text-blue-600 hover:text-blue-800">
                <Edit size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <span>john.smith@email.com</span>
              <button className="text-blue-600 hover:text-blue-800">
                <Edit size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <span>(555) 123-4567</span>
              <button className="text-blue-600 hover:text-blue-800">
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mailing Address</label>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
            <span>123 Main Street, Anytown, ST 12345</span>
            <button className="text-blue-600 hover:text-blue-800">
              <Edit size={16} />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Government ID Verification</label>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
            <span className="flex items-center">
              <CheckCircle className="text-green-600 mr-2" size={16} />
              Verified - SSN ends in 1234
            </span>
            <button className="text-blue-600 hover:text-blue-800">
              <Edit size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Lock className="mr-2" size={20} />
          Login & Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Key className="mr-3" size={20} />
              <span className="font-medium">Change Password</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Change
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Smartphone className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Two-Factor Authentication</span>
                <span className="text-sm text-gray-600">SMS, Email, Authenticator App</span>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-4 py-2 rounded ${
                twoFactorEnabled 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <User className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Biometric Login</span>
                <span className="text-sm text-gray-600">Fingerprint/Face ID</span>
              </div>
            </div>
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`px-4 py-2 rounded ${
                biometricEnabled 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              {biometricEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <HelpCircle className="mr-3" size={20} />
              <span className="font-medium">Security Questions & Recovery</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Users className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Linked Devices</span>
                <span className="text-sm text-gray-600">3 active sessions</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccounts = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="mr-2" size={20} />
          Account Management
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Edit className="mr-3" size={20} />
              <span className="font-medium">Nickname Accounts</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <EyeOff className="mr-3" size={20} />
              <span className="font-medium">Hide Accounts</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Plus className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Open New Account</span>
                <span className="text-sm text-gray-600">Savings, CD, Credit Card</span>
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Apply
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <XCircle className="mr-3 text-red-500" size={20} />
              <span className="font-medium">Close Account</span>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="mr-2" size={20} />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {Object.entries(notificationPrefs).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded border">
              <div className="flex items-center">
                <Bell className="mr-3" size={20} />
                <span className="font-medium capitalize">
                  {key === 'transactions' ? 'Transaction Alerts' :
                   key === 'lowBalance' ? 'Low Balance Warnings' :
                   key === 'security' ? 'Security Alerts' :
                   'Marketing/Promo Emails'}
                </span>
              </div>
              <button
                onClick={() => setNotificationPrefs(prev => ({ ...prev, [key]: !value }))}
                className={`px-4 py-2 rounded ${
                  value 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {value ? 'On' : 'Off'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLinkedAccounts = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Link className="mr-2" size={20} />
          Linked Accounts & Services
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Building className="mr-3" size={20} />
              <div>
                <span className="font-medium block">External Banks</span>
                <span className="text-sm text-gray-600">For transfers</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Smartphone className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Payment Apps</span>
                <span className="text-sm text-gray-600">Zelle, Venmo, PayPal</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Connect
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Settings className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Third-Party Access</span>
                <span className="text-sm text-gray-600">Budgeting apps like Mint</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Authorize
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCardControls = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="mr-2" size={20} />
          Card Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <CreditCard className="mr-3" size={20} />
              <span className="font-medium">Card Status</span>
            </div>
            <button
              onClick={() => setCardControls(prev => ({ ...prev, active: !prev.active }))}
              className={`px-4 py-2 rounded ${
                cardControls.active 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {cardControls.active ? 'Active' : 'Deactivated'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded border">
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Spending Limit</label>
              <div className="flex items-center">
                <DollarSign size={16} className="text-gray-500 mr-1" />
                <input
                  type="number"
                  value={cardControls.dailyLimit}
                  onChange={(e) => setCardControls(prev => ({ ...prev, dailyLimit: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border">
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Spending Limit</label>
              <div className="flex items-center">
                <DollarSign size={16} className="text-gray-500 mr-1" />
                <input
                  type="number"
                  value={cardControls.monthlyLimit}
                  onChange={(e) => setCardControls(prev => ({ ...prev, monthlyLimit: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border">
              <label className="block text-sm font-medium text-gray-700 mb-2">ATM Withdrawal Limit</label>
              <div className="flex items-center">
                <DollarSign size={16} className="text-gray-500 mr-1" />
                <input
                  type="number"
                  value={cardControls.atmLimit}
                  onChange={(e) => setCardControls(prev => ({ ...prev, atmLimit: parseInt(e.target.value) }))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border">
              <label className="block text-sm font-medium text-gray-700 mb-2">International Transactions</label>
              <button
                onClick={() => setCardControls(prev => ({ ...prev, international: !prev.international }))}
                className={`w-full px-4 py-2 rounded ${
                  cardControls.international 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {cardControls.international ? 'Allowed' : 'Blocked'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded border border-red-200">
            <div className="flex items-center">
              <AlertTriangle className="mr-3 text-red-500" size={20} />
              <span className="font-medium text-red-700">Report Lost/Stolen Card</span>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="mr-2" size={20} />
          Privacy & Data Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Users className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Data Sharing Preferences</span>
                <span className="text-sm text-gray-600">With affiliates/partners</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Download className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Download Your Data</span>
                <span className="text-sm text-gray-600">Transaction history & account info</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Globe className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Clear Saved Browser Data</span>
                <span className="text-sm text-gray-600">For security purposes</span>
              </div>
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="mr-2" size={20} />
          Documents & Statements
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Mail className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Statement Preferences</span>
                <span className="text-sm text-gray-600">eStatements vs. Paper</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Calendar className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Tax Documents</span>
                <span className="text-sm text-gray-600">1099-INT, 1098 for loans</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <FileText className="mr-3" size={20} />
              <div>
                <span className="font-medium block">Account Agreements</span>
                <span className="text-sm text-gray-600">Terms & conditions</span>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <HelpCircle className="mr-2" size={20} />
          Customer Support
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <HelpCircle className="mr-3" size={20} />
              <span className="font-medium">Live Chat/Help Center</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Start Chat
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Phone className="mr-3" size={20} />
              <span className="font-medium">Schedule a Callback</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Schedule
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <MapPin className="mr-3" size={20} />
              <span className="font-medium">Branch/ATM Locator</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Find Locations
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded border">
            <div className="flex items-center">
              <Mail className="mr-3" size={20} />
              <span className="font-medium">Feedback/Complaints</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'personal': return renderPersonalInfo();
      case 'security': return renderSecurity();
      case 'accounts': return renderAccounts();
      case 'notifications': return renderNotifications();
      case 'linked': return renderLinkedAccounts();
      case 'cards': return renderCardControls();
      case 'privacy': return renderPrivacy();
      case 'documents': return renderDocuments();
      case 'support': return renderSupport();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <Building className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-semibold text-gray-900">SecureBank</h1>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome back, John</span>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                J
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">My Account</h2>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeSection === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={16} className="mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccounts;