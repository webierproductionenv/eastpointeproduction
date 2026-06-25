import React, { useState } from "react";
import { Mail, User, Mountain, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { WEB3FORMS_ACCESS_KEY } from "../lib/env";
import { useSanity } from "../hooks/useSanity";
import { SITE_SETTINGS_QUERY } from "../lib/queries";

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { data: siteSettings } = useSanity<any>(SITE_SETTINGS_QUERY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('error');
    }
  };

  return (
    <section className="bg-cream relative py-24 px-6 overflow-hidden flex items-center justify-center">
      {/* Decorative Background Elements */}
      <Mountain className="absolute -bottom-24 -left-24 w-[600px] h-[600px] text-earth/5 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Typography & Info */}
        <div className="flex flex-col animate-fade-in-up">
          <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm mb-4">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-primary leading-tight mb-8">
            Contact <br />
            <span className="italic text-secondary">Us</span>
          </h1>
          <p className="text-stone-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-10">
            Have questions about East Pointe? Reach out to us below and our team will get back to you shortly.
          </p>
          
          <div className="hidden lg:flex flex-col gap-6 border-l-2 border-accent/40 pl-8">
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Direct Contact</h4>
              <p className="text-stone-500 text-sm">{siteSettings?.email || "nick@eastpointekc.com"}</p>
            </div>
            <div>
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-1">Location</h4>
              <p className="text-stone-500 text-sm">{siteSettings?.siteName || "East Pointe Collections"}, {siteSettings?.address || "Kansas City"}</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-white p-8 md:p-12 shadow-2xl shadow-earth/5 relative animate-fade-in delay-200">
          {/* Decorative border */}
          <div className="absolute inset-0 border border-primary/10 m-2 pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
            <input type="hidden" name="subject" value="New Contact Request from East Pointe" />
            <input type="hidden" name="from_name" value="Eastpointe Resort" />
            
            <div className="grid grid-cols-1 gap-8">
              {/* Full Name */}
              <div className="relative group">
                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 absolute -top-5 left-0 group-focus-within:text-secondary transition-colors">
                  Full Name
                </label>
                <div className="flex items-center border-b border-stone-200 py-2 transition-colors group-focus-within:border-secondary">
                  <User className="text-stone-300 w-5 h-5 mr-3 group-focus-within:text-secondary transition-colors" />
                  <input type="text" id="name" name="name" required placeholder="John Doe" 
                    className="w-full bg-transparent text-primary font-medium focus:outline-none placeholder:text-stone-300 placeholder:font-light" />
                </div>
              </div>

              {/* Email Address */}
              <div className="relative group mt-4">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 absolute -top-5 left-0 group-focus-within:text-secondary transition-colors">
                  Email Address
                </label>
                <div className="flex items-center border-b border-stone-200 py-2 transition-colors group-focus-within:border-secondary">
                  <Mail className="text-stone-300 w-5 h-5 mr-3 group-focus-within:text-secondary transition-colors" />
                  <input type="email" id="email" name="email" required placeholder="john@example.com" 
                    className="w-full bg-transparent text-primary font-medium focus:outline-none placeholder:text-stone-300 placeholder:font-light" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="relative group mt-4">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 absolute -top-5 left-0 group-focus-within:text-secondary transition-colors">
                Message
              </label>
              <div className="border-b border-stone-200 py-2 transition-colors group-focus-within:border-secondary">
                <textarea id="message" name="message" required placeholder="How can we help you?" rows={3}
                  className="w-full bg-transparent text-primary font-medium focus:outline-none placeholder:text-stone-300 placeholder:font-light resize-none" />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="mt-6 w-full bg-primary text-cream py-4 font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {status === 'submitting' ? 'Sending Message...' : 'Send Message'} 
              {status !== 'submitting' && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 mt-2">
                <CheckCircle size={20} />
                <p className="text-sm font-medium">Thank you! Your message has been sent.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 mt-2">
                <AlertCircle size={20} />
                <p className="text-sm font-medium">Something went wrong. Please try again later.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
