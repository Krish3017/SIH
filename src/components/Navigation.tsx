import { Home, Sparkles, MessageSquare, CloudSun, Wallet, ListChecks, LayoutDashboard, Phone, LogIn, LogOut, User } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();
  
  // Hide navbar on signin/signup pages
  if (location.pathname === "/signin" || location.pathname === "/signup") {
    return null;
  }

  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Features", url: "/features", icon: Sparkles },
    { name: "Chatbot", url: "/chatbot", icon: MessageSquare },
    { name: "Weather", url: "/weather", icon: CloudSun },
    { name: "Money", url: "/money", icon: Wallet },
    { name: "Recommendations", url: "/recommendations", icon: ListChecks },
    { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { name: "Contact", url: "/contact", icon: Phone },
  ];

  // Add Sign In button if user is not authenticated
  if (!isAuthenticated) {
    navItems.push({ name: "Sign In", url: "/signin", icon: LogIn });
  }

  return (
    <nav>
      {/* The tubelight navbar handles its own fixed positioning and styling */}
      <NavBar items={navItems} />
      
      {/* User info and sign out button */}
      {user && (
        <div className="fixed top-7 right-12 z-50 flex items-center gap-2 bg-card/95 border border-border backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md w-fit">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground font-medium">Logout</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="h-7 px-1.5 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
      
      )}
    </nav>
  );
};

export default Navigation;