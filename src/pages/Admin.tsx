
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ArrowLeft, Search, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  Name: string | null;
  balance: number | null;
  account_number: number | null;
  email: string | null;
}

const Admin = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [balanceChangeAmount, setBalanceChangeAmount] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchUser = async () => {
    if (!userIdentifier) {
      toast({
        title: "Missing Information",
        description: "Please enter a user ID, account number, or email.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      let query = supabase.from('Users').select('*');
      
      const isNumeric = /^\d+$/.test(userIdentifier);
      const isEmail = userIdentifier.includes('@');
      
      if (isEmail) {
        query = query.eq('email', userIdentifier);
      } else if (isNumeric) {
        const numValue = parseInt(userIdentifier);
        if (numValue < 1000) {
          query = query.eq('id', numValue);
        } else {
          query = query.eq('account_number', numValue);
        }
      } else {
        query = query.ilike('Name', `%${userIdentifier}%`);
      }

      const { data, error } = await query.single();

      if (error || !data) {
        toast({
          title: "User Not Found",
          description: "No user found with that identifier.",
          variant: "destructive",
        });
        setSelectedUser(null);
        return;
      }

      setSelectedUser(data);
      toast({
        title: "User Found",
        description: `Found: ${data.Name} (${data.email})`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "There was an error searching for the user.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || !selectedUser || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a user.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: selectedUser.id,
          type: 'deposit',
          amount,
          description: `Admin Deposit: ${description}`
        });

      if (transactionError) {
        console.error('Transaction error:', transactionError);
        toast({
          title: "Deposit Failed",
          description: "There was an error creating the transaction record.",
          variant: "destructive",
        });
        return;
      }

      const newBalance = (selectedUser.balance || 0) + amount;
      const { error: balanceError } = await supabase
        .from('Users')
        .update({ balance: newBalance })
        .eq('id', selectedUser.id);

      if (balanceError) {
        console.error('Balance update error:', balanceError);
        toast({
          title: "Deposit Failed",
          description: "There was an error updating the user's balance.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Deposit Successful!",
        description: `$${amount.toFixed(2)} has been deposited to ${selectedUser.Name}'s account.`,
      });

      setSelectedUser({ ...selectedUser, balance: newBalance });
      setDepositAmount('');
      setDescription('');
    } catch (error) {
      console.error('Deposit error:', error);
      toast({
        title: "Deposit Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBalanceChange = async () => {
    if (!balanceChangeAmount || !selectedUser) {
      toast({
        title: "Missing Information",
        description: "Please enter an amount and select a user.",
        variant: "destructive",
      });
      return;
    }

    const newBalance = parseFloat(balanceChangeAmount);
    if (isNaN(newBalance) || newBalance < 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid balance amount.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('Users')
        .update({ balance: newBalance })
        .eq('id', selectedUser.id);

      if (error) {
        console.error('Balance update error:', error);
        toast({
          title: "Update Failed",
          description: "There was an error updating the user's balance.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Balance Updated!",
        description: `${selectedUser.Name}'s balance has been set to $${newBalance.toFixed(2)}.`,
      });

      setSelectedUser({ ...selectedUser, balance: newBalance });
      setBalanceChangeAmount('');
    } catch (error) {
      console.error('Balance change error:', error);
      toast({
        title: "Update Failed",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main App
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
            <CardDescription className="text-purple-100">
              User account management and deposit functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* User Search Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Search className="h-5 w-5 text-blue-600" />
                    <span>Find User</span>
                  </CardTitle>
                  <CardDescription>
                    Search by User ID, Account Number, Email, or Name
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter User ID, Account Number, Email, or Name"
                      value={userIdentifier}
                      onChange={(e) => setUserIdentifier(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={searchUser}
                      disabled={isSearching}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isSearching ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                  
                  {selectedUser && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800">Selected User:</h4>
                      <p className="text-green-700">
                        <strong>Name:</strong> {selectedUser.Name}<br />
                        <strong>Email:</strong> {selectedUser.email}<br />
                        <strong>Account Number:</strong> {selectedUser.account_number}<br />
                        <strong>Current Balance:</strong> ${(selectedUser.balance || 0).toFixed(2)}<br />
                        <strong>User ID:</strong> {selectedUser.id}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Deposit Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-green-600" />
                    <span>Deposit to User Account</span>
                  </CardTitle>
                  <CardDescription>
                    Add money to the selected user's account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="depositAmount">Amount</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      placeholder="Enter amount to deposit"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Transaction Description</Label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Enter transaction description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleDeposit} 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!depositAmount || !selectedUser || !description}
                  >
                    Deposit Funds
                  </Button>
                </CardContent>
              </Card>

              {/* Change Balance Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <span>Change Account Balance</span>
                  </CardTitle>
                  <CardDescription>
                    Set a specific balance for the selected user's account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="balanceChangeAmount">New Balance</Label>
                    <Input
                      id="balanceChangeAmount"
                      type="number"
                      placeholder="Enter new balance amount"
                      value={balanceChangeAmount}
                      onChange={(e) => setBalanceChangeAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={handleBalanceChange} 
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={!balanceChangeAmount || !selectedUser}
                  >
                    Update Balance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
