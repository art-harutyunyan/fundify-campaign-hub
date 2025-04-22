
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment
let supabaseUrl: string;
let supabaseAnonKey: string;

// Check if we're running in development or production
if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
  // Use environment variables if available
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
} else {
  // Fallback for development/testing
  console.warn('Supabase environment variables not found, using dummy values for development');
  // These are placeholder values - the app won't actually connect to Supabase with these
  supabaseUrl = 'https://example.supabase.co';
  supabaseAnonKey = 'dummy-anon-key';
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type UserCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = UserCredentials & {
  fullName?: string;
};
