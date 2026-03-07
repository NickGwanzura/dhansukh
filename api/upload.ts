// Vercel serverless function for file uploads
export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: Request) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Get the file as a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Call UploadThing API
    const token = process.env.UPLOADTHING_TOKEN || "eyJhcGlLZXkiOiJza19saXZlXzVjOTRhZmYyM2MxMWEyNGQzYTljZDhiYjA5MWQ4MmZiZTI2OGNmM2MxODVkYTk3YTM3MTBiZDg0ZjY2OWE0OGYiLCJhcHBJZCI6IjQ1OWl5aml5eW0iLCJyZWdpb25zIjpbInNlYTEiXX0=";
    const appId = "459ijiym";

    // First, get upload URL
    const metadataResponse = await fetch('https://uploadthing.com/v6/multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: [{
          name: file.name,
          size: file.size,
          type: file.type,
        }],
        metadata: {
          appId,
        }
      }),
    });

    if (!metadataResponse.ok) {
      const errorText = await metadataResponse.text();
      return new Response(JSON.stringify({ error: `UploadThing error: ${errorText}` }), { status: metadataResponse.status, headers: { 'Content-Type': 'application/json' } });
    }

    const metadata = await metadataResponse.json();
    const { uploadUrl, fields, fileUrl } = metadata.data;

    // Upload the file to the presigned URL
    const uploadFormData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      uploadFormData.append(key, String(value));
    }
    uploadFormData.append('file', new Blob([buffer], { type: file.type }), file.name);

    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to upload file' }), { status: uploadResponse.status, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ url: fileUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Upload failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
