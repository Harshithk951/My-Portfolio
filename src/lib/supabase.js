import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Validate Supabase configuration
 * Returns config object with valid flag and reason for debug
 */
function validateSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      valid: false,
      reason: 'Missing environment variables (VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY)'
    };
  }

  // Validate URL format
  if (typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('https://')) {
    return {
      valid: false,
      reason: 'Invalid Supabase URL format (must start with https://)'
    };
  }

  // Validate key format (should be a reasonably long string)
  if (typeof supabaseAnonKey !== 'string' || supabaseAnonKey.length < 20) {
    return {
      valid: false,
      reason: 'Invalid Supabase anonymous key format'
    };
  }

  return { valid: true, reason: null };
}

const config = validateSupabaseConfig();

// Only create client if config is valid; otherwise null
export const supabase = config.valid ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const submitContactForm = async (formData) => {
  try {
    // If Supabase not configured, use localStorage fallback
    if (!supabase || !config.valid) {
      const newSubmission = {
        id: crypto.randomUUID(),
        ...formData,
        created_at: new Date().toISOString(),
        status: 'new'
      };
      const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      localStorage.setItem('contact_submissions', JSON.stringify([...existingSubmissions, newSubmission]));
      return { success: true, data: newSubmission };
    }

    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: 'new'
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error submitting contact form:', error);
    }
    return { success: false, error: error?.message || 'Failed to submit form' };
  }
};
