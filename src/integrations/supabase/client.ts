// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aacfcqybwafzxedgwovb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhY2ZjcXlid2FmenhlZGd3b3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDA2MjIsImV4cCI6MjA2MDkxNjYyMn0.HCAkFSabId8-GNDd2eA4Z7dU-KDMunM-vC0Aue4CQrU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);