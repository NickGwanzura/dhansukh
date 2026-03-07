
import { createClient } from '@supabase/supabase-js';

/**
 * 🛠️ Configuration for Database
 * 
 * Using Neon PostgreSQL with Supabase as the client-side wrapper
 * Update the SUPABASE_URL and SUPABASE_KEY with your credentials
 */
const SUPABASE_URL = "https://gussxwogchechkeixyfr.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_J-Fgi6K9Eo3E19A7cF6kVA_0gPJt9W4"; 

// Check if Supabase is configured
const isConfigured = SUPABASE_URL.includes('supabase.co') && SUPABASE_KEY.length > 10;

export const supabase = isConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_KEY) 
  : null;

// Initialize database - no-op for client-side, handled by backend
export async function initializeDatabase(): Promise<void> {
  if (isConfigured) {
    console.log('Database initialized with Supabase backend');
  } else {
    console.log('Running in demo mode - using localStorage for data persistence');
  }
}

export const isSupabaseConnected = () => !!supabase;

// For backwards compatibility - export null for sql/utapi
export const sql = null;
export const utapi = null;

/**
 * Neon Database Configuration (for server-side use)
 * This is the connection string for Neon PostgreSQL
 * Use this with a serverless function or API route
 */
export const NEON_CONFIG = {
  connectionString: "postgresql://neondb_owner:npg_7uRDkK9LnHZs@ep-flat-art-ad96qbvu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
};

/**
 * UploadThing Configuration
 * For client-side file uploads
 */
export const UPLOADTHING_CONFIG = {
  token: "eyJhcGlLZXkiOiJza19saXZlXzVjOTRhZmYyM2MxMWEyNGQzYTljZDhiYjA5MWQ4MmZiZTI2OGNmM2MxODVkYTk3YTM3MTBiZDg0ZjY2OWE0OGYiLCJhcHBJZCI6IjQ1OWl5aml5eW0iLCJyZWdpb25zIjpbInNlYTEiXX0=",
  appId: "459ijiym"
};

// UploadThing helper for client-side uploads
export const uploadFile = async (file: File): Promise<{ url: string; error: string | null }> => {
  try {
    // Using the UploadThing API endpoint
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', UPLOADTHING_CONFIG.token);
    formData.append('appId', UPLOADTHING_CONFIG.appId);
    
    const response = await fetch('https://uploadthing.com/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const data = await response.json();
    return { url: data.url || '', error: null };
  } catch (error) {
    return { url: '', error: error instanceof Error ? error.message : 'Upload failed' };
  }
};
