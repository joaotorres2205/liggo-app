import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export function getSupabaseServer() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase server credentials: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
