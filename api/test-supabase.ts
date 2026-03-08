// Test Supabase connectivity
export const config = {
  runtime: 'edge',
};

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const isConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

  if (!isConfigured) {
    return new Response(JSON.stringify({
      connected: false,
      message: 'Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Test connection by fetching buckets
    const response = await fetch(`${SUPABASE_URL}/storage/v1/bucket`, {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({
        connected: false,
        configured: true,
        error: error,
        message: 'Supabase configured but connection failed.',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const buckets = await response.json();

    return new Response(JSON.stringify({
      connected: true,
      configured: true,
      buckets: buckets.map((b: any) => b.name),
      message: 'Supabase connected successfully',
      timestamp: new Date().toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({
      connected: false,
      configured: true,
      error: error.message,
      message: 'Supabase connection error',
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
