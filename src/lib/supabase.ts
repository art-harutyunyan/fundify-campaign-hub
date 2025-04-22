
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
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

