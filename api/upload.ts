// Image upload endpoint - Supabase primary, UploadThing fallback
export const config = {
  runtime: 'edge',
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const useSupabase = formData.get('useSupabase') !== 'false'; // Default to Supabase
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return new Response(JSON.stringify({ error: 'Only image files allowed' }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Try Supabase first if configured and requested
    if (useSupabase && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `dhan-sukh/${fileName}`;

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Upload to Supabase Storage
        const uploadUrl = `${SUPABASE_URL}/storage/v1/object/property-images/${filePath}`;
        
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Content-Type': file.type,
            'x-upsert': 'false',
          },
          body: arrayBuffer,
        });

        if (uploadResponse.ok) {
          const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/property-images/${filePath}`;
          return new Response(JSON.stringify({ 
            url: publicUrl,
            name: file.name,
            size: file.size,
            path: filePath,
            source: 'supabase',
          }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
          });
        } else {
          const errorData = await uploadResponse.text();
          console.error('Supabase upload failed:', uploadResponse.status, errorData);
          // Fall through to base64
        }
      } catch (supabaseError: any) {
        console.error('Supabase error, falling back:', supabaseError);
        // Fall through to base64
      }
    }

    // Fallback: Base64 inline (for small images or when Supabase fails)
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const dataUrl = `data:${file.type};base64,${base64}`;

    return new Response(JSON.stringify({ 
      url: dataUrl,
      name: file.name,
      size: file.size,
      source: 'base64',
    }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
    
  } catch (error: any) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Upload failed',
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
