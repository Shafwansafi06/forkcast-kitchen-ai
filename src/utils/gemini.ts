const GEMINI_API_KEY = "AIzaSyA6U-9DyIqeOxJdgFOW1xEyDEEVl5rlaGg";

export async function getGeminiMealSuggestions(prompt: string): Promise<string[]> {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    let errorMsg = `Gemini API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMsg += `\n${JSON.stringify(errorData)}`;
      console.error('Gemini API error:', errorData);
    } catch (e) {
      // ignore
    }
    throw new Error(errorMsg);
  }
  const data = await response.json();
  // Parse the response to extract meal suggestions from the text
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  // Split by line or bullet for suggestions
  return text
    .split(/\n|\r|•|\d+\./)
    .map(s => s.trim())
    .filter(Boolean);
}

export async function getGeminiGroceryListFromMealPlan(mealPlan: object): Promise<Record<string, string[]>> {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;
  const planString = JSON.stringify(mealPlan);
  const prompt = `Given this meal plan JSON: ${planString}\nGenerate a weekly grocery list grouped by category (Produce, Grains & Starches, Protein, Condiments & Oils, etc). For each category, list all unique ingredients needed for the week. Reply with only valid JSON, no explanation, no markdown, no code block, no comments. Format: { \"Produce\": [\"Spinach (2 bunches)\", ...], \"Grains & Starches\": [\"Quinoa (1 cup)\", ...], \"Protein\": [\"Chicken breast (1.5 lbs)\", ...], \"Condiments & Oils\": [\"Olive oil\", ...] }`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    let errorMsg = `Gemini API error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMsg += `\n${JSON.stringify(errorData)}`;
      console.error('Gemini API error:', errorData);
    } catch (e) {
      // ignore
    }
    throw new Error(errorMsg);
  }
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  // Extract the first {...} JSON block
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      throw new Error('Gemini returned invalid grocery list JSON.');
    }
  } else {
    throw new Error('Gemini did not return a valid grocery list.');
  }
} 