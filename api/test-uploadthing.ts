// Test UploadThing configuration
export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN || '';

  // Simple config check without making API calls
  const hasToken = !!UPLOADTHING_TOKEN && UPLOADTHING_TOKEN.startsWith('sk_live_');
  
  return new Response(JSON.stringify({
    status: hasToken ? 'configured' : 'not_configured',
    hasToken: hasToken,
    tokenPrefix: hasToken ? UPLOADTHING_TOKEN.substring(0, 20) + '...' : 'none',
    message: hasToken 
      ? 'UploadThing token is configured. Uploads should work.' 
      : 'UploadThing token not configured.',
    timestamp: new Date().toISOString(),
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
