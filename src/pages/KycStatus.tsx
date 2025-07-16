import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/hooks/useDarkMode';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  Eye, 
  EyeOff, 
  Shield, 
  Phone, 
  Star,
  Info,
  Calendar,
  CreditCard,
  Home,
  Hash
} from 'lucide-react';

const KYCStatus = () => {
  const { user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [showTIN, setShowTIN] = useState(false);

  // Sample KYC data
  const kycData = {
    status: 'Verified', // 'Verified', 'Pending', 'Rejected', 'Incomplete'
    lastUpdated: '2024-12-15',
    expiryDate: '2025-12-15',
    tier: 'Full KYC',
    documents: {
      governmentId: {
        type: 'Passport',
        status: 'Verified',
        expiryDate: '2029-08-15',
        uploadDate: '2024-12-10',
        rejectionReason: null
      },
      proofOfAddress: {
        type: 'Utility Bill',
        status: 'Verified',
        issueDate: '2024-11-20',
        uploadDate: '2024-12-10',
        rejectionReason: null
      },
      tin: {
        number: '****-**-5678',
        status: 'Verified',
        type: 'SSN'
      }
    },
    pendingItems: [],
    rejectedItems: [],
    limits: {
      basic: {
        dailyTransfer: '$1,000',
        monthlyTransfer: '$10,000',
        features: ['Mobile Banking', 'Online Transfers', 'Bill Pay']
      },
      fullKyc: {
        dailyTransfer: '$25,000',
        monthlyTransfer: '$100,000',
        features: ['All Basic Features', 'Wire Transfers', 'Investment Services', 'Loan Applications']
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return isDarkMode ? 'text-green-400 bg-green-900' : 'text-green-600 bg-green-50';
      case 'Pending': return isDarkMode ? 'text-yellow-400 bg-yellow-900' : 'text-yellow-600 bg-yellow-50';
      case 'Rejected': return isDarkMode ? 'text-red-400 bg-red-900' : 'text-red-600 bg-red-50';
      case 'Incomplete': return isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-50';
      default: return isDarkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified': return <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />;
      case 'Pending': return <Clock className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />;
      case 'Rejected': return <XCircle className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />;
      case 'Incomplete': return <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />;
      default: return <AlertTriangle className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              KYC Verification Status
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your identity verification and compliance status
            </p>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(kycData.status)}`}>
            {getStatusIcon(kycData.status)}
            <span className="text-sm font-medium">{kycData.status}</span>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className={`rounded-xl shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-lg font-semibold mb-4">Verification Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</p>
              <p className="font-medium">{formatDate(kycData.lastUpdated)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expires On</p>
              <p className="font-medium">{formatDate(kycData.expiryDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Star className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Verification Tier</p>
              <p className="font-medium">{kycData.tier}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Documents */}
      <div className={`rounded-xl shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-lg font-semibold mb-4">Submitted Documents</h2>
        
        {/* Government ID */}
        <div className={`border rounded-lg p-4 mb-4 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <CreditCard className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-medium">Government ID</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{kycData.documents.governmentId.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(kycData.documents.governmentId.status)}
              <span className="text-sm font-medium">{kycData.documents.governmentId.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uploaded: {formatDate(kycData.documents.governmentId.uploadDate)}</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Expires: {formatDate(kycData.documents.governmentId.expiryDate)}</p>
            </div>
            <div className="flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Document
              </button>
            </div>
          </div>
        </div>

        {/* Proof of Address */}
        <div className={`border rounded-lg p-4 mb-4 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Home className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-medium">Proof of Address</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{kycData.documents.proofOfAddress.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(kycData.documents.proofOfAddress.status)}
              <span className="text-sm font-medium">{kycData.documents.proofOfAddress.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uploaded: {formatDate(kycData.documents.proofOfAddress.uploadDate)}</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Issue Date: {formatDate(kycData.documents.proofOfAddress.issueDate)}</p>
            </div>
            <div className="flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Document
              </button>
            </div>
          </div>
        </div>

        {/* Tax Identification Number */}
        <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Hash className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-medium">Tax Identification Number</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{kycData.documents.tin.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(kycData.documents.tin.status)}
              <span className="text-sm font-medium">{kycData.documents.tin.status}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Number: </span>
              <span className="font-mono">{showTIN ? '123-45-5678' : kycData.documents.tin.number}</span>
              <button
                onClick={() => setShowTIN(!showTIN)}
                className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showTIN ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Tiers */}
      <div className={`rounded-xl shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-lg font-semibold mb-4">Verification Tiers & Limits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Tier */}
          <div className={`border rounded-lg p-4 ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <Phone className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <h3 className="font-medium">Basic Tier</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily Transfer:</span> <span className="font-medium">{kycData.limits.basic.dailyTransfer}</span></p>
              <p><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Transfer:</span> <span className="font-medium">{kycData.limits.basic.monthlyTransfer}</span></p>
              <div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Features:</p>
                <ul className="text-xs space-y-1">
                  {kycData.limits.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <CheckCircle className={`w-3 h-3 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Full KYC Tier */}
          <div className={`border-2 rounded-lg p-4 ${isDarkMode ? 'border-blue-600 bg-blue-900/20' : 'border-blue-200 bg-blue-50'}`}>
            <div className="flex items-center space-x-2 mb-3">
              <Shield className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className="font-medium">Full KYC</h3>
              <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-blue-800 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>Current</span>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Daily Transfer:</span> <span className="font-medium">{kycData.limits.fullKyc.dailyTransfer}</span></p>
              <p><span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monthly Transfer:</span> <span className="font-medium">{kycData.limits.fullKyc.monthlyTransfer}</span></p>
              <div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Features:</p>
                <ul className="text-xs space-y-1">
                  {kycData.limits.fullKyc.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <CheckCircle className={`w-3 h-3 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`rounded-xl shadow-md p-6 mb-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Update Information</span>
          </button>
          <button className={`flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
            isDarkMode 
              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            <Phone className="w-4 h-4" />
            <span>Contact Support</span>
          </button>
        </div>
      </div>

      {/* Compliance Info */}
      <div className={`border rounded-lg p-6 ${isDarkMode ? 'bg-blue-900/20 border-blue-600' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-start space-x-3">
          <Info className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>Why KYC is Required</h3>
            <p className={`text-sm mb-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
              Know Your Customer (KYC) verification is required by federal regulations to prevent fraud, 
              money laundering, and ensure the security of your account. This helps us protect you and 
              comply with banking regulations.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Privacy Policy</a>
              <a href="#" className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Data Usage Terms</a>
              <a href="#" className={`font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Compliance Information</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;