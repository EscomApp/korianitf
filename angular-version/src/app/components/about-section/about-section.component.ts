import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section id="about" class="relative py-24 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900"></div>
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16" appScrollAnimation animationType="fade-up">
          <span class="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium mb-4 border border-cyan-500/30">
            {{ t('about.title') }}
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            {{ t('about.subtitle') }}
          </h2>
        </div>

        <!-- Main Content -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <!-- Image Side -->
          <div class="relative" appScrollAnimation animationType="fade-right">
            <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur-2xl opacity-20"></div>
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1000&q=80"
                alt="Food trade warehouse"
                class="w-full h-80 lg:h-[500px] object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 right-6">
                <div class="flex items-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white">10+</div>
                  </div>
                  <div>
                    <p class="text-white font-semibold">Years of Experience</p>
                    <p class="text-white/70 text-sm">International Trade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Text Side -->
          <div class="space-y-6" appScrollAnimation animationType="fade-left">
            <p class="text-lg text-white/80 leading-relaxed">
              {{ t('about.description') }}
            </p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-4 pt-4">
              @for (stat of stats; track stat.value) {
                <div class="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div class="text-3xl font-bold text-cyan-400 mb-1">{{ stat.value }}</div>
                  <div class="text-white/70 text-sm">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>
        </div>

        <!-- Values Cards -->
        <div class="grid md:grid-cols-3 gap-6">
          @for (card of valueCards; track card.titleKey; let i = $index) {
            <div 
              class="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500"
              appScrollAnimation 
              animationType="fade-up"
              [animationDelay]="i * 100">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="card.icon"></svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">{{ t(card.titleKey) }}</h3>
              <p class="text-white/70 leading-relaxed">{{ t(card.textKey) }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutSectionComponent {
  private translationService = inject(TranslationService);

  stats = [
    { value: '50+', label: 'Partners Worldwide' },
    { value: '20+', label: 'Countries Served' },
    { value: '1000+', label: 'Tons Exported' },
    { value: '100%', label: 'Quality Certified' }
  ];

  valueCards = [
    {
      titleKey: 'about.mission.title',
      textKey: 'about.mission.text',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>'
    },
    {
      titleKey: 'about.vision.title',
      textKey: 'about.vision.text',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>'
    },
    {
      titleKey: 'about.values.title',
      textKey: 'about.values.text',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>'
    }
  ];

  t(key: string): string {
    return this.translationService.t(key);
  }
}
