
import { useState } from 'react';

export const useSpoonacular = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = '4b58741481ef44c8ae554ad9193158e8';
  const BASE_URL = 'https://api.spoonacular.com';

  const searchRecipes = async (query: string, options: any = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        query,
        number: '12',
        addRecipeInformation: 'true',
        ...options
      });

      const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch recipes');
      }

      setIsLoading(false);
      return data.results;
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      return [];
    }
  };

  const getRandomRecipes = async (number: number = 6, tags?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        number: number.toString(),
      });

      if (tags) {
        params.append('tags', tags);
      }

      const response = await fetch(`${BASE_URL}/recipes/random?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch random recipes');
      }

      setIsLoading(false);
      return data.recipes;
    } catch (err) {
      console.error('Error fetching random recipes:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      return [];
    }
  };

  const generateMealPlan = async (timeFrame: string, targetCalories: number, diet?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        apiKey: API_KEY,
        timeFrame,
        targetCalories: targetCalories.toString(),
      });

      if (diet) {
        params.append('diet', diet);
      }

      const response = await fetch(`${BASE_URL}/mealplanner/generate?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate meal plan');
      }

      setIsLoading(false);
      return data;
    } catch (err) {
      console.error('Error generating meal plan:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      return null;
    }
  };

  return {
    searchRecipes,
    getRandomRecipes,
    generateMealPlan,
    isLoading,
    error
  };
};
