
/**
 * 🛠️ Configuration for Database & Storage
 * 
 * Storage Options:
 * - Supabase Storage (1GB free, recommended)
 * - Imgur (unlimited, anonymous)
 * - Base64 (browser storage, limited)
 * 
 * Environment Variables:
 * - SUPABASE_URL
 * - SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

// Create Supabase client only if credentials are available
export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const isSupabaseConnected = () => !!supabase;

// Neon Database Configuration (legacy)
export const NEON_CONFIG = {
  connectionString: process.env.NEON_CONNECTION_STRING || ""
};

// Initialize database
export async function initializeDatabase(): Promise<void> {
  if (supabase) {
    console.log('Supabase connected successfully');
  } else {
    console.log('Supabase not configured - using local storage');
  }
}

// Upload helper - tries Supabase first, falls back to Imgur/base64
export const uploadFile = async (
  file: File, 
  options?: { 
    useSupabase?: boolean;
    useImgur?: boolean;
    bucket?: string;
  }
): Promise<{ 
  url: string; 
  error: string | null;
  source?: string;
}> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', options?.bucket || 'property-images');
    
    // Determine which storage to use
    let endpoint = '/api/upload';
    if (options?.useSupabase && supabase) {
      endpoint = '/api/upload-supabase';
    } else if (options?.useImgur) {
      formData.append('useImgur', 'true');
    }
    
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }
    
    const data = await response.json();
    return { 
      url: data.url || '', 
      error: null,
      source: data.source || 'unknown',
    };
  } catch (error) {
    console.error('Upload error:', error);
    return { 
      url: '', 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
};

// Upload directly to Supabase (client-side)
export const uploadToSupabase = async (
  file: File,
  bucket: string = 'property-images',
  path: string = ''
): Promise<{ url: string | null; error: string | null }> => {
  if (!supabase) {
    return { url: null, error: 'Supabase not configured' };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Upload file
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Supabase upload error:', error);
    return { 
      url: null, 
      error: error instanceof Error ? error.message : 'Upload failed' 
    };
  }
};
