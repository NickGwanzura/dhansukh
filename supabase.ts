
/**
 * 🛠️ Configuration for Database
 * 
 * Using Neon PostgreSQL for data storage
 * Using UploadThing for image uploads
 * 
 * Environment Variables (set in Vercel):
 * - NEON_CONNECTION_STRING
 * - UPLOADTHING_TOKEN
 */

// Neon Database Configuration
export const NEON_CONFIG = {
  connectionString: process.env.NEON_CONNECTION_STRING || "postgresql://neondb_owner:npg_7uRDkK9LnHZs@ep-flat-art-ad96qbvu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
};

// UploadThing Configuration
export const UPLOADTHING_CONFIG = {
  token: process.env.UPLOADTHING_TOKEN || "eyJhcGlLZXkiOiJza19saXZlXzVjOTRhZmYyM2MxMWEyNGQzYTljZDhiYjA5MWQ4MmZiZTI2OGNmM2MxODVkYTk3YTM3MTBiZDg0ZjY2OWE0OGYiLCJhcHBJZCI6IjQ1OWl5aml5eW0iLCJyZWdpb25zIjpbInNlYTEiXX0=",
  appId: "459ijiym"
};

// Supabase is not used - using Neon + UploadThing instead
export const supabase: any = null;

// Initialize database
export async function initializeDatabase(): Promise<void> {
  console.log('Using Neon PostgreSQL for data storage');
  console.log('Using UploadThing for image uploads');
}

export const isSupabaseConnected = () => false;

// For backwards compatibility
export const sql = null;
export const utapi = null;

// UploadThing helper for client-side uploads using the local API route
export const uploadFile = async (file: File): Promise<{ url: string; error: string | null }> => {
  try {
    // Use local API route which proxies to UploadThing (avoids CORS)
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }
    
    const data = await response.json();
    return { url: data.url || '', error: null };
  } catch (error) {
    console.error('Upload error:', error);
    return { url: '', error: error instanceof Error ? error.message : 'Upload failed' };
  }
};
