import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🚧 This feature isn't implemented yet",
      description: "You can request it in your next prompt! 🚀"
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const handleSocialClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet",
      description: "You can request it in your next prompt! 🚀"
    });
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', color: 'glow-pink' },
    { icon: Linkedin, label: 'LinkedIn', color: 'glow-yellow' },
    { icon: Twitter, label: 'Twitter', color: 'glow-green' },
    { icon: Mail, label: 'Email', color: 'glow-blue' }
  ];

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl header-text mb-4">Let's Connect</h2>
          <p className="text-white/70 font-light text-lg">Ready to bring your ideas to life?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glow-card glow-pink p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-light mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-light mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors text-white"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-light mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors resize-none text-white"
                  placeholder="Your message..."
                />
              </div>
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glow-card glow-blue p-8">
              <h3 className="text-2xl font-bold mb-4">Social Links</h3>
              <p className="text-white/70 font-light mb-6">
                Connect with me on social media
              </p>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <button
                      key={index}
                      onClick={handleSocialClick}
                      className={`glow-card ${social.color} p-4 flex flex-col items-center gap-2`}
                    >
                      <Icon size={24} />
                      <span className="text-sm font-light">{social.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="glow-card glow-green p-8">
              <h3 className="text-2xl font-bold mb-4">Let's Collaborate</h3>
              <p className="text-white/70 font-light">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;