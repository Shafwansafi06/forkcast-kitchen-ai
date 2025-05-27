
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAI } from '@/hooks/useAI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AIHelper = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const { generateMealSuggestions, isLoading, error } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const suggestions = await generateMealSuggestions({ prompt });
    if (suggestions) {
      setResponse(suggestions);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">AI Meal Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Ask ForkCast AI for meal suggestions:
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I need healthy dinner ideas for this week under $50"
              className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
              rows={3}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading ? 'Generating...' : 'Get AI Suggestions'}
          </Button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        {response && (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
            <h3 className="font-medium mb-2">AI Suggestions:</h3>
            <div className="whitespace-pre-wrap text-sm">{response}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIHelper;
