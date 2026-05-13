import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { submitContactForm } from '@/lib/supabase';
import { sendAnalyticsEvent } from '@/lib/analytics';
import confetti from 'canvas-confetti';

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
    
    // Prevent double-submit
    if (isSubmitting) return;
    
    // Trim whitespace from all inputs
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim()
    };
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@([^\s@.]+\.)+[^\s@.]+$/;
    
    // Basic validation - check all required fields are filled
    if (!trimmedData.name || !trimmedData.email || !trimmedData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Message).",
        variant: "destructive"
      });
      return;
    }
    
    // Validate minimum name length
    if (trimmedData.name.length < 2) {
      toast({
        title: "Invalid Name",
        description: "Name must be at least 2 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    // Email format validation
    if (!emailRegex.test(trimmedData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address (e.g., user@example.com).",
        variant: "destructive"
      });
      return;
    }
    
    // Validate minimum message length
    if (trimmedData.message.length < 10) {
      toast({
        title: "Message Too Short",
        description: "Please provide a message with at least 10 characters.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    sendAnalyticsEvent('contact_click');

    // Show immediate loading toast
    const { dismiss } = toast({
      title: "Sending Message...",
      description: "Please wait while we secure your connection.",
    });

    try {
      // Submit to Supabase
      const result = await submitContactForm(trimmedData);

      if (result.success) {
        // Dismiss loading toast
        dismiss();

        // Trigger celebration confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#3b82f6', '#60a5fa']
        });

        toast({
          title: "Message Sent Successfully! 🚀",
          description: "Thank you for reaching out. I've received your message and will get back to you shortly.",
          className: "bg-green-600 border-green-400 text-white font-bold",
          duration: 6000,
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
      
    } catch (error) {
      console.error('Contact form submission error:', error);
      dismiss(); // Dismiss loading toast on error
      // Provide specific error messages based on error type
      let errorMessage = 'Something went wrong. Please try again later.';
      
      if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message.includes('rate')) {
        errorMessage = 'Too many requests. Please wait a moment before trying again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Submission Error",
        description: errorMessage,
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
            inputMode="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
            placeholder="john@example.com"
            autoComplete="email"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-white/70">
          Phone <span className="text-white/70">(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          inputMode="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          placeholder="+91 (98765) 43210"
          autoComplete="tel"
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
        className="w-full min-h-[44px] py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99]"
        aria-busy={isSubmitting}
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