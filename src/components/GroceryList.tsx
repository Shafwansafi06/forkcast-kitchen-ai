import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShoppingCart, Plus, Search, MapPin } from "lucide-react";
import { getGeminiGroceryListFromMealPlanDayWise } from '@/utils/gemini';
import ReactMarkdown from 'react-markdown';
import { useProfile } from "@/hooks/useProfile";

const GroceryList = () => {
  const { profile } = useProfile();
  const [groceryPlan, setGroceryPlan] = useState<any | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const importFromMealPlan = async () => {
    setImporting(true);
    setImportError(null);
    const mealPlanStr = localStorage.getItem('forkcast_meal_plan');
    if (!mealPlanStr) {
      toast.error('No meal plan found. Create a meal plan first!');
      setImporting(false);
      return;
    }
    try {
      const mealPlan = JSON.parse(mealPlanStr);
      const groceries = await getGeminiGroceryListFromMealPlanDayWise(mealPlan);
      setGroceryPlan(groceries);
      const userId = profile?.id || '';
      const groceryKey = `forkcast_grocery_lists_count_${userId}`;
      const groceryCount = parseInt(localStorage.getItem(groceryKey) || '0', 10) + 1;
      localStorage.setItem(groceryKey, groceryCount.toString());
      toast.success('Grocery list imported from meal plan!');
    } catch (err: any) {
      setImportError(err.message || 'Failed to import grocery list.');
    }
    setImporting(false);
  };

  const categoryIcons = {
    'Produce': '🥬',
    'Grains & Starches': '🌾',
    'Protein': '🥩',
    'Condiments & Oils': '🍯'
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Smart Grocery List</h1>
          <p className="text-slate-400 mt-2">Powered by Gemini AI</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={importFromMealPlan}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            disabled={importing}
          >
            📋 Import from Meal Plan
          </Button>
          <Button 
            onClick={() => window.print()}
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            🖨️ Print
          </Button>
        </div>
      </div>

      {/* Render imported grocery plan if available */}
      {groceryPlan && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Grocery List by Day & Category</h2>
          {importError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{importError}</div>}
          {Object.entries(groceryPlan).map(([day, categories]) => (
            <Card key={day} className="bg-slate-800/50 border-slate-700 mb-4">
              <CardContent className="p-4">
                <h3 className="text-blue-400 font-semibold mb-2">{day}</h3>
                {Object.entries(categories as Record<string, string[]>).map(([category, items]) => (
                  <div key={category} className="mb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{categoryIcons[category] || '🛒'}</span>
                      <span className="text-white font-semibold text-lg">{category}</span>
                      <span className="text-slate-500 text-sm">({items.length} items)</span>
                    </div>
                    <div className="space-y-2 ml-6">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-2">
                          <Checkbox checked={false} onCheckedChange={() => {}} />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroceryList;
