import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Warn instead of throw to allow app to start even if config is missing (for debugging/health checks)
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('CRITICAL: Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars. Supabase calls will fail.');
}

// Service role client - ADMIN ACCESS (Use carefully)
// We cast to string to satisfy TS, but it will fail at runtime if empty, which is handled in controllers
export const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey || '', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper to create a client for a specific user token (RLS context)
export const createSupabaseUserClient = (jwt: string) => {
  return createClient(supabaseUrl, process.env.SUPABASE_JWT_SECRET || '', { // Using JWT secret or anon key if preferred, but usually we just forward the token
    global: {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }
  });
};
