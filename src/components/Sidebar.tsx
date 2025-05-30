import { cn } from "@/lib/utils";
import { Calendar, Settings, ShoppingCart, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { signOut } = useAuth();
  const { profile } = useProfile();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'meal-plan', label: 'Meal Plan', icon: Calendar },
    { id: 'grocery-list', label: 'Grocery List', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="w-48 bg-slate-900/90 border-r border-slate-700 p-4 min-h-screen flex flex-col backdrop-blur-sm">
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
          <p className="text-white font-medium">{profile.first_name || 'User'}</p>
          {profile.subscription_tier === 'pro' && (
            <p className="text-yellow-400 text-xs font-medium mt-1">Pro Member</p>
          )}
        </div>
      )}
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200",
              activeTab === item.id && "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-2 border-blue-500"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="space-y-2">
        <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]">
          ⭐ Pro Features Unlocked
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
