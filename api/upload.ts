// Image upload endpoint - Imgur primary, base64 fallback
export const config = {
  runtime: 'edge',
};

// Imgur Client ID for anonymous uploads
const IMGUR_CLIENT_ID = '546c25a59c58ad7';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const useImgur = formData.get('useImgur') !== 'false'; // Default to Imgur
    
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

    const sizeInKB = Math.round(file.size / 1024);

    // Use Imgur for larger files or when explicitly requested
    if (useImgur || file.size > 500 * 1024) {
      try {
        // Convert file to base64 for Imgur
        const arrayBuffer = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        
        // Upload to Imgur
        const imgurResponse = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64,
            type: 'base64',
            title: file.name,
          }),
        });

        if (!imgurResponse.ok) {
          const errorData = await imgurResponse.text();
          console.error('Imgur error:', imgurResponse.status, errorData);
          throw new Error(`Imgur upload failed: ${imgurResponse.status}`);
        }

        const imgurData = await imgurResponse.json();
        
        if (imgurData.success && imgurData.data?.link) {
          return new Response(JSON.stringify({ 
            url: imgurData.data.link,
            deleteHash: imgurData.data.deletehash,
            name: file.name,
            size: file.size,
            source: 'imgur',
          }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
          });
        } else {
          throw new Error('Imgur response invalid');
        }
      } catch (imgurError: any) {
        console.error('Imgur upload failed, falling back to base64:', imgurError);
        // Fall through to base64
      }
    }

    // Fallback: Base64 inline (for small images)
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
