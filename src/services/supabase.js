import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';

const supabaseUrl = 'https://ycfcamxsouvagmrltkbj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZmNhbXhzb3V2YWdtcmx0a2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MDA2OTYsImV4cCI6MTk5OTQ3NjY5Nn0.955-LuGGG2VFCORoiLebK2u8Ns1B5J0RntKuBupGm7Y';

export const supabase = createClient(supabaseUrl, supabaseKey);