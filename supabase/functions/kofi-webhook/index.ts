import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Ko-fi sends payer_email or email
  const email = body.email || body.payer_email;
  if (!email) {
    return new Response("Missing email", { status: 400 });
  }

  // Connect to Supabase
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Update the user's subscription_tier to 'pro'
  const { error } = await supabase
    .from("profiles")
    .update({ subscription_tier: "pro" })
    .eq("email", email);

  if (error) {
    return new Response("Failed to update user", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}); 