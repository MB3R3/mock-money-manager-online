
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BalanceCardProps {
  balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  return (
    <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white/90 text-lg sm:text-xl">Account Balance</CardTitle>
        <CardDescription className="text-blue-100 text-sm sm:text-base">Checking Account •••• 4829</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl sm:text-4xl font-bold mb-2">${balance.toFixed(2)}</div>
        <div className="text-blue-100 text-sm">Available Balance</div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
