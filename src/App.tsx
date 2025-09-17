import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Chatbot from "./pages/Chatbot";
import Weather from "./pages/Weather";
import Money from "./pages/Money";
import Recommendations from "./pages/Recommendations";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RoutesWithPadding = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={isHome ? undefined : "pt-24 pb-20 sm:pt-28 sm:pb-8"}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/features" element={<Features />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/money" element={<Money />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
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
        <Navigation />
        <RoutesWithPadding />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
