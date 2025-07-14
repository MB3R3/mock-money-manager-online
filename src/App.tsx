import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Sidebar Pages
import KycStatus from "./pages/KycStatus";
import LocalTransfer from "./pages/LocalTransfer";
import PayBill from "./pages/PayBill";
import VirtualCards from "./pages/VirtualCards";
import AccountSummary from "./pages/AccountSummary";
import MyAccount from "./pages/MyAccount";
import AccountSettings from "./pages/AccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Sidebar Links */}
            <Route
              path="/kyc-status"
              element={
                <ProtectedRoute>
                  <KycStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/local-transfer"
              element={
                <ProtectedRoute>
                  <LocalTransfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pay-bill"
              element={
                <ProtectedRoute>
                  <PayBill />
                </ProtectedRoute>
              }
            />
            <Route
              path="/virtual-cards"
              element={
                <ProtectedRoute>
                  <VirtualCards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account-summary"
              element={
                <ProtectedRoute>
                  <AccountSummary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-account"
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account-settings"
              element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
