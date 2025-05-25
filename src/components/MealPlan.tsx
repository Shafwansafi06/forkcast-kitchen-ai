
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const MealPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const mealData = {
    Monday: { breakfast: 'Spinach Omelette', lunch: 'Quinoa Salad', dinner: 'Grilled Salmon' },
    Tuesday: { breakfast: 'Greek Yogurt Bowl', lunch: 'Buddha Bowl', dinner: 'Chicken Stir-fry' },
    Wednesday: { breakfast: 'Avocado Toast', lunch: 'Lentil Soup', dinner: 'Chicken Fajita Bowl' },
    Thursday: { breakfast: 'Spinach Frittata', lunch: 'Caprese Salad', dinner: 'Beef Tacos' },
    Friday: { breakfast: 'Overnight Oats', lunch: 'Veggie Wrap', dinner: 'Teriyaki Tofu' },
    Saturday: { breakfast: 'Pancakes', lunch: 'Caesar Salad', dinner: 'Pizza Night' },
    Sunday: { breakfast: 'French Toast', lunch: 'Soup & Sandwich', dinner: 'Roast Chicken' }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Generate New Meal Plan</h1>
      </div>

      {/* Meal Plan Generator Form */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
          {/* Dietary Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Dietary Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Vegetarian', active: true },
                { label: 'Vegan', active: false },
                { label: 'Gluten Free', active: false },
                { label: 'Keto', active: false }
              ].map((diet) => (
                <div key={diet.label} className="flex items-center space-x-2">
                  <Switch checked={diet.active} />
                  <span className="text-slate-300">{diet.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calorie Target */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Calorie Target: <span className="text-blue-400">2000 kcal/day</span>
              </label>
              <Slider
                value={[2000]}
                max={3000}
                min={1200}
                step={100}
                className="w-full"
              />
            </div>

            {/* Protein Target */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Protein Target: <span className="text-blue-400">150 g/day</span>
              </label>
              <Slider
                value={[150]}
                max={200}
                min={50}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          {/* Meal Frequency */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Meal Frequency</label>
            <div className="flex items-center justify-between bg-slate-700 rounded-lg p-1">
              <span className="text-slate-400 text-sm px-4">1 meal</span>
              <div className="flex-1 mx-4">
                <Slider
                  value={[3]}
                  max={6}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-slate-400 text-sm px-4">6 meals</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-blue-400 font-medium">3 meals per day</span>
            </div>
          </div>

          {/* Weekly Budget */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Weekly Budget</label>
            <div className="flex items-center justify-between bg-slate-700 rounded-lg p-1">
              <span className="text-slate-400 text-sm px-4">$50</span>
              <div className="flex-1 mx-4">
                <Slider
                  value={[120]}
                  max={200}
                  min={50}
                  step={10}
                  className="w-full"
                />
              </div>
              <span className="text-slate-400 text-sm px-4">$200</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-blue-400 font-medium">$120 per week</span>
            </div>
          </div>

          {/* Allergies & Restrictions */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Allergies & Restrictions</label>
            <div className="flex items-center gap-2 text-slate-400">
              <span>🚫</span>
              <span>e.g. peanuts, shellfish, dairy...</span>
            </div>
          </div>

          {/* Cooking Time Limit */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Cooking Time Limit</label>
            <Select>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                <SelectValue placeholder="30 minutes or less" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes or less</SelectItem>
                <SelectItem value="30">30 minutes or less</SelectItem>
                <SelectItem value="60">1 hour or less</SelectItem>
                <SelectItem value="unlimited">No limit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
            🤖 Generate AI Meal Plan
          </Button>
        </CardContent>
      </Card>

      {/* Current Meal Plan */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Current Meal Plan</h2>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {days.map((day) => (
            <Card key={day} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <h3 className="text-blue-400 font-semibold mb-3">{day}</h3>
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Breakfast</div>
                    <div className="text-white text-sm font-medium">{mealData[day as keyof typeof mealData]?.breakfast}</div>
                    <div className="text-xs text-slate-400">320 kcal</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Lunch</div>
                    <div className="text-white text-sm font-medium">{mealData[day as keyof typeof mealData]?.lunch}</div>
                    <div className="text-xs text-slate-400">450 kcal</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Dinner</div>
                    <div className="text-white text-sm font-medium">{mealData[day as keyof typeof mealData]?.dinner}</div>
                    <div className="text-xs text-slate-400">580 kcal</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
