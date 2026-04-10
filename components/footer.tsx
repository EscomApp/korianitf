'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a1628] text-white overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/20 blur-[100px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-primary/30">
                <Image
                  src="/images/logo.jpeg"
                  alt="KORIANI TUNA FISHING SLU"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xl tracking-tight">KORIANI TUNA</p>
                <p className="text-sm text-white/60">FISHING SLU</p>
              </div>
            </div>
            <p className="text-white/70 max-w-md leading-relaxed mb-6">
              {t.about.description.substring(0, 200)}...
            </p>
            {/* Social icons placeholder */}
            <div className="flex gap-3">
              {['linkedin', 'twitter', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/50 rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">
              {t.nav.home.includes('Inicio') ? 'Enlaces Rápidos' : t.nav.home.includes('Accueil') ? 'Liens Rapides' : 'Quick Links'}
            </h4>
            <ul className="space-y-4">
              {[
                { href: '#home', label: t.nav.home },
                { href: '#about', label: t.nav.about },
                { href: '#products', label: t.nav.products },
                { href: '#contact', label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/70 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">{t.nav.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white/70">48370 Bermeo Bizkaia</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white/70">+34 671 79 09 67</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-white/70">site@korianitfish.es</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm text-center md:text-left">
            © {currentYear} {t.footer.company}. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/50 hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="ml-4 w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-lg flex items-center justify-center transition-colors border border-primary/30"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
