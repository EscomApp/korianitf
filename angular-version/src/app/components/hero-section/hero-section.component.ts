import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Slide {
  image: string;
  titleKey: string;
  subtitleKey: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Slides -->
      @for (slide of slides; track slide.titleKey; let i = $index) {
        <div 
          class="absolute inset-0 transition-opacity duration-1000"
          [class.opacity-100]="currentSlide() === i"
          [class.opacity-0]="currentSlide() !== i">
          <img 
            [src]="slide.image" 
            [alt]="t(slide.titleKey)"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-teal-900/30"></div>
        </div>
      }

      <!-- Decorative Elements -->
      <div class="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>

      <!-- Content -->
      <div class="relative z-10 container mx-auto px-4 text-center">
        <div class="max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8 animate-fade-in-up">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            <span class="text-cyan-300 text-sm font-medium tracking-wide">Import & Export Food Products</span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style="animation-delay: 0.2s">
            {{ t(slides[currentSlide()].titleKey) }}
          </h1>

          <!-- Subtitle -->
          <p class="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.4s">
            {{ t(slides[currentSlide()].subtitleKey) }}
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 0.6s">
            <a 
              href="#products"
              class="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300">
              {{ t('hero.cta.primary') }}
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a 
              href="#contact"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              {{ t('hero.cta.secondary') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Slide Indicators -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        @for (slide of slides; track slide.titleKey; let i = $index) {
          <button 
            (click)="goToSlide(i)"
            class="group relative w-12 h-2 rounded-full overflow-hidden bg-white/20 hover:bg-white/30 transition-colors duration-300">
            <div 
              class="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full transition-all duration-300"
              [style.width]="currentSlide() === i ? '100%' : '0%'">
            </div>
          </button>
        }
      </div>

      <!-- Navigation Arrows -->
      <button 
        (click)="prevSlide()"
        class="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button 
        (click)="nextSlide()"
        class="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span class="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        <svg class="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  currentSlide = signal(0);

  slides: Slide[] = [
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
      titleKey: 'hero.slide1.title',
      subtitleKey: 'hero.slide1.subtitle'
    },
    {
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80',
      titleKey: 'hero.slide2.title',
      subtitleKey: 'hero.slide2.subtitle'
    },
    {
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80',
      titleKey: 'hero.slide3.title',
      subtitleKey: 'hero.slide3.subtitle'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentSlide.update(v => (v + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.update(v => (v - 1 + this.slides.length) % this.slides.length);
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
