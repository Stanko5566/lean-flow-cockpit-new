
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://mgakecslbjamltjdllcs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nYWtlY3NsYmphbWx0amRsbGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTcyODQsImV4cCI6MjA2MTA3MzI4NH0.WZgD2VkzQreC4m1BoDlXKwb091L_rKIJaeX5gmqu_-8';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
