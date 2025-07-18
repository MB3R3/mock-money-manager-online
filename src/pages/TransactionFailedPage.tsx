import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TransactionFailedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <AlertTriangle className="text-red-600 mb-4" size={64} />
      <h1 className="text-2xl font-bold mb-2">Transaction Failed</h1>
      <p className="text-gray-700 mb-6">Something went wrong. Please try again later.</p>
      <Button onClick={() => navigate("/transaction")}>Try Again</Button>
    </div>
  );
};

export default TransactionFailedPage;
