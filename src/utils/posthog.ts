export interface PostHogEventProps {
  event: string;
  properties: Record<string, any>;
  timestamp?: string;
}

export async function capturePostHogEvent({ event, properties, timestamp }: PostHogEventProps) {
  const res = await fetch('https://us.i.posthog.com/capture/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: 'phc_onb8OqZSxjNuB5qc0a6l9RBUJQBhT6nuL7GWVFMXLNg',
      event,
      properties,
      ...(timestamp ? { timestamp } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`PostHog API error: ${res.status}`);
  }
  return res.json();
} 