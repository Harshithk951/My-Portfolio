import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Contact form will use localStorage fallback.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export const submitContactForm = async (formData) => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Fallback to localStorage if Supabase is not configured
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

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          status: 'new'
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data: data?.[0] };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error?.message || 'Failed to submit form' };
  }
};
