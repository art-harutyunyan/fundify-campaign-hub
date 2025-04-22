
import { createClient } from '@supabase/supabase-js';

// Use the actual Supabase project details
const supabaseUrl = 'https://aacfcqybwafzxedgwovb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhY2ZjcXlid2FmenhlZGd3b3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDA2MjIsImV4cCI6MjA2MDkxNjYyMn0.HCAkFSabId8-GNDd2eA4Z7dU-KDMunM-vC0Aue4CQrU';

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
