'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/lib/language-context';
import type { Language } from '@/lib/translations';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'products', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLang = languages.find((l) => l.code === language);

  const navLinks = [
    { href: '#home', label: t.nav.home, id: 'home' },
    { href: '#about', label: t.nav.about, id: 'about' },
    { href: '#products', label: t.nav.products, id: 'products' },
    { href: '#contact', label: t.nav.contact, id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/50'
          : 'bg-gradient-to-b from-black/30 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
            <div className="relative">
              <div className={`absolute inset-0 bg-primary/20 rounded-full blur-lg transition-opacity ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />
              <Image
                src="/images/logo.jpeg"
                alt="KORIANI TUNA FISHING SLU"
                width={50}
                height={50}
                className="rounded-full relative z-10 ring-2 ring-white/20 group-hover:ring-primary/50 transition-all"
              />
            </div>
            <div className="hidden sm:block">
              <p className={`font-bold text-lg tracking-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                KORIANI TUNA
              </p>
              <p className={`text-xs font-medium transition-colors ${isScrolled ? 'text-muted-foreground' : 'text-white/70'}`}>
                FISHING SLU
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 font-medium transition-all rounded-full ${
                  isScrolled 
                    ? activeSection === link.id 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                    : activeSection === link.id
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`gap-2 rounded-full transition-all ${
                    isScrolled 
                      ? 'text-foreground hover:bg-muted' 
                      : 'text-white hover:bg-white/10 border border-white/20'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{currentLang?.name}</span>
                  <span className="sm:hidden text-lg">{currentLang?.flag}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[150px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`gap-2 ${language === lang.code ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* CTA Button - Desktop */}
            <Button
              onClick={() => handleNavClick('#contact')}
              className={`hidden md:flex rounded-full px-6 transition-all ${
                isScrolled
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm'
              }`}
            >
              {t.nav.contact}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden rounded-full ${
                isScrolled 
                  ? 'text-foreground hover:bg-muted' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-1 bg-background/95 backdrop-blur-xl rounded-2xl my-2 border border-border/50 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block w-full text-left px-6 py-3 font-medium transition-colors rounded-lg mx-2 ${
                  activeSection === link.id
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-muted'
                }`}
                style={{ width: 'calc(100% - 16px)' }}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
