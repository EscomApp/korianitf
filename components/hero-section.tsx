'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';

const slides = [
  {
    key: 'slide1',
    image: 'https://look.jmgbb.com/images/dwIEVHD_L4.jpg',
  },
  {
    key: 'slide2',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80',
  },
  {
    key: 'slide3',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1920&q=80',
  },
];

export function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getSlideContent = (key: string) => {
    const heroContent = t.hero as Record<string, { title: string; subtitle: string; cta: string }>;
    return heroContent[key] || { title: '', subtitle: '', cta: '' };
  };

  const handleScrollToProducts = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaActions = [handleScrollToProducts, handleScrollToAbout, handleScrollToContact];

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => {
        const content = getSlideContent(slide.key);
        return (
          <div
            key={slide.key}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
            }`}
          >
            {/* Background Image with Ken Burns effect */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                {/* Decorative line */}
                <div
                  className={`w-20 h-1 bg-primary mx-auto mb-8 transition-all duration-700 ${
                    index === currentSlide
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0'
                  }`}
                  style={{ transitionDelay: '50ms' }}
                />
                <h1
                  className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 text-balance tracking-tight ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '100ms', textShadow: '2px 4px 12px rgba(0,0,0,0.4)' }}
                >
                  {content.title}
                </h1>
                <p
                  className={`text-lg md:text-xl lg:text-2xl text-white/90 mb-10 max-w-3xl mx-auto transition-all duration-700 text-pretty font-light ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms', textShadow: '1px 2px 8px rgba(0,0,0,0.3)' }}
                >
                  {content.subtitle}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <Button
                    size="lg"
                    onClick={ctaActions[index]}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    {content.cta}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleScrollToContact}
                    className="border-2 border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white text-lg px-10 py-7 transition-all duration-300 hover:-translate-y-1"
                  >
                    {t.nav.contact}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 border border-white/10 hover:border-white/30 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 bg-white/5 hover:bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 border border-white/10 hover:border-white/30 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-primary w-12'
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={handleScrollToAbout}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group"
          aria-label="Scroll to content"
        >
          <span className="text-sm font-light tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 group-hover:border-white/60 transition-colors">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </section>
  );
}
