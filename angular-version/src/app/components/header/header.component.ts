import { Component, inject, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService, Language } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      [class]="isScrolled() ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl py-3' : 'bg-transparent py-5'">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:bg-cyan-400/30 transition-all duration-300"></div>
            <img 
              src="assets/images/logo.jpeg" 
              alt="KORIANI TUNA" 
              class="relative h-12 w-12 rounded-full object-cover border-2 border-cyan-400/50 shadow-lg"
            />
          </div>
          <div>
            <span class="text-xl font-bold text-white tracking-wide">KORIANI TUNA</span>
            <span class="block text-xs text-cyan-400 font-medium tracking-wider">FISHING SLU</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          @for (item of navItems; track item.href) {
            <a 
              [href]="item.href"
              class="text-white/80 hover:text-cyan-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wider">
              {{ t(item.label) }}
            </a>
          }
        </nav>

        <!-- Language Switcher & Mobile Menu -->
        <div class="flex items-center gap-4">
          <!-- Language Dropdown -->
          <div class="relative">
            <button 
              (click)="toggleLanguageMenu()"
              class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300">
              <span class="text-lg">{{ getCurrentLanguageFlag() }}</span>
              <span class="text-white text-sm font-medium hidden sm:inline">{{ getCurrentLanguageName() }}</span>
              <svg class="w-4 h-4 text-white/70 transition-transform duration-300" 
                   [class.rotate-180]="languageMenuOpen()"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            
            @if (languageMenuOpen()) {
              <div class="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 overflow-hidden animate-scale-in">
                @for (lang of translationService.languages; track lang.code) {
                  <button 
                    (click)="setLanguage(lang.code)"
                    class="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors duration-200"
                    [class.bg-cyan-500/20]="translationService.language() === lang.code">
                    <span class="text-xl">{{ lang.flag }}</span>
                    <span class="text-white font-medium">{{ lang.name }}</span>
                    @if (translationService.language() === lang.code) {
                      <svg class="w-4 h-4 text-cyan-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    }
                  </button>
                }
              </div>
            }
          </div>

          <!-- Mobile Menu Button -->
          <button 
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (mobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      @if (mobileMenuOpen()) {
        <nav class="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-4 animate-fade-in">
          <div class="container mx-auto px-4 py-4 flex flex-col gap-2">
            @for (item of navItems; track item.href) {
              <a 
                [href]="item.href"
                (click)="closeMobileMenu()"
                class="text-white/80 hover:text-cyan-400 hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300 font-medium">
                {{ t(item.label) }}
              </a>
            }
          </div>
        </nav>
      }
    </header>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent {
  translationService = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  isScrolled = signal(false);
  languageMenuOpen = signal(false);
  mobileMenuOpen = signal(false);

  navItems = [
    { href: '#home', label: 'nav.home' },
    { href: '#about', label: 'nav.about' },
    { href: '#products', label: 'nav.products' },
    { href: '#contact', label: 'nav.contact' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.languageMenuOpen.set(false);
    }
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  toggleLanguageMenu(): void {
    this.languageMenuOpen.update(v => !v);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  setLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
    this.languageMenuOpen.set(false);
  }

  getCurrentLanguageFlag(): string {
    return this.translationService.languages.find(l => l.code === this.translationService.language())?.flag || '';
  }

  getCurrentLanguageName(): string {
    return this.translationService.languages.find(l => l.code === this.translationService.language())?.name || '';
  }
}
