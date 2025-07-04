import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';


/**
 * Looks up account holder name by account number
 * @param {number} accountNumber - The account number to look up
 * @returns {Object} - Object containing success status, name, and error message
 */
const lookupAccountName = async (accountNumber) => {
  try {
    // Validate account number format
    if (!accountNumber || accountNumber.length !== 10) {
      return {
        success: false,
        name: null,
        error: 'Please enter a valid 10-digit account number'
      };
    }

    // Query the database for the account
    const { data, error } = await supabase
      .from('Users')
      .select('Name, account_number')
      .eq('account_number', accountNumber)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      return {
        success: false,
        name: null,
        error: 'Unable to verify account. Please try again.'
      };
    }

    if (!data) {
      return {
        success: false,
        name: null,
        error: 'Account not found. Please check the account number.'
      };
    }

    return {
      success: true,
      name: data.Name,
      error: null
    };

  } catch (error) {
    console.error('Lookup error:', error);
    return {
      success: false,
      name: null,
      error: 'An error occurred while looking up the account.'
    };
  }
};

/**
 * Hook for account lookup functionality
 */
export const useAccountLookup = () => {
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);

  const lookupAccount = async (accountNumber) => {
    setIsLookingUp(true);
    setLookupResult(null);

    const result = await lookupAccountName(accountNumber);
    setLookupResult(result);
    setIsLookingUp(false);

    return result;
  };

  const clearLookup = () => {
    setLookupResult(null);
  };

  return {
    lookupAccount,
    isLookingUp,
    lookupResult,
    clearLookup
  };
};