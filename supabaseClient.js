// Supabase client + anonymous session bootstrap
// IMPORTANT: Use your project's URL + anon/public key (safe to expose).
// Never put the service_role key in browser code.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = window.__SUPABASE_URL__ || "https://qviunpkjoovyqxtessqd.supabase.co";
export const SUPABASE_ANON_KEY = window.__SUPABASE_ANON_KEY__ || "sb_publishable_MGvnTH4TPQLAywZk_zReBA_tjoIeQAi";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export async function ensureAnonSession() {
  // If you later add email/password or magic link, replace this.
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (session) return session;

  const { data, error: signErr } = await supabase.auth.signInAnonymously();
  if (signErr) throw signErr;
  return data.session;
}

export async function currentUserId() {
  const session = await ensureAnonSession();
  return session?.user?.id;
}
