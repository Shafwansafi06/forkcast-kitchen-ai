
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIHelper from './AIHelper';
import { useProfile } from "@/hooks/useProfile";
import { useState, useEffect } from "react";
import { Calendar, ChefHat, ShoppingCart, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { profile } = useProfile();
  const [recentMeals, setRecentMeals] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({
    mealsPlanned: 12,
    groceryLists: 3,
    budgetSaved: 45.23,
    recipesTried: 8
  });

  // Fetch recent meals from Spoonacular API
  useEffect(() => {
    const fetchRecentMeals = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=6&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`);
        const data = await response.json();
        setRecentMeals(data.recipes || []);
      } catch (error) {
        console.error('Failed to fetch recent meals:', error);
      }
    };
    
    fetchRecentMeals();
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back, {profile?.first_name || 'Chef'}! 👨‍🍳
          </h1>
          <p className="text-slate-400 mt-2">Let's plan some delicious meals for this week</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Meals Planned
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{weeklyStats.mealsPlanned}</div>
            <p className="text-xs text-blue-400">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Grocery Lists
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{weeklyStats.groceryLists}</div>
            <p className="text-xs text-green-400">
              Active lists
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Budget Saved
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${weeklyStats.budgetSaved}</div>
            <p className="text-xs text-purple-400">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Recipes Tried
            </CardTitle>
            <ChefHat className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{weeklyStats.recipesTried}</div>
            <p className="text-xs text-orange-400">
              New this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Recipes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Featured Recipes</CardTitle>
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
                      className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="text-white text-sm font-medium line-clamp-2">{meal.title}</h4>
                      <p className="text-slate-300 text-xs">{meal.readyInMinutes} mins</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400">
              Get started with your meal planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => window.location.href = '/dashboard?tab=meal-plan'}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Plan this week's meals
              </Button>
              <Button 
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.location.href = '/dashboard?tab=grocery-list'}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Generate grocery list
              </Button>
              <Button 
                className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
              >
                <ChefHat className="w-4 h-4 mr-2" />
                Browse recipes
              </Button>
              <Button 
                className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => window.location.href = '/dashboard?tab=settings'}
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
