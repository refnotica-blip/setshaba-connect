import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle, Plus, Calendar, MessageSquare, LogIn } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useApp();
  
  const isActive = (path: string) => location.pathname === path;
  
  const citizenLinks = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/issues", icon: AlertTriangle, label: "Issues" },
    { path: "/report", icon: Plus, label: "Report" },
    { path: "/events", icon: Calendar, label: "Events" },
    { path: "/feedback", icon: MessageSquare, label: "Feedback" },
  ];

  if (isAdmin) {
    return null; // Admin uses sidebar navigation
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-content mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">SC</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Setshaba Connect</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {citizenLinks.map(({ path, icon: Icon, label }) => (
              <Button
                key={path}
                asChild
                variant={isActive(path) ? "default" : "ghost"}
                size="sm"
                className={isActive(path) ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" : "hover:bg-gray-100"}
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
            
            <Button asChild variant="outline" size="sm" className="border-primary/20 hover:bg-primary/5">
              <Link to="/admin" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin">
                <LogIn className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 shadow-lg">
        <div className="flex items-center justify-around px-4 py-2">
          {citizenLinks.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              asChild
              variant={isActive(path) ? "default" : "ghost"}
              size="sm"
              className={`flex flex-col gap-1 h-auto py-3 ${
                isActive(path) 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-md rounded-xl" 
                  : "hover:bg-gray-100 rounded-xl"
              }`}
            >
              <Link to={path}>
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};