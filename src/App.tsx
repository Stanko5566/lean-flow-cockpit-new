import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import PdcaPage from "./pages/PdcaPage";
import FiveS from "./pages/5S";
import KaizenPage from "./pages/Kaizen";
import ValueStreamPage from "./pages/ValueStream";
import KanbanPage from "./pages/KanbanPage";
import AndonPage from "./pages/AndonPage";
import GembaPage from "./pages/GembaPage";
import StandardWork from "./pages/StandardWork";
import A3Page from "./pages/A3Page";
import TpmPage from "./pages/TpmPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="pdca" element={<PdcaPage />} />
              <Route path="5s" element={<FiveS />} />
              <Route path="kaizen" element={<KaizenPage />} />
              <Route path="valuestream" element={<ValueStreamPage />} />
              <Route path="kanban" element={<KanbanPage />} />
              <Route path="andon" element={<AndonPage />} />
              <Route path="gemba" element={<GembaPage />} />
              <Route path="standards" element={<StandardWork />} />
              <Route path="a3" element={<A3Page />} />
              <Route path="tpm" element={<TpmPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
