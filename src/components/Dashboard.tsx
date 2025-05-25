
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const nutritionData = [
    { label: 'Calories', current: 1520, target: 2000, percentage: 75, color: 'text-blue-400' },
    { label: 'Protein', current: 98, target: 150, unit: 'g', percentage: 65, color: 'text-green-400' },
    { label: 'Carbs', current: 120, target: 200, unit: 'g', percentage: 60, color: 'text-orange-400' },
    { label: 'Fat', current: 45, target: 90, unit: 'g', percentage: 50, color: 'text-purple-400' },
  ];

  const weeklyMeals = [
    { day: 'Monday', meal: 'Grilled Salmon', type: 'Dinner', calories: 520, image: '/lovable-uploads/760c99e7-47a8-4fb3-b18c-c1333aec3025.png' },
    { day: 'Tuesday', meal: 'Buddha Bowl', type: 'Lunch', calories: 450, image: '/lovable-uploads/760c99e7-47a8-4fb3-b18c-c1333aec3025.png' },
    { day: 'Wednesday', meal: 'Chicken Fajita Bowl', type: 'Dinner', calories: 580, image: '/lovable-uploads/760c99e7-47a8-4fb3-b18c-c1333aec3025.png' },
    { day: 'Thursday', meal: 'Spinach Frittata', type: 'Breakfast', calories: 320, image: '/lovable-uploads/760c99e7-47a8-4fb3-b18c-c1333aec3025.png' },
    { day: 'Friday', meal: 'Teriyaki Tofu', type: 'Dinner', calories: 410, image: '/lovable-uploads/760c99e7-47a8-4fb3-b18c-c1333aec3025.png' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Good morning, Alex</h1>
          <p className="text-slate-400">Sunday, May 25, 2025</p>
        </div>
        <div className="text-slate-400 text-sm">
          To exit full screen, press and hold <kbd className="px-2 py-1 bg-slate-700 rounded">Esc</kbd>
        </div>
      </div>

      {/* Today's AI Suggestion */}
      <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-blue-400 text-sm mb-2">Today's AI Suggestion</p>
              <h2 className="text-2xl font-bold text-white mb-3">Mediterranean Quinoa Bowl</h2>
              <p className="text-slate-300 mb-4 max-w-md">
                A protein-rich bowl with roasted vegetables, feta cheese, and a lemon-tahini 
                dressing. Perfect for your fitness goals and dietary preferences.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                <span className="flex items-center gap-1">
                  ⏱️ 25 min
                </span>
                <span className="flex items-center gap-1">
                  🔥 420 kcal
                </span>
                <span className="flex items-center gap-1">
                  🌱 Vegetarian
                </span>
              </div>
              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Cook This
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  🔄 Generate New
                </Button>
              </div>
            </div>
            <div className="w-64 h-48 rounded-lg overflow-hidden bg-slate-600 flex-shrink-0 ml-6">
              <img 
                src="/lovable-uploads/760c99e7-47a8-4fb3-b18c-c1333aec3025.png" 
                alt="Mediterranean Quinoa Bowl"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Nutrition */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Today's Nutrition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nutritionData.map((item) => (
            <Card key={item.label} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">{item.label}</span>
                  <span className={`text-sm font-medium ${item.color}`}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {item.current.toLocaleString()}{item.unit && ` ${item.unit}`} / {item.target.toLocaleString()}{item.unit || ''}
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      item.color.includes('blue') ? 'from-blue-500 to-blue-400' :
                      item.color.includes('green') ? 'from-green-500 to-green-400' :
                      item.color.includes('orange') ? 'from-orange-500 to-orange-400' :
                      'from-purple-500 to-purple-400'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Meal Plan */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Weekly Meal Plan</h3>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            ✏️ Edit Plan
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {weeklyMeals.map((meal) => (
            <Card key={meal.day} className="bg-slate-800/50 border-slate-700 overflow-hidden group hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-0">
                <div className="h-32 bg-slate-600 overflow-hidden">
                  <img 
                    src={meal.image} 
                    alt={meal.meal}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <div className="text-blue-400 text-sm font-medium mb-1">{meal.day}</div>
                  <div className="text-white font-semibold mb-1">{meal.meal}</div>
                  <div className="text-slate-400 text-sm mb-2">{meal.type} • {meal.calories} kcal</div>
                  <div className="flex gap-2">
                    <button className="text-slate-400 hover:text-red-400 transition-colors">
                      ❤️
                    </button>
                    <button className="text-slate-400 hover:text-blue-400 transition-colors">
                      🔄
                    </button>
                    <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 h-auto text-sm">
                      View Recipe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Generate New Meal Plan */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Generate New Meal Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Dietary Preferences</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <span className="text-slate-300">Vegetarian</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">Calorie Target</label>
              <div className="text-slate-300">2000 kcal/day</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
