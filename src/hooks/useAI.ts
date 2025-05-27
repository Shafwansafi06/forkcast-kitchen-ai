
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase.functions.invoke('generate-meal-suggestions', {
        body: {
          prompt,
          preferences,
          budget,
          dietaryRestrictions
        }
      });

      if (error) throw error;

      setIsLoading(false);
      return data.mealSuggestions;
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
