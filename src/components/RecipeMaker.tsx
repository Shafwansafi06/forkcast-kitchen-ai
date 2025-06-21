import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { getGeminiRecipeStepsAndTime } from '@/utils/gemini';

const RecipeMaker = () => {
  const location = useLocation();
  const recipeFromMealPlan = location.state?.recipe;
  // Prefill all data from navigation state
  const prefill = recipeFromMealPlan || {};
  const name = prefill.name || '';
  const ingredients = prefill.ingredients || [];
  const tags = prefill.tags || [];

  // Step-by-step navigation and Gemini fetch
  const [steps, setSteps] = useState<Array<string>>(Array.isArray(prefill.steps) ? prefill.steps : (typeof prefill.steps === 'string' ? prefill.steps.split(/\n|\r|\d+\./).map(s => s.trim()).filter(Boolean) : []));
  const [cookingTime, setCookingTime] = useState<number>(prefill.cookingTime || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  // Timer logic
  const [timer, setTimer] = useState((prefill.cookingTime || 0) * 60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if ((!steps.length || !cookingTime) && name) {
      setLoading(true);
      setError(null);
      getGeminiRecipeStepsAndTime(name)
        .then(({ steps: fetchedSteps, cookingTime: fetchedTime }) => {
          setSteps(fetchedSteps);
          setCookingTime(fetchedTime);
          setTimer(fetchedTime * 60);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    if (timer === 0 && timerActive) setTimerActive(false);
    return () => { if (interval) clearInterval(interval); };
  }, [timerActive, timer]);

  const formatTimer = (t: number) => `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-white text-lg animate-pulse">Loading recipe steps...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="text-red-400 text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto animate-fade-in">
      <Card className="bg-slate-800/80 border-slate-700 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-2xl flex items-center gap-2">
            {name}
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400">Cooking Time</span>
              <span className="text-blue-400 font-bold text-lg">⏱ {cookingTime} min</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-400">Timer</span>
              <span className="ml-2 px-3 py-1 rounded bg-blue-600 text-white font-mono text-lg">
                {formatTimer(timer)}
              </span>
              <Button size="sm" className="mt-1" onClick={() => setTimerActive(!timerActive)}>
                {timerActive ? 'Pause' : 'Start'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags && tags.length > 0 && tags.map((tag: string) => (
              <span key={tag} className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-lg text-white font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-slate-200">
              {ingredients.map((ing: string, idx: number) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg text-white font-semibold mb-2">Step {currentStep + 1} of {steps.length}</h3>
            <div className="bg-slate-700/80 rounded-lg p-4 text-white text-lg min-h-[80px] flex items-center">
              {steps[currentStep]}
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0} variant="outline">Previous</Button>
              <Button onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))} disabled={currentStep === steps.length - 1} variant="default">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeMaker; 