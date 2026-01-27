import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Societies from "./pages/Societies";
import UsersPage from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Plans from "./pages/Plans";
import Revenue from "./pages/Revenue";
import Support from "./pages/Support";
import Announcements from "./pages/Announcements";
import Roles from "./pages/Roles";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Index />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/support" element={<Support />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
