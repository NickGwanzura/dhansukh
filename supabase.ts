
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

// UploadThing helper for client-side uploads using the correct API
export const uploadFile = async (file: File): Promise<{ url: string; error: string | null }> => {
  if (!UPLOADTHING_CONFIG.token) {
    return { url: '', error: 'UploadThing not configured' };
  }
  
  try {
    // Use UploadThing's v6 API
    const response = await fetch('https://uploadthing.com/v6/multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPLOADTHING_CONFIG.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: [{
          name: file.name,
          size: file.size,
          type: file.type,
        }],
        metadata: {
          appId: UPLOADTHING_CONFIG.appId,
        }
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`UploadThing error: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Get the presigned URL for upload
    const { data: { uploadUrl, fields, fileUrl } } = data;
    
    // Upload the file to the presigned URL
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value as string);
    }
    formData.append('file', file);
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!uploadResponse.ok) {
      throw new Error('Failed to upload file');
    }
    
    return { url: fileUrl, error: null };
  } catch (error) {
    console.error('Upload error:', error);
    return { url: '', error: error instanceof Error ? error.message : 'Upload failed' };
  }
};
