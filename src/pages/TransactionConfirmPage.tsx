// src/pages/TransactionConfirm.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransactionConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [transactionData, setTransactionData] = useState({
    senderName: initialData.senderName || '',
    bankName: initialData.bankName || '',
    sortCode: initialData.sortCode || '',
    description: initialData.description || '',
    amount: initialData.amount || '',
    accountNumber: initialData.accountNumber || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    // Simulate confirmation logic here
    const isSuccessful = true; // could simulate random failure if needed
    if (isSuccessful) {
      navigate('/transaction-success');
    } else {
      navigate('/transaction-failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl font-semibold mb-6 text-center">Confirm Transaction</h1>

      <div className="space-y-4">
        {['senderName', 'bankName', 'sortCode', 'description', 'amount', 'accountNumber'].map((field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium capitalize">
              {field.replace(/([A-Z])/g, ' $1')}:
            </label>
            {isEditing ? (
              <input
                type="text"
                name={field}
                value={transactionData[field as keyof typeof transactionData]}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            ) : (
              <p className="mt-1 text-gray-900 font-medium">
                {transactionData[field as keyof typeof transactionData]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
        >
          {isEditing ? 'Done Editing' : 'Edit'}
        </button>

        <button
          onClick={handleConfirm}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TransactionConfirm;
