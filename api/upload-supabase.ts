// Supabase Storage upload endpoint
export const config = {
  runtime: 'edge',
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Check if Supabase is configured
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return new Response(JSON.stringify({ 
      error: 'Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.' 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const bucket = (formData.get('bucket') as string) || 'property-images';
    
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

    // Validate file size (50MB limit for Supabase free tier)
    if (file.size > 50 * 1024 * 1024) {
      return new Response(JSON.stringify({ 
        error: 'File too large. Max 50MB for Supabase uploads.' 
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `dhan-sukh/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Upload to Supabase Storage using REST API
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`;
    
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': file.type,
        'x-upsert': 'false',
      },
      body: arrayBuffer,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.text();
      console.error('Supabase upload error:', uploadResponse.status, errorData);
      
      // If bucket doesn't exist, try to create it
      if (uploadResponse.status === 400 || uploadResponse.status === 404) {
        return new Response(JSON.stringify({ 
          error: 'Storage bucket not found. Please create "property-images" bucket in Supabase dashboard.',
          details: errorData,
        }), { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
      
      throw new Error(`Supabase upload failed: ${uploadResponse.status}`);
    }

    const uploadData = await uploadResponse.json();
    console.log('Supabase upload success:', uploadData);

    // Get the public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;

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
