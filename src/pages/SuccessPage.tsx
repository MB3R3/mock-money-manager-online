import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message || "Transaction completed successfully!";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <CheckCircle className="text-green-600 mb-4" size={64} />
      <h1 className="text-2xl font-bold mb-2">Success</h1>
      <p className="text-gray-700 mb-6">{message}</p>
      <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
    </div>
  );
};

export default SuccessPage;
