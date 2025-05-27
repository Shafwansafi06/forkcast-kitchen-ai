
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIHelper from './AIHelper';
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { Calendar, ChefHat, ShoppingCart, TrendingUp, Sparkles, Clock } from "lucide-react";

const Dashboard = () => {
  const { profile, updateProfile } = useProfile();
  const [recentMeals, setRecentMeals] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({
    mealsPlanned: 12,
    groceryLists: 3,
    budgetSaved: 45.23,
    recipesTried: 8
  });

  // Enable pro features for testing
  useEffect(() => {
    if (profile && profile.subscription_tier !== 'pro') {
      updateProfile({ subscription_tier: 'pro' });
    }
  }, [profile, updateProfile]);

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

  const handleTabChange = (tab: string) => {
    const url = new URL(window.location);
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
              src="/lovable-uploads/dd7827cf-89f3-4055-834d-3bcaf26d741f.png" 
              alt="ForkCast Logo" 
              className="w-8 h-8 opacity-90"
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
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{profile?.first_name?.[0] || 'F'}</span>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Meals Planned
            </CardTitle>
            <Calendar className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{weeklyStats.mealsPlanned}</div>
            <p className="text-xs text-blue-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Grocery Lists
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{weeklyStats.groceryLists}</div>
            <p className="text-xs text-green-400">
              Active lists
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Budget Saved
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">${weeklyStats.budgetSaved}</div>
            <p className="text-xs text-purple-400">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:from-orange-500/30 hover:to-orange-600/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Recipes Tried
            </CardTitle>
            <ChefHat className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{weeklyStats.recipesTried}</div>
            <p className="text-xs text-orange-400">
              New this week
            </p>
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
                onClick={() => window.open('https://spoonacular.com/recipes', '_blank')}
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
