import { Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export function NavBarDemo() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "/features", icon: User },
    { name: "Projects", url: "/dashboard", icon: Briefcase },
    { name: "Resume", url: "/contact", icon: FileText },
  ];

  return <NavBar items={navItems} />;
}


