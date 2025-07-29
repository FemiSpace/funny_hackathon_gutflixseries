import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Create a mock Supabase client for server-side rendering or when environment variables are missing
const createMockSupabaseClient = () => {
  return {
    from: () => ({
      select: () => ({
        order: () => ({
          limit: () => ({
            data: [],
            error: null,
          }),
        }),
      }),
    }),
  } as any;
};

// Create the Supabase client with proper error handling
let supabaseClient;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not set');
  }
  
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Don't persist session in server components
    },
  });
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  console.warn('Using mock Supabase client. Some features may not work as expected.');
  supabaseClient = createMockSupabaseClient();
}

export const supabase = supabaseClient;
