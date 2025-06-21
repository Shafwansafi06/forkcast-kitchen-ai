import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIHelper from './AIHelper';
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { Calendar, ChefHat, ShoppingCart, TrendingUp, Sparkles, Clock, List, DollarSign } from "lucide-react";
import { getGeminiMealSuggestions } from '@/utils/gemini';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Dashboard = () => {
  const { profile, updateProfile } = useProfile();
  const [recentMeals, setRecentMeals] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({
    mealsPlanned: 0,
    groceryLists: 0,
    budgetSaved: 0,
    recipesTried: 0
  });
  const [geminiSuggestions, setGeminiSuggestions] = useState<string[]>([]);
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);

  // Fetch recent meals from Spoonacular API
  useEffect(() => {
    const fetchRecentMeals = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=4b58741481ef44c8ae554ad9193158e8`);
        const data = await response.json();
        setRecentMeals(data.recipes || []);
      } catch (error) {
        console.error('Failed to fetch recent meals:', error);
      }
    };
    
    fetchRecentMeals();
  }, []);

  useEffect(() => {
    // Fetch user-specific stats from localStorage (except recipesTried)
    if (!profile?.id) return;
    const userId = profile.id;
    const mealPlansKey = `forkcast_meal_plans_count_${userId}`;
    const groceryKey = `forkcast_grocery_lists_count_${userId}`;
    const budgetKey = `forkcast_budget_saved_${userId}`;
    const mealsPlanned = parseInt(localStorage.getItem(mealPlansKey) || '0', 10);
    const groceryLists = parseInt(localStorage.getItem(groceryKey) || '0', 10);
    const budgetSaved = parseFloat(localStorage.getItem(budgetKey) || '0');
    // Recipes Tried (keep Supabase logic)
    const fetchRecipesTried = async () => {
      const { count: recipesTried } = await supabase
        .from('recipes_tried')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id);
      setWeeklyStats({
        mealsPlanned,
        groceryLists,
        budgetSaved,
        recipesTried: recipesTried || 0
      });
    };
    fetchRecipesTried();
  }, [profile]);

  const fetchGeminiSuggestions = async () => {
    setGeminiLoading(true);
    setGeminiError(null);
    try {
      const suggestions = await getGeminiMealSuggestions('Suggest 5 creative, healthy dinner ideas for this week. List only the meal names.');
      setGeminiSuggestions(suggestions);
    } catch (err: any) {
      setGeminiError('Failed to fetch AI suggestions.');
    } finally {
      setGeminiLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
    window.location.reload();
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="/logo.png" 
              alt="ForkCast Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome back, {profile?.first_name || 'Chef'}! 👨‍🍳
            </h1>
          </div>
          <p className="text-slate-400 mt-2 text-lg">Let's plan some delicious meals for this week</p>
          {profile?.subscription_tier === 'pro' && (
            <div className="flex items-center gap-2 mt-3">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium text-sm">Pro Member - All Features Unlocked</span>
            </div>
          )}
          {profile?.subscription_tier === 'trial' && profile?.trial_end && new Date(profile.trial_end) < new Date() && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-red-400 font-medium text-sm">Your free trial has ended. Upgrade to Pro in Settings to unlock all features!</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{profile?.first_name?.[0] || 'F'}</span>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <Card className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Meals Planned</CardTitle>
            <Calendar className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{weeklyStats.mealsPlanned}</div>
            <p className="text-xs flex items-center gap-1 mt-1 text-white/80">
              <TrendingUp className="w-3 h-3" />
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-600 text-white rounded-xl shadow-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Grocery Lists</CardTitle>
            <List className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{weeklyStats.groceryLists}</div>
            <p className="text-xs mt-1 text-white/80">Active lists</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-600 text-white rounded-xl shadow-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Saved</CardTitle>
            <DollarSign className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${weeklyStats.budgetSaved}</div>
            <p className="text-xs mt-1 text-white/80">This month</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-500 text-white rounded-xl shadow-lg p-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recipes Tried</CardTitle>
            <ChefHat className="h-5 w-5 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{weeklyStats.recipesTried}</div>
            <p className="text-xs mt-1 text-white/80">New this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Recipes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-blue-400" />
              Featured Recipes
            </CardTitle>
            <CardDescription className="text-slate-400">
              Trending recipes perfect for your preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="grid grid-cols-2 gap-4">
              {recentMeals.slice(0, 4).map((meal, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={meal.image || '/placeholder.svg'} 
                      alt={meal.title}
                      className="w-full h-32 object-cover transition-transform group-hover:scale-110 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white text-sm font-medium line-clamp-2">{meal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-slate-300" />
                        <p className="text-slate-300 text-xs">{meal.readyInMinutes} mins</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">
              Get started with your meal planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => handleTabChange('meal-plan')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Plan this week's meals
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => handleTabChange('grocery-list')}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Generate grocery list
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => handleTabChange('recipe-maker')}
              >
                <ChefHat className="w-4 h-4 mr-2" />
                Browse recipes
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02]"
                onClick={() => handleTabChange('settings')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Update preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIHelper />
    </div>
  );
};

export default Dashboard;
