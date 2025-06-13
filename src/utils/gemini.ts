const GEMINI_API_KEY = "AIzaSyAOharVW1JmQmr4Mhivtum-zBjYEoDcR_M";

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

export async function getGeminiMealDifficulty(meal: string, instructions: string, time?: number): Promise<{difficulty: string, time: number}> {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;
  let prompt = `Given the following meal: ${meal}.`;
  if (instructions) prompt += ` Instructions: ${instructions}.`;
  if (time) prompt += ` Estimated time: ${time} minutes.`;
  prompt += `\nClassify the meal's cooking difficulty as one of: Easy, Medium, Time-Consuming. Also estimate the cooking time in minutes if not provided. Reply with valid JSON: {\"difficulty\":\"Easy|Medium|Time-Consuming\",\"time\":number}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const match = text.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  throw new Error('Gemini did not return valid difficulty JSON.');
}

export async function getGeminiGroceryListFromMealPlanDayWise(mealPlan: object): Promise<any> {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;
  const planString = JSON.stringify(mealPlan);
  const prompt = `Given this meal plan JSON: ${planString}\nGenerate a grocery list grouped by day, and within each day, group by category (Produce, Grains & Starches, Protein, Condiments & Oils, etc). Reply with only valid JSON, no explanation, no markdown, no code block, no comments. Format: { \"Monday\": { \"Produce\": [\"Spinach\"], ... }, ... }`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const match = text.match(/\{[\s\S]*\}/);
  if (match) return JSON.parse(match[0]);
  throw new Error('Gemini did not return a valid grocery list.');
}

export async function getGeminiRecipeStepsAndTime(recipeName: string): Promise<{steps: string[], cookingTime: number}> {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;
  const prompt = `For the recipe '${recipeName}', provide a step-by-step cooking guide as a numbered list, and estimate the total cooking time in minutes. Reply with valid JSON: {\"steps\":[\"step 1\",...],\"cookingTime\":number}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  console.log('Gemini raw response:', text); // LOG RAW RESPONSE
  // Try to extract JSON block
  let match = text.match(/\{[\s\S]*\}/);
  if (!match) {
    // Try to remove markdown/code block wrappers
    const cleaned = text.replace(/```json|```/g, '').trim();
    match = cleaned.match(/\{[\s\S]*\}/);
  }
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      throw new Error('Gemini returned invalid JSON: ' + match[0]);
    }
  }
  throw new Error('Gemini did not return valid steps JSON. Raw response: ' + text);
} 