
import { cn } from "@/lib/utils";
import { Calendar, Settings, ShoppingCart, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'meal-plan', label: 'Meal Plan', icon: Calendar },
    { id: 'grocery-list', label: 'Grocery List', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-48 bg-slate-900/50 border-r border-slate-800 p-4 min-h-screen">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="text-white font-semibold text-lg">ForkCast</span>
      </div>
      
      <nav className="space-y-2">
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
      
      <div className="mt-auto pt-8">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          ↑ Upgrade to Pro
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
