import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";


// Pages
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import TransactionPage from "../src/pages/TransactionPage"
import TransactionConfirmPage from "./pages/TransactionConfirmPage";
import SuccessPage from "./pages/SuccessPage";
import TransactionFailedPage from "./pages/TransactionFailedPage";
import Transfer from '@/pages/Transfer';

// Sidebar Pages
import KycStatus from "./pages/KycStatus";
// import LocalTransfer from "./pages/LocalTransfer";
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
            {/* Auth routes - no layout needed */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Index />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/transfer" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Transfer />
                  </Layout>
                </ProtectedRoute>

              } 
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <Admin />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Sidebar-linked pages with layout */}
            <Route
              path="/kyc-status"
              element={
                <ProtectedRoute>
                  <Layout>
                    <KycStatus />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/transactions" 
              element={
              <ProtectedRoute>
                <Layout>
                  <TransactionPage />
                </Layout>
              </ProtectedRoute>
              } 
            />
            <Route
              path="/pay-bill"
              element={
                <ProtectedRoute>
                  <Layout>
                    <PayBill />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/virtual-cards"
              element={
                <ProtectedRoute>
                  <Layout>
                    <VirtualCards />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/account-summary"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AccountSummary />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-account"
              element={
                <ProtectedRoute>
                  <Layout>
                    <MyAccount />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route 
              path="/transaction/confirm" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionConfirmPage />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
            path="/transaction-success" 
            element={
              <ProtectedRoute>
                <Layout>
                  <SuccessPage />
                </Layout>
              </ProtectedRoute>
              } 
            />
            <Route 
            path="/transaction-failed" 
            element={
              <ProtectedRoute>
                <Layout>
                  <TransactionFailedPage />
                </Layout>
              </ProtectedRoute>
              } 
            /> 
            <Route
              path="/account-settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AccountSettings />
                  </Layout>
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