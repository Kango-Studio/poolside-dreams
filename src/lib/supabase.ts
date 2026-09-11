import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"];
const supabaseAnonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.");
}

// This app never uses Realtime subscriptions, but supabase-js always
// constructs a RealtimeClient, which throws during SSR on Node < 22 (no
// native WebSocket global). A no-op transport avoids that without requiring
// a specific Node version or a WebSocket polyfill.
class NoopWebSocket {}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    transport: (typeof WebSocket !== "undefined" ? WebSocket : NoopWebSocket) as never,
  },
});
