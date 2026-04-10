import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="relative bg-slate-950 text-white overflow-hidden">
      <!-- Decorative Top Border -->
      <div class="h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500"></div>

      <div class="container mx-auto px-4 py-16">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Brand -->
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img 
                src="assets/images/logo.jpeg" 
                alt="KORIANI TUNA" 
                class="h-14 w-14 rounded-full object-cover border-2 border-cyan-400/50"
              />
              <div>
                <span class="text-2xl font-bold tracking-wide">KORIANI TUNA</span>
                <span class="block text-sm text-cyan-400 font-medium">FISHING SLU</span>
              </div>
            </div>
            <p class="text-white/60 max-w-md leading-relaxed mb-6">
              {{ t('footer.description') }}
            </p>
            <!-- Social Links -->
            <div class="flex gap-4">
              @for (social of socialLinks; track social.name) {
                <a 
                  [href]="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors duration-300"
                  [attr.aria-label]="social.name">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" [innerHTML]="social.icon"></svg>
                </a>
              }
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-bold mb-6 text-white">{{ t('footer.quickLinks') }}</h4>
            <ul class="space-y-3">
              @for (link of quickLinks; track link.href) {
                <li>
                  <a 
                    [href]="link.href"
                    class="text-white/60 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                    {{ t(link.labelKey) }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-lg font-bold mb-6 text-white">{{ t('footer.contact') }}</h4>
            <ul class="space-y-4">
              <li class="flex items-start gap-3 text-white/60">
                <svg class="w-5 h-5 mt-0.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>48370 Bermeo Bizkaia</span>
              </li>
              <li class="flex items-start gap-3 text-white/60">
                <svg class="w-5 h-5 mt-0.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>info&#64;korianituna.com</span>
              </li>
              <li class="flex items-start gap-3 text-white/60">
                <svg class="w-5 h-5 mt-0.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+34 671 79 09 67</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-white/10">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-white/50 text-sm">
              &copy; {{ currentYear }} KORIANI TUNA FISHING SLU. {{ t('footer.rights') }}
            </p>
            <div class="flex items-center gap-6">
              <a href="#" class="text-white/50 text-sm hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" class="text-white/50 text-sm hover:text-cyan-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FooterComponent {
  private translationService = inject(TranslationService);

  currentYear = new Date().getFullYear();

  quickLinks = [
    { href: '#home', labelKey: 'nav.home' },
    { href: '#about', labelKey: 'nav.about' },
    { href: '#products', labelKey: 'nav.products' },
    { href: '#contact', labelKey: 'nav.contact' }
  ];

  socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>'
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>'
    },
    {
      name: 'Instagram',
      href: '#',
      icon: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'
    }
  ];

  t(key: string): string {
    return this.translationService.t(key);
  }
}
