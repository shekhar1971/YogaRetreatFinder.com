// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Single, shared Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnon);
