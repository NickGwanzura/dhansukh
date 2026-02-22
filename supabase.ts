
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

export const isSupabaseConnected = () => !!supabase;
