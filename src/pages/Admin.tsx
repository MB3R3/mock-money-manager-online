
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleDeposit = () => {
    if (!depositAmount || !accountNumber || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
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

    // For now, just show success message
    // This will be connected to the database when Supabase is integrated
    toast({
      title: "Deposit Successful!",
      description: `$${amount.toFixed(2)} has been deposited to account ${accountNumber}.`,
    });

    setDepositAmount('');
    setAccountNumber('');
    setDescription('');
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-green-600" />
                    <span>Deposit to User Account</span>
                  </CardTitle>
                  <CardDescription>
                    Add money to any user's account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      type="text"
                      placeholder="Enter user account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="mt-1"
                    />
                  </div>
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
                    disabled={!depositAmount || !accountNumber || !description}
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
