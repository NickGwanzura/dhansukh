
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase configuration - Replace with your actual Supabase credentials
// For demo mode without backend, use placeholder values
const SUPABASE_URL = "https://demo.supabase.co";
const SUPABASE_ANON_KEY = "demo-key";

// Check if we're using demo mode
const isDemoMode = SUPABASE_URL === "https://demo.supabase.co" || 
                   SUPABASE_URL === "https://your-project.supabase.co" ||
                   SUPABASE_URL === "";

// Create browser-compatible Supabase client (or null for demo mode)
let supabaseClient: SupabaseClient | null = null;

if (!isDemoMode) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.warn('Failed to initialize Supabase client:', e);
  }
}

// Export supabase - can be null in demo mode
export const supabase = supabaseClient;

// Initialize database - no-op for client-side, handled by backend
export async function initializeDatabase(): Promise<void> {
  if (isDemoMode) {
    console.log('Running in demo mode - using localStorage for data persistence');
  } else {
    console.log('Database initialized with Supabase backend');
  }
}

// Check Supabase connection status
export const isSupabaseConnected = async (): Promise<boolean> => {
  if (isDemoMode || !supabaseClient) {
    return false;
  }
  try {
    const { error } = await supabaseClient.from('settings').select('*').limit(1);
    return !error;
  } catch {
    return false;
  }
};

// For backwards compatibility - export null for sql/utapi
export const sql = null;
export const utapi = null;
