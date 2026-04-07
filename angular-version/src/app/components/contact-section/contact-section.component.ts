import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { ContactService } from '../../services/contact.service';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollAnimationDirective],
  template: `
    <section id="contact" class="relative py-24 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900"></div>
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16" appScrollAnimation animationType="fade-up">
          <span class="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium mb-4 border border-cyan-500/30">
            {{ t('contact.title') }}
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            {{ t('contact.subtitle') }}
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div 
            class="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8"
            appScrollAnimation 
            animationType="fade-right">
            <form (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-white font-medium mb-2">{{ t('contact.form.name') }} *</label>
                <input 
                  type="text"
                  [(ngModel)]="form.name"
                  name="name"
                  [placeholder]="t('contact.form.name')"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  [class.border-red-400]="errors().name"
                />
                @if (errors().name) {
                  <p class="mt-1 text-red-400 text-sm">{{ errors().name }}</p>
                }
              </div>

              <!-- Email -->
              <div>
                <label class="block text-white font-medium mb-2">{{ t('contact.form.email') }} *</label>
                <input 
                  type="email"
                  [(ngModel)]="form.email"
                  name="email"
                  [placeholder]="t('contact.form.email')"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                  [class.border-red-400]="errors().email"
                />
                @if (errors().email) {
                  <p class="mt-1 text-red-400 text-sm">{{ errors().email }}</p>
                }
              </div>

              <!-- Message -->
              <div>
                <label class="block text-white font-medium mb-2">{{ t('contact.form.message') }} *</label>
                <textarea 
                  [(ngModel)]="form.message"
                  name="message"
                  rows="5"
                  [placeholder]="t('contact.form.message')"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  [class.border-red-400]="errors().message">
                </textarea>
                @if (errors().message) {
                  <p class="mt-1 text-red-400 text-sm">{{ errors().message }}</p>
                }
              </div>

              <!-- Success/Error Messages -->
              @if (successMessage()) {
                <div class="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300">
                  {{ successMessage() }}
                </div>
              }
              @if (errorMessage()) {
                <div class="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
                  {{ errorMessage() }}
                </div>
              }

              <!-- Submit Button -->
              <button 
                type="submit"
                [disabled]="isSubmitting()"
                class="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                @if (isSubmitting()) {
                  <span class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    {{ t('contact.form.sending') }}
                  </span>
                } @else {
                  {{ t('contact.form.submit') }}
                }
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div 
            class="space-y-8"
            appScrollAnimation 
            animationType="fade-left">
            <div>
              <h3 class="text-2xl font-bold text-white mb-6">{{ t('contact.info.title') }}</h3>
              <p class="text-white/70 mb-8">
                {{ t('footer.description') }}
              </p>
            </div>

            <!-- Info Cards -->
            <div class="space-y-4">
              @for (info of contactInfo; track info.labelKey) {
                <div class="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors duration-300">
                  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="info.icon"></svg>
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ t(info.labelKey) }}</p>
                    <p class="text-white/70">{{ info.value }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
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
export class ContactSectionComponent {
  private translationService = inject(TranslationService);
  private contactService = inject(ContactService);

  form: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  errors = signal<FormErrors>({});
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  contactInfo = [
    {
      labelKey: 'contact.info.address',
      value: 'Madrid, España',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>'
    },
    {
      labelKey: 'contact.info.phone',
      value: '+34 XXX XXX XXX',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>'
    },
    {
      labelKey: 'contact.info.email',
      value: 'info&#64;korianituna.com',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>'
    },
    {
      labelKey: 'contact.info.hours',
      value: 'Lun - Vie: 9:00 - 18:00',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    }
  ];

  t(key: string): string {
    return this.translationService.t(key);
  }

  validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!this.form.name.trim()) {
      newErrors.name = this.t('validation.required');
    }

    if (!this.form.email.trim()) {
      newErrors.email = this.t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      newErrors.email = this.t('validation.email');
    }

    if (!this.form.message.trim()) {
      newErrors.message = this.t('validation.required');
    } else if (this.form.message.trim().length < 10) {
      newErrors.message = this.t('validation.minLength');
    }

    this.errors.set(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  onSubmit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (!this.validateForm()) return;

    this.isSubmitting.set(true);

    this.contactService.sendMessage(this.form).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response.success) {
          this.successMessage.set(this.t('contact.form.success'));
          this.form = { name: '', email: '', message: '' };
        } else {
          this.errorMessage.set(response.error || this.t('contact.form.error'));
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(this.t('contact.form.error'));
      }
    });
  }
}
