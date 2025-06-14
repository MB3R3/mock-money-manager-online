import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  Name: string | null;
  balance: number | null;
  account_number: number | null;
}

const Admin = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const searchUser = async () => {
    if (!userIdentifier) {
      toast({
        title: "Missing Information",
        description: "Please enter a user ID or account number.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      // Try to find user by ID first, then by account number
      let query = supabase.from('Users').select('*');
      
      const isNumeric = /^\d+$/.test(userIdentifier);
      if (isNumeric) {
        const numValue = parseInt(userIdentifier);
        // If it's a reasonable ID range, search by ID first
        if (numValue < 1000) {
          query = query.eq('id', numValue);
        } else {
          // Otherwise search by account number
          query = query.eq('account_number', numValue);
        }
      } else {
        // Search by name if not numeric
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
        description: `Found: ${data.Name} (Account: ${data.account_number})`,
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
      // Create transaction record
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

      // Update user balance
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

      // Update the selected user's balance in the UI
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
              Universal deposit functionality for all user accounts
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
                    Search by User ID, Account Number, or Name
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter User ID, Account Number, or Name"
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
                      placeholder="Enter amount"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
