import { useState } from 'react';
import { getGeminiMealSuggestions } from '@/utils/gemini';

interface MealSuggestionRequest {
  prompt: string;
  preferences?: string;
  budget?: string;
  dietaryRestrictions?: string;
}

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMealSuggestions = async ({
    prompt,
    preferences,
    budget,
    dietaryRestrictions
  }: MealSuggestionRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      // Compose the prompt with any extra info
      let fullPrompt = prompt;
      if (preferences) fullPrompt += ` Preferences: ${preferences}.`;
      if (budget) fullPrompt += ` Budget: ${budget}.`;
      if (dietaryRestrictions) fullPrompt += ` Dietary restrictions: ${dietaryRestrictions}.`;
      const suggestions = await getGeminiMealSuggestions(fullPrompt);
      setIsLoading(false);
      return suggestions.join('\n');
    } catch (err) {
      console.error('Error generating meal suggestions:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      return null;
    }
  };

  return {
    generateMealSuggestions,
    isLoading,
    error
  };
};
