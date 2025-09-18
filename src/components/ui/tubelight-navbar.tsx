"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keep active tab in sync with router location
  useEffect(() => {
    const matched = items.find((i) => i.url === location.pathname);
    if (matched && matched.name !== activeTab) {
      setActiveTab(matched.name);
    }
  }, [location.pathname, items, activeTab]);

  return (
    <div
      className={cn(
        // Positioning like the provided component
        "fixed bottom-0 sm:bottom-auto sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      {/* Colors adjusted to match existing navbar: bg-card/95, border-border, backdrop blur, shadow-soft */}
      <div className="flex items-center gap-1 bg-card/95 border border-border backdrop-blur-sm py-1 px-2 rounded-full shadow-soft min-w-fit">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          const isSignIn = item.name === "Sign In";

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold rounded-full transition-colors flex items-center justify-center",
                // Match current theme tokens
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                isActive && "bg-primary text-primary-foreground",
                // Different padding for Sign In button
                isSignIn ? "px-4 py-2 min-w-[80px]" : "px-4 py-2 min-w-[70px]",
                // Responsive sizing
                "text-xs sm:text-sm"
              )}
            >
              <span className="hidden sm:inline whitespace-nowrap">{item.name}</span>
              <span className="sm:hidden">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Subtle primary glow to mimic tubelight effect while keeping colors */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}


