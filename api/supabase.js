import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const isSupabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseEnabled) {
  console.warn(
    'Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY to enable chat persistence on Vercel.'
  );
}

const supabase = isSupabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export { supabase, isSupabaseEnabled };
