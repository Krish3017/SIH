import { Home, Sparkles, MessageSquare, CloudSun, Wallet, ListChecks, LayoutDashboard, Phone } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Navigation = () => {
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

  return (
    <nav>
      {/* The tubelight navbar handles its own fixed positioning and styling */}
      <NavBar items={navItems} />
    </nav>
  );
};

export default Navigation;