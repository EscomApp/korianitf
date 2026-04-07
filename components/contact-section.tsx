'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!formState.name || formState.name.length < 2) {
      setError('Please enter your name (at least 2 characters).');
      return;
    }

    if (!validateEmail(formState.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formState.message || formState.message.length < 10) {
      setError('Please enter a message (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null);
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t.contact.info.address,
      value: 'Madrid, España',
    },
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: '+34 XXX XXX XXX',
    },
    {
      icon: Mail,
      label: t.contact.info.email,
      value: 'info@korianituna.com',
    },
    {
      icon: Clock,
      label: t.contact.info.hours,
      value: t.contact.info.hoursValue,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 tracking-wide">
            {t.nav.contact}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div
          ref={formRef}
          className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto"
        >
          {/* Contact Form - Takes 3 columns */}
          <div
            className={`lg:col-span-3 bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-10 transition-all duration-700 ${
              formVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {t.contact.form.success}
                </h3>
                <p className="text-muted-foreground">
                  {t.contact.subtitle.includes('responderemos') 
                    ? 'Le responderemos lo antes posible.'
                    : t.contact.subtitle.includes('répondrons')
                    ? 'Nous vous répondrons dans les plus brefs délais.'
                    : 'We will get back to you as soon as possible.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contact.form.name} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contact.form.email} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="+34 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t.contact.form.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                      placeholder="Product Inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t.contact.form.message} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className="w-full px-5 py-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    placeholder={t.contact.subtitle.includes('responderemos') 
                      ? 'Escriba su mensaje aquí...'
                      : t.contact.subtitle.includes('répondrons')
                      ? 'Écrivez votre message ici...'
                      : 'Write your message here...'}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-6 text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      {t.contact.form.submit}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info - Takes 2 columns */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${
              formVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            {/* Info Card with gradient background */}
            <div className="relative overflow-hidden rounded-3xl h-full">
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80"
                  alt="Contact Background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-[#0a4a5c]/95" />
              </div>
              
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-8">{t.contact.subtitle}</h3>
                
                <div className="space-y-6 flex-grow">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-white/70 mb-1">{item.label}</p>
                        <p className="font-medium text-white">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Decorative element */}
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t.contact.subtitle.includes('responderemos') 
                      ? 'Estamos comprometidos a responder todas las consultas dentro de las 24 horas hábiles.'
                      : t.contact.subtitle.includes('répondrons')
                      ? 'Nous nous engageons à répondre à toutes les demandes dans les 24 heures ouvrables.'
                      : 'We are committed to responding to all inquiries within 24 business hours.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
