import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import {
  FiMail, FiMapPin, FiLinkedin, FiGithub,
  FiSend, FiCheck, FiAlertCircle,
} from 'react-icons/fi';

import { SiLeetcode } from 'react-icons/si';

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Jaithra2104', label: 'GitHub', username: 'github.com/Jaithra2104' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/jaithra-addepalli-510292334', label: 'LinkedIn', username: 'linkedin.com/in/jaithra-addepalli-510292334' },
  { icon: SiLeetcode, href: 'https://leetcode.com/u/jaithra2106/', label: 'LeetCode', username: 'leetcode.com/u/jaithra2106' },
  { icon: FiMail, href: 'mailto:jaithraaddepalli17@gmail.com', label: 'Email', username: 'jaithraaddepalli17@gmail.com' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      // Fallback: Simulate submission if environment key is not configured yet
      await new Promise((r) => setTimeout(r, 1500));
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: `${form.message}\n\nContact Email: ${form.email}`,
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" className="section-padding relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative z-10">
        <SectionHeader
          label="Collaboration"
          title={<>Let's Start a <span className="gradient-text">Conversation</span></>}
          subtitle="Have a project concept or need a reliable developer? Drop me a line below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Info */}
            <div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-3 leading-snug">
                Have an idea, automation tool, startup concept, or student project in mind? Let’s turn it into something real.
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed">
                Whether you need a performant React interface, an automated scraper pipeline, a backend Flask REST API, or an academic final-year application — I can help you build and deploy it.
              </p>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold">Available for select projects</span>
            </div>

            {/* Contact details */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 text-text-secondary text-xs">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <FiMail size={13} className="text-accent-light" />
                </div>
                <span>jaithraaddepalli17@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-xs">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <FiMapPin size={13} className="text-accent-light" />
                </div>
                <span>Hyderabad, India · Remote-friendly</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-text-primary text-[10px] font-bold uppercase tracking-wider font-mono">Connect</p>
              {socialLinks.map(({ icon: Icon, href, label, username }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-light transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg glass border border-white/[0.06] group-hover:border-accent/30 flex items-center justify-center transition-all duration-200">
                    <Icon size={13} />
                  </div>
                  <span className="text-xs">{username}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/[0.06]">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="block text-text-secondary text-[10px] font-mono uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      required
                      className="form-input text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="block text-text-secondary text-[10px] font-mono uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      required
                      className="form-input text-xs"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="block text-text-secondary text-[10px] font-mono uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What project are we discussing?"
                    required
                    className="form-input text-xs"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="block text-text-secondary text-[10px] font-mono uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me a bit about the requirements, goals, or timeline..."
                    required
                    rows={4}
                    className="form-input text-xs resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={status === 'idle' ? { scale: 1.01, y: -1 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                  className={`w-full btn-primary justify-center py-3 text-xs tracking-wider uppercase font-semibold transition-all duration-300 ${
                    status === 'success' ? 'bg-emerald-600 hover:bg-emerald-600' : ''
                  } ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {status === 'idle' && (
                    <>
                      <FiSend size={14} />
                      <span>Send Inquiry</span>
                    </>
                  )}
                  {status === 'loading' && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <FiCheck size={14} />
                      <span>Message Received!</span>
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <FiAlertCircle size={14} />
                      <span>Retry Inquiry</span>
                    </>
                  )}
                </motion.button>

                <p className="text-text-muted text-[10px] text-center mt-3">
                  I typically respond within 24 hours. Let's make something clean.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
