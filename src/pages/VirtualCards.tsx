import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  EyeOff, 
  Pause, 
  Play, 
  Trash2, 
  RefreshCw, 
  Shield, 
  Bell, 
  AlertTriangle,
  Lock,
  Settings,
  Calendar,
  DollarSign,
  Building,
  User,
  X,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';

const VirtualCard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      nickname: "Shopping Card",
      lastFour: "4521",
      status: "active",
      balance: 500.00,
      limit: 1000.00,
      expiry: "12/25",
      cvv: "123",
      linkedAccount: "Primary Checking",
      merchantLock: "Amazon, Target",
      created: "2024-01-15"
    },
    {
      id: 2,
      nickname: "Subscription Card",
      lastFour: "8832",
      status: "frozen",
      balance: 150.00,
      limit: 200.00,
      expiry: "08/25",
      cvv: "456",
      linkedAccount: "Savings Account",
      merchantLock: "Netflix, Spotify",
      created: "2024-02-01"
    },
    {
      id: 3,
      nickname: "Trial Card",
      lastFour: "1234",
      status: "active",
      balance: 25.00,
      limit: 50.00,
      expiry: "07/24",
      cvv: "789",
      linkedAccount: "Primary Checking",
      merchantLock: "None",
      created: "2024-06-15"
    }
  ]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCVV, setShowCVV] = useState({});
  const [show2FA, setShow2FA] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [newCard, setNewCard] = useState({
    nickname: '',
    spendingLimit: '',
    limitType: 'monthly',
    expiryType: '12months',
    customExpiry: '',
    linkedAccount: 'primary',
    merchantLock: '',
    alerts: true
  });

  const toggleCardStatus = (cardId) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, status: card.status === 'active' ? 'frozen' : 'active' }
        : card
    ));
    
    const card = cards.find(c => c.id === cardId);
    addNotification(`Card ${card.nickname} ${card.status === 'active' ? 'frozen' : 'activated'}`);
  };

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
    setSelectedCard(null);
    addNotification('Card deleted successfully');
  };

  const regenerateCVV = (cardId) => {
    const newCVV = Math.floor(Math.random() * 900) + 100;
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, cvv: newCVV.toString() }
        : card
    ));
    addNotification('CVV regenerated successfully');
  };

  const toggleCVV = (cardId) => {
    setShowCVV(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const createNewCard = () => {
    if (!newCard.nickname || !newCard.spendingLimit) {
      addNotification('Please fill in all required fields');
      return;
    }
    
    setShow2FA(true);
  };

  const confirm2FA = () => {
    const id = Date.now();
    const newCardData = {
      id,
      nickname: newCard.nickname,
      lastFour: (Math.floor(Math.random() * 9000) + 1000).toString(),
      status: 'active',
      balance: 0,
      limit: parseFloat(newCard.spendingLimit),
      expiry: getExpiryDate(newCard.expiryType, newCard.customExpiry).toString(),
      cvv: (Math.floor(Math.random() * 900) + 100).toString(),
      linkedAccount: getAccountName(newCard.linkedAccount).toString(),
      merchantLock: newCard.merchantLock || 'None',
      created: new Date().toISOString().split('T')[0]
    };
    
    setCards(prev => [...prev, newCardData]);
    setShowCreateForm(false);
    setShow2FA(false);
    setNewCard({
      nickname: '',
      spendingLimit: '',
      limitType: 'monthly',
      expiryType: '12months',
      customExpiry: '',
      linkedAccount: 'primary',
      merchantLock: '',
      alerts: true
    });
    addNotification('Virtual card created successfully');
  };

  const getExpiryDate = (type, custom) => {
    const now = new Date();
    switch(type) {
      case '1month':
        now.setMonth(now.getMonth() + 1);
        break;
      case '6months':
        now.setMonth(now.getMonth() + 6);
        break;
      case '12months':
        now.setMonth(now.getMonth() + 12);
        break;
      case 'custom':
        return custom;
      default:
        now.setMonth(now.getMonth() + 12);
    }
    return `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(-2)}`;
  };

  const getAccountName = (type) => {
    const accounts = {
      'primary': 'Primary Checking',
      'savings': 'Savings Account',
      'business': 'Business Account'
    };
    return accounts[type] || 'Primary Checking';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addNotification('Copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Virtual Cards</h1>
            <p className="text-gray-600 mt-2">Manage your virtual cards for secure online spending</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create New Card
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div key={notification.id} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
              {notification.message}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Active Cards</h2>
                <p className="text-gray-600 mt-1">Manage your virtual cards and their settings</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cards.map(card => (
                  <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-8 rounded-lg flex items-center justify-center ${
                          card.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <CreditCard size={16} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{card.nickname}</h3>
                          <p className="text-sm text-gray-500">•••• {card.lastFour}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">${card.balance.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">of ${card.limit.toFixed(2)}</p>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          card.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {card.status}
                        </div>
                        
                        <button
                          onClick={() => toggleCardStatus(card.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            card.status === 'active' 
                              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                        >
                          {card.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        
                        <button
                          onClick={() => setSelectedCard(card)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Details Panel */}
          <div className="lg:col-span-1">
            {selectedCard ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                    <button
                      onClick={() => setSelectedCard(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Virtual Card Display */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm opacity-80">Virtual Card</p>
                        <p className="font-medium">{selectedCard.nickname}</p>
                      </div>
                      <CreditCard size={24} />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm opacity-80">Card Number</p>
                        <p className="font-mono text-lg">•••• •••• •••• {selectedCard.lastFour}</p>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm opacity-80">Expiry</p>
                          <p className="font-mono">{selectedCard.expiry}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80">CVV</p>
                          <div className="flex items-center gap-2">
                            <p className="font-mono">
                              {showCVV[selectedCard.id] ? selectedCard.cvv : '•••'}
                            </p>
                            <button
                              onClick={() => toggleCVV(selectedCard.id)}
                              className="opacity-80 hover:opacity-100"
                            >
                              {showCVV[selectedCard.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Linked Account</span>
                      <span className="text-sm font-medium">{selectedCard.linkedAccount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Spending Limit</span>
                      <span className="text-sm font-medium">${selectedCard.limit.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Merchant Lock</span>
                      <span className="text-sm font-medium">{selectedCard.merchantLock}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Created</span>
                      <span className="text-sm font-medium">{selectedCard.created}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => regenerateCVV(selectedCard.id)}
                      className="w-full bg-blue-50 text-blue-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
                    >
                      <RefreshCw size={16} />
                      Regenerate CVV
                    </button>
                    
                    <button
                      onClick={() => copyToClipboard(selectedCard.cvv)}
                      className="w-full bg-gray-50 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                    >
                      <Copy size={16} />
                      Copy CVV
                    </button>
                    
                    <button
                      onClick={() => deleteCard(selectedCard.id)}
                      className="w-full bg-red-50 text-red-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete Card
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center py-8">
                  <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Card</h3>
                  <p className="text-gray-600">Choose a card from the list to view details and manage settings</p>
                </div>
              </div>
            )}

            {/* Security Guidelines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Shield size={20} />
                  Security Guidelines
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Never share your CVV with anyone</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Set spending limits for better control</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Freeze cards when not in use</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Enable transaction alerts</p>
                </div>
                
                <button className="w-full bg-red-50 text-red-600 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-colors mt-6">
                  <AlertTriangle size={16} />
                  Report Suspicious Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Card Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create New Virtual Card</h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Nickname *
                </label>
                <input
                  type="text"
                  value={newCard.nickname}
                  onChange={(e) => setNewCard({...newCard, nickname: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Shopping Card"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spending Limit *
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={newCard.spendingLimit}
                      onChange={(e) => setNewCard({...newCard, spendingLimit: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1000"
                    />
                  </div>
                  <select
                    value={newCard.limitType}
                    onChange={(e) => setNewCard({...newCard, limitType: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="onetime">One-time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <select
                  value={newCard.expiryType}
                  onChange={(e) => setNewCard({...newCard, expiryType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1month">1 Month</option>
                  <option value="6months">6 Months</option>
                  <option value="12months">12 Months</option>
                  <option value="custom">Custom</option>
                </select>
                {newCard.expiryType === 'custom' && (
                  <input
                    type="month"
                    value={newCard.customExpiry}
                    onChange={(e) => setNewCard({...newCard, customExpiry: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Linked Account
                </label>
                <select
                  value={newCard.linkedAccount}
                  onChange={(e) => setNewCard({...newCard, linkedAccount: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="primary">Primary Checking</option>
                  <option value="savings">Savings Account</option>
                  <option value="business">Business Account</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Merchant Lock (Optional)
                </label>
                <input
                  type="text"
                  value={newCard.merchantLock}
                  onChange={(e) => setNewCard({...newCard, merchantLock: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Amazon, Netflix"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple merchants with commas</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="alerts"
                  checked={newCard.alerts}
                  onChange={(e) => setNewCard({...newCard, alerts: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="alerts" className="text-sm text-gray-700">
                  Enable transaction alerts
                </label>
              </div>

              <button
                onClick={createNewCard}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Virtual Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FA && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Verification</h3>
              <p className="text-gray-600 mb-6">Please verify your identity to create a new virtual card</p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter 6-digit code from your authenticator app"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-mono"
                  maxLength={6}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShow2FA(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirm2FA}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualCard;