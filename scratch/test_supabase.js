const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing connection to:', supabaseUrl);
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase Error:', error.message);
      if (error.code === '42P01') {
        console.error('Table "contact_submissions" does not exist!');
      } else if (error.code === 'PGRST301') {
        console.error('JWT expired or invalid anon key!');
      }
    } else {
      console.log('Connection successful! Data retrieved:', data);
    }
  } catch (err) {
    console.error('Unexpected Error:', err.message);
  }
}

testConnection();
