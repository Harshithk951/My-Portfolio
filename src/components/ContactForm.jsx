import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Supabase Integration Fallback (LocalStorage)
      // Since Supabase isn't connected in this environment, we simulate the backend call
      // and store in localStorage for prototype demonstration.
      
      const newSubmission = {
        id: crypto.randomUUID(),
        ...formData,
        created_at: new Date().toISOString(),
        status: 'new'
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store in localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      localStorage.setItem('contact_submissions', JSON.stringify([...existingSubmissions, newSubmission]));

      toast({
        title: "Message Sent Successfully! 🚀",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-white/70">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/70">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-white/70">
          Phone <span className="text-white/30">(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-white/70">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white placeholder:text-white/20 resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Message <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;