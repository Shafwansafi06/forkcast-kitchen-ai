import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

const dietaryTags = ['Vegetarian', 'Vegan', 'Gluten Free', 'Keto', 'Dairy Free', 'Nut Free'];

const RecipeMaker = () => {
  const location = useLocation();
  const prefill = location.state?.recipe || {};
  const [name, setName] = useState(prefill.name || '');
  const [ingredients, setIngredients] = useState(prefill.ingredients || ['']);
  const [steps, setSteps] = useState(prefill.steps || '');
  const [cookingTime, setCookingTime] = useState(prefill.cookingTime || '');
  const [tags, setTags] = useState<string[]>(prefill.tags || []);
  const [timer, setTimer] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    if (timerActive && timer !== null && timer > 0) {
      const interval = setInterval(() => setTimer((t) => (t ? t - 1 : 0)), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setTimerActive(false);
  }, [timerActive, timer]);

  useEffect(() => {
    const saved = localStorage.getItem('forkcast_custom_recipes');
    if (saved) setSavedRecipes(JSON.parse(saved));
  }, []);

  const handleIngredientChange = (idx: number, value: string) => {
    setIngredients((prev) => prev.map((ing, i) => (i === idx ? value : ing)));
  };
  const addIngredient = () => setIngredients((prev) => [...prev, '']);
  const removeIngredient = (idx: number) => setIngredients((prev) => prev.filter((_, i) => i !== idx));

  const handleTagToggle = (tag: string) => {
    setTags((prev) => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSave = () => {
    const recipe = { name, ingredients: ingredients.filter(Boolean), steps, cookingTime, tags };
    const updated = [...savedRecipes, recipe];
    setSavedRecipes(updated);
    localStorage.setItem('forkcast_custom_recipes', JSON.stringify(updated));
    alert('Recipe saved!');
  };

  const handleStartTimer = () => {
    if (cookingTime && !isNaN(Number(cookingTime))) {
      setTimer(Number(cookingTime) * 60);
      setTimerActive(true);
    }
  };

  const formatTimer = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card className="bg-slate-800/70 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl flex items-center justify-between">
            Recipe Maker
            {timer !== null && timerActive && (
              <span className="ml-4 px-3 py-1 rounded bg-blue-600 text-white font-mono text-lg">⏱ {formatTimer(timer)}</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            className="bg-slate-700 border-slate-600 text-white"
            placeholder="Recipe Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div>
            <label className="block text-slate-300 mb-2">Ingredients</label>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder={`Ingredient ${idx + 1}`}
                  value={ing}
                  onChange={e => handleIngredientChange(idx, e.target.value)}
                />
                <Button variant="outline" onClick={() => removeIngredient(idx)} disabled={ingredients.length === 1}>Remove</Button>
              </div>
            ))}
            <Button variant="outline" onClick={addIngredient}>Add Ingredient</Button>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Steps</label>
            <textarea
              className="w-full p-3 bg-slate-700 border-slate-600 text-white rounded-md resize-none h-24"
              value={steps}
              onChange={e => setSteps(e.target.value)}
              placeholder="Describe the steps..."
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Cooking Time (minutes)</label>
            <Input
              type="number"
              className="bg-slate-700 border-slate-600 text-white"
              value={cookingTime}
              onChange={e => setCookingTime(e.target.value)}
              placeholder="e.g. 30"
            />
            <Button className="mt-2" onClick={handleStartTimer} disabled={timerActive || !cookingTime}>Start Timer</Button>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Dietary Tags</label>
            <div className="flex flex-wrap gap-2">
              {dietaryTags.map(tag => (
                <Button
                  key={tag}
                  variant={tags.includes(tag) ? 'default' : 'outline'}
                  className={tags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={handleSave}>Save Recipe</Button>
        </CardContent>
      </Card>
      {/* List of saved recipes */}
      <div className="mt-8">
        <h2 className="text-xl text-white mb-4">Saved Recipes</h2>
        {savedRecipes.length === 0 && <p className="text-slate-400">No recipes saved yet.</p>}
        {savedRecipes.map((r, i) => (
          <Card key={i} className="mb-4 bg-slate-700/70 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white text-lg">{r.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-300 mb-2">Ingredients: {r.ingredients.join(', ')}</div>
              <div className="text-slate-300 mb-2">Steps: {r.steps}</div>
              <div className="text-slate-300 mb-2">Cooking Time: {r.cookingTime} min</div>
              <div className="text-slate-300 mb-2">Tags: {r.tags.join(', ')}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeMaker; 