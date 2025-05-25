
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
    <div className="w-48 bg-slate-900/50 border-r border-slate-800 p-4 min-h-screen flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="text-white font-semibold text-lg">ForkCast</span>
      </div>
      
      {profile && (
        <div className="mb-6">
          <p className="text-slate-300 text-sm">Welcome back,</p>
          <p className="text-white font-medium">{profile.first_name || 'User'}</p>
        </div>
      )}
      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800",
              activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700"
            )}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="space-y-2">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          ↑ Upgrade to Pro
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
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
