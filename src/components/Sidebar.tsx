import { cn } from "@/lib/utils";
import { Calendar, Settings, ShoppingCart, BarChart3, LogOut, Menu, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'meal-plan', label: 'Meal Plan', icon: Calendar, path: '/meal-plan' },
    { id: 'grocery-list', label: 'Grocery List', icon: ShoppingCart, path: '/grocery-list' },
    { id: 'recipe-maker', label: 'Recipe Maker', icon: ChefHat, path: '/recipe-maker' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const SidebarContent = (
    <div className="w-64 max-w-full bg-slate-900/90 border-r border-slate-700 p-4 min-h-screen flex flex-col backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-8">
        <img 
          src="/logo.png" 
          alt="ForkCast Logo" 
          className="h-10 w-auto"
        />
        <span className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          ForkCast
        </span>
      </div>
      
      {profile && (
        <div className="mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-xs">Welcome back,</p>
          <p className="text-white font-medium">
            {profile.first_name || profile.last_name
              ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
              : (profile.email ? profile.email.split('@')[0] : 'User')}
          </p>
          {profile.subscription_tier === 'pro' && (
            <p className="text-yellow-400 text-xs font-medium mt-1">Pro Member</p>
          )}
        </div>
      )}
      
      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-lg transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="space-y-2 mt-4">
        <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] text-lg py-3">
          ⭐ Pro Features Unlocked
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 text-lg py-3"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          className="fixed top-4 left-4 z-50 bg-slate-900/80 rounded-full p-2 shadow-lg border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="w-7 h-7" />
        </button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="p-0 w-64 max-w-full bg-slate-900/90 border-r border-slate-700">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return SidebarContent;
};

export default Sidebar;
