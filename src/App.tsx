import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Chatbot from "./pages/Chatbot";
import Weather from "./pages/Weather";
import Money from "./pages/Money";
import Recommendations from "./pages/Recommendations";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RoutesWithPadding = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isFeatures = location.pathname === "/features";
  const isChatbot = location.pathname === "/chatbot";
  const isWeather = location.pathname === "/weather";
  const isMoney = location.pathname === "/money";
  const isRecommendations = location.pathname === "/recommendations";
  const isContact = location.pathname === "/contact";
  const isSignin = location.pathname === "/signin";
  const isSignup = location.pathname === "/signup";
  return (
    <div className={isHome || isFeatures || isChatbot || isWeather || isMoney || isRecommendations || isContact || isSignin || isSignup ? undefined : "pt-24 pb-20 sm:pt-28 sm:pb-8"}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/money" element={<Money />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <RoutesWithPadding />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
