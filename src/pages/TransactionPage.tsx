import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

interface TransactionData {
  bankName: string;
  sortCode: string;
  senderName: string;
  accountNumber: string;
  amount: string;
  description: string;
}

interface ValidationErrors {
  bankName?: string;
  sortCode?: string;
  senderName?: string;
  accountNumber?: string;
  amount?: string;
  description?: string;
}

const TransactionPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TransactionData>({
    bankName: '',
    sortCode: '',
    senderName: '',
    accountNumber: '',
    amount: '',
    description: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("transactionForm");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved form data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactionForm", JSON.stringify(formData));
  }, [formData]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'bankName':
        if (!value.trim()) return 'Bank name is required';
        if (value.length < 2) return 'Bank name must be at least 2 characters';
        break;
      
      case 'sortCode':
        if (!value.trim()) return 'Sort code is required';
        const sortCodeRegex = /^\d{2}-\d{2}-\d{2}$/;
        if (!sortCodeRegex.test(value)) return 'Sort code must be in format XX-XX-XX';
        break;
      
      case 'senderName':
        if (!value.trim()) return 'Sender name is required';
        if (value.length < 2) return 'Sender name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Sender name can only contain letters and spaces';
        break;
      
      case 'accountNumber':
        if (!value.trim()) return 'Account number is required';
        if (!/^\d{10}$/.test(value)) return 'Account number must be exactly 10 digits';
        break;
      
      case 'amount':
        if (!value.trim()) return 'Amount is required';
        const amount = parseFloat(value);
        if (isNaN(amount) || amount <= 0) return 'Amount must be a positive number';
        if (amount > 1000000) return 'Amount cannot exceed £1,000,000';
        break;
      
      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.length < 3) return 'Description must be at least 3 characters';
        if (value.length > 100) return 'Description cannot exceed 100 characters';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format sort code automatically
    let formattedValue = value;
    if (name === 'sortCode') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3');
    }
    
    // Restrict account number to digits only
    if (name === 'accountNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    // Format amount to 2 decimal places
    if (name === 'amount') {
      formattedValue = value.replace(/[^0-9.]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof TransactionData]);
      if (error) newErrors[key as keyof ValidationErrors] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/transaction/confirm", { state: formData });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAmount = (value: string) => {
    const num = parseFloat(value);
    return isNaN(num) ? '' : `£${num.toFixed(2)}`;
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">New Transaction</h1>
        <p className="text-gray-600">Please enter the transaction details below. All fields are required.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bank Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bank Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
                Bank Name *
              </Label>
              <Input
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 ${errors.bankName ? 'border-red-500' : ''}`}
                placeholder="e.g., Barclays Bank"
              />
              {errors.bankName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="sortCode" className="text-sm font-medium text-gray-700">
                Sort Code *
              </Label>
              <Input
                id="sortCode"
                name="sortCode"
                value={formData.sortCode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 ${errors.sortCode ? 'border-red-500' : ''}`}
                placeholder="XX-XX-XX"
                maxLength={8}
              />
              {errors.sortCode && (
                <p className="mt-1 text-sm text-red-600">{errors.sortCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
                Account Number *
              </Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 font-mono ${errors.accountNumber ? 'border-red-500' : ''}`}
                placeholder="1234567890"
                maxLength={10}
              />
              {errors.accountNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Must be exactly 10 digits</p>
            </div>

            <div>
              <Label htmlFor="senderName" className="text-sm font-medium text-gray-700">
                Account Holder Name *
              </Label>
              <Input
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 ${errors.senderName ? 'border-red-500' : ''}`}
                placeholder="John Smith"
              />
              {errors.senderName && (
                <p className="mt-1 text-sm text-red-600">{errors.senderName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Amount (£) *
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                max="1000000"
                value={formData.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
              {formData.amount && !errors.amount && (
                <p className="mt-1 text-sm text-green-600">
                  Amount: {formatAmount(formData.amount)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description *
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Payment reference or description"
                maxLength={100}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.description.length}/100 characters
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            <strong>Security Notice:</strong> Please verify all transaction details carefully before proceeding. 
            This transaction will be processed immediately and cannot be reversed.
          </AlertDescription>
        </Alert>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Continue to Confirmation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransactionPage;