
import { createClient } from '@supabase/supabase-js';

/**
 * 🛠️ ABSOLUTE SOURCE OF TRUTH
 * 
 * Paste your Supabase details inside the quotes below. 
 * This is the ONLY place the app will look for credentials.
 * This ensures the site works for everyone, including incognito users.
 */
const SUPABASE_URL = "https://gussxwogchechkeixyfr.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_J-Fgi6K9Eo3E19A7cF6kVA_0gPJt9W4"; 

export const supabase = (SUPABASE_URL && SUPABASE_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

// Initialize database - no-op for client-side, handled by backend
export async function initializeDatabase(): Promise<void> {
  console.log('Database initialized with Supabase backend');
}

export const isSupabaseConnected = () => !!supabase;

// For backwards compatibility - export null for sql/utapi
export const sql = null;
export const utapi = null;
