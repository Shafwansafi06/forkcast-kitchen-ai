import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useProfile, hasProAccess } from "@/hooks/useProfile";
import { toast } from "sonner";
import { Loader2, ChefHat } from "lucide-react";
import { getGeminiMealSuggestions, getGeminiMealDifficulty } from '@/utils/gemini';
import { useNavigate } from 'react-router-dom';

const difficultyColors = {
  'Easy': 'bg-green-600',
  'Medium': 'bg-yellow-500',
  'Time-Consuming': 'bg-orange-600',
};

function DifficultyBadge({ difficulty }) {
  if (!difficulty) return null;
  return (
    <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold text-white ${difficultyColors[difficulty] || 'bg-gray-500'}`}>{difficulty}</span>
  );
}

const MealPlan = () => {
  const { profile } = useProfile();
  const [mealPlan, setMealPlan] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState({
    vegetarian: profile?.dietary_preferences?.includes('vegetarian') || false,
    vegan: profile?.dietary_preferences?.includes('vegan') || false,
    glutenFree: profile?.dietary_preferences?.includes('gluten_free') || false,
    keto: profile?.dietary_preferences?.includes('keto') || false,
  });
  const [calorieTarget, setCalorieTarget] = useState([2000]);
  const [proteinTarget, setProteinTarget] = useState([150]);
  const [mealFrequency, setMealFrequency] = useState([3]);
  const [weeklyBudget, setWeeklyBudget] = useState([120]);
  const [cookingTimeLimit, setCookingTimeLimit] = useState("30");
  const [allergies, setAllergies] = useState("");
  const navigate = useNavigate();
  const [mealDifficulties, setMealDifficulties] = useState({});

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    // Load existing meal plan if available
    const savedMealPlan = localStorage.getItem('forkcast_meal_plan');
    if (savedMealPlan) {
      setMealPlan(JSON.parse(savedMealPlan));
    }
  }, []);

  useEffect(() => {
    // On mealPlan change, categorize all meals
    const categorizeMeals = async () => {
      const newDiffs = {};
      for (const day of days) {
        for (const mealType of ['Breakfast', 'Lunch', 'Dinner']) {
          const meal = mealPlan[day]?.[mealType]?.meal || mealPlan[day]?.[mealType?.toLowerCase()] || '';
          const time = mealPlan[day]?.[mealType]?.time || null;
          if (meal) {
            try {
              const { difficulty, time: estTime } = await getGeminiMealDifficulty(meal, '', time);
              newDiffs[`${day}-${mealType}`] = { difficulty, time: estTime };
            } catch {
              newDiffs[`${day}-${mealType}`] = { difficulty: null, time: null };
            }
          }
        }
      }
      setMealDifficulties(newDiffs);
    };
    if (Object.keys(mealPlan).length > 0) categorizeMeals();
  }, [mealPlan]);

  const generateMealPlan = async () => {
    if (!hasProAccess(profile)) {
      toast.error('Upgrade to Pro to generate unlimited meal plans!');
      return;
    }

    setIsGenerating(true);
    try {
      // Build dietary restrictions string
      const dietaryRestrictions = [];
      if (preferences.vegetarian) dietaryRestrictions.push('vegetarian');
      if (preferences.vegan) dietaryRestrictions.push('vegan');
      if (preferences.glutenFree) dietaryRestrictions.push('gluten-free');
      if (preferences.keto) dietaryRestrictions.push('keto');
      if (allergies.trim()) dietaryRestrictions.push(`allergic to: ${allergies}`);

      // Compose stricter Gemini prompt
      const prompt = `Generate a 7-day meal plan. For each day, list breakfast, lunch, and dinner, each with a unique meal name and calorie count. Use the following preferences: ${dietaryRestrictions.join(', ') || 'none'}. Calorie target: ${calorieTarget[0]} kcal/day. Protein target: ${proteinTarget[0]}g/day. Meal frequency: ${mealFrequency[0]} per day. Weekly budget: $${weeklyBudget[0]}. Cooking time limit: ${cookingTimeLimit} minutes.\n\nReply with only valid JSON, no explanation, no markdown, no code block, no comments. Do not include any text before or after the JSON. If you cannot generate a meal, use 'Not planned' and 0 for calories.\n\nFormat:\n{\n  \"Monday\": {\n    \"Breakfast\": {\"meal\": \"...\", \"calories\": ...},\n    \"Lunch\": {\"meal\": \"...\", \"calories\": ...},\n    \"Dinner\": {\"meal\": \"...\", \"calories\": ...}\n  },\n  ...\n}`;

      const suggestions = await getGeminiMealSuggestions(prompt);
      // Join suggestions in case Gemini splits JSON over lines
      const rawString = suggestions.join(' ');
      // Extract the first {...} JSON block
      const match = rawString.match(/\{[\s\S]*\}/);
      let newMealPlan = {};
      if (match) {
        try {
          newMealPlan = JSON.parse(match[0]);
        } catch (err) {
          toast.error('AI returned invalid JSON. Please try again.');
          setIsGenerating(false);
          return;
        }
      } else {
        toast.error('AI did not return a valid meal plan. Please try again.');
        setIsGenerating(false);
        return;
      }
      setMealPlan(newMealPlan);
      localStorage.setItem('forkcast_meal_plan', JSON.stringify(newMealPlan));
      toast.success('Meal plan generated successfully! 🍽️');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast.error('Failed to generate meal plan. Please try again.');
    }
    setIsGenerating(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Generate New Meal Plan</h1>
          <p className="text-slate-400 mt-2">Customize your perfect weekly meal plan</p>
        </div>
        <ChefHat className="w-8 h-8 text-blue-400" />
      </div>

      {/* Meal Plan Generator Form */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6 space-y-6">
          {/* Dietary Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Dietary Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Switch 
                    checked={value} 
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, [key]: checked }))}
                  />
                  <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calorie Target */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Calorie Target: <span className="text-blue-400">{calorieTarget[0]} kcal/day</span>
              </label>
              <Slider
                value={calorieTarget}
                onValueChange={setCalorieTarget}
                max={3000}
                min={1200}
                step={100}
                className="w-full"
              />
            </div>

            {/* Protein Target */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                Protein Target: <span className="text-blue-400">{proteinTarget[0]} g/day</span>
              </label>
              <Slider
                value={proteinTarget}
                onValueChange={setProteinTarget}
                max={200}
                min={50}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          {/* Meal Frequency */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Meal Frequency: <span className="text-blue-400">{mealFrequency[0]} meals per day</span>
            </label>
            <Slider
              value={mealFrequency}
              onValueChange={setMealFrequency}
              max={6}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Weekly Budget */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Weekly Budget: <span className="text-blue-400">${weeklyBudget[0]} per week</span>
            </label>
            <Slider
              value={weeklyBudget}
              onValueChange={setWeeklyBudget}
              max={200}
              min={50}
              step={10}
              className="w-full"
            />
          </div>

          {/* Allergies & Restrictions */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Allergies & Restrictions</label>
            <Input
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g. peanuts, shellfish, dairy..."
              className="bg-slate-700 border-slate-600 text-slate-300"
            />
          </div>

          {/* Cooking Time Limit */}
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Cooking Time Limit</label>
            <Select value={cookingTimeLimit} onValueChange={setCookingTimeLimit}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes or less</SelectItem>
                <SelectItem value="30">30 minutes or less</SelectItem>
                <SelectItem value="60">1 hour or less</SelectItem>
                <SelectItem value="unlimited">No limit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generateMealPlan}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Your Perfect Meal Plan...
              </>
            ) : (
              <>
                🤖 Generate AI Meal Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Current Meal Plan */}
      {Object.keys(mealPlan).length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Your Weekly Meal Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {days.map((day) => (
              <Card key={day} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <h3 className="text-blue-400 font-semibold mb-3">{day}</h3>
                  <div className="space-y-3">
                    {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => {
                      const meal = mealPlan[day]?.[mealType]?.meal || mealPlan[day]?.[mealType?.toLowerCase()] || 'Not planned';
                      const calories = mealPlan[day]?.[mealType]?.calories || mealPlan[day]?.[`${mealType.toLowerCase()}_calories`] || 0;
                      const diff = mealDifficulties[`${day}-${mealType}`]?.difficulty;
                      const time = mealDifficulties[`${day}-${mealType}`]?.time;
                      return (
                        <div
                          key={mealType}
                          className="bg-slate-700/50 rounded-lg p-3 relative group cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                          onClick={() => navigate('/dashboard?tab=recipe-maker', { state: { recipe: { name: meal, cookingTime: time } } })}
                        >
                          <DifficultyBadge difficulty={diff} />
                          <div className="text-xs text-slate-400 mb-1">{mealType}</div>
                          <div className="text-white text-sm font-medium">{meal}</div>
                          <div className="text-xs text-slate-400">{calories} kcal</div>
                          {time && <div className="text-xs text-blue-400 mt-1">⏱ {time} min</div>}
                          <div className="hidden group-hover:block absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-bold rounded-lg transition">Click to open in Recipe Maker</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlan;
