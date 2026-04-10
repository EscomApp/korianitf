import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';

interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  detailsKey: string;
  image: string;
  featured?: boolean;
}

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [CommonModule, ScrollAnimationDirective],
  template: `
    <section id="products" class="relative py-24 overflow-hidden">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-50 to-cyan-50"></div>
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-100/50 to-transparent"></div>

      <div class="container mx-auto px-4 relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-16" appScrollAnimation animationType="fade-up">
          <span class="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-4">
            {{ t('products.title') }}
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {{ t('products.subtitle') }}
          </h2>
        </div>

        <!-- Products Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of products; track product.id; let i = $index) {
            <div 
              class="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
              [class.md:col-span-2]="product.featured"
              [class.lg:col-span-1]="product.featured"
              appScrollAnimation 
              animationType="fade-up"
              [animationDelay]="i * 100">
              
              <!-- Featured Badge -->
              @if (product.featured) {
                <div class="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {{ t('products.featured') }}
                </div>
              }

              <!-- Image -->
              <div class="relative h-56 overflow-hidden">
                <img 
                  [src]="product.image" 
                  [alt]="t(product.nameKey)"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-600 transition-colors">
                  {{ t(product.nameKey) }}
                </h3>
                <p class="text-slate-600 mb-4 line-clamp-2">
                  {{ t(product.descriptionKey) }}
                </p>
                <button 
                  (click)="openModal(product)"
                  class="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors group/btn">
                  {{ t('products.learnMore') }}
                  <svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Modal -->
      @if (selectedProduct()) {
        <div 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          (click)="closeModal()">
          <div 
            class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in"
            (click)="$event.stopPropagation()">
            
            <!-- Modal Image -->
            <div class="relative h-64">
              <img 
                [src]="selectedProduct()!.image" 
                [alt]="t(selectedProduct()!.nameKey)"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <button 
                (click)="closeModal()"
                class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <div class="absolute bottom-4 left-6">
                <h3 class="text-2xl font-bold text-white">{{ t(selectedProduct()!.nameKey) }}</h3>
              </div>
            </div>

            <!-- Modal Content -->
            <div class="p-6">
              <p class="text-slate-600 leading-relaxed mb-6">
                {{ t(selectedProduct()!.detailsKey) }}
              </p>
              <div class="flex gap-4">
                <a 
                  href="#contact"
                  (click)="closeModal()"
                  class="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  {{ t('hero.cta.secondary') }}
                </a>
                <button 
                  (click)="closeModal()"
                  class="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                  {{ t('products.close') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    .animate-scale-in {
      animation: scaleIn 0.3s ease-out forwards;
    }
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductsSectionComponent {
  private translationService = inject(TranslationService);

  selectedProduct = signal<Product | null>(null);

  products: Product[] = [
    {
      id: 'attieke',
      nameKey: 'product.attieke.name',
      descriptionKey: 'product.attieke.description',
      detailsKey: 'product.attieke.details',
      image: 'https://fr.apanews.net/wp-content/uploads/sites/2/2024/12/20241204_235338.jpg',
      featured: true
    },
    {
      id: 'plantain',
      nameKey: 'product.plantain.name',
      descriptionKey: 'product.plantain.description',
      detailsKey: 'product.plantain.details',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Plantains.jpg'
    },
    {
      id: 'sweet-banana',
      nameKey: 'product.sweetBanana.name',
      descriptionKey: 'product.sweetBanana.description',
      detailsKey: 'product.sweetBanana.details',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'cassava',
      nameKey: 'product.cassava.name',
      descriptionKey: 'product.cassava.description',
      detailsKey: 'product.cassava.details',
      image: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'palm-oil',
      nameKey: 'product.palmOil.name',
      descriptionKey: 'product.palmOil.description',
      detailsKey: 'product.palmOil.details',
      image: 'https://marketplace.agrosfer.co/_next/image?url=https%3A%2F%2Fapi.agrosfer.co%2Fstorage%2Fmarkeplace%2Fproduct%2Fwhatsapp_image_2025_02_03_a_105316_45fb9cf5jpg_1738576581&w=2048&q=75'
    },
    {
      id: 'red-oil',
      nameKey: 'product.redOil.name',
      descriptionKey: 'product.redOil.description',
      detailsKey: 'product.redOil.details',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'spices',
      nameKey: 'product.spices.name',
      descriptionKey: 'product.spices.description',
      detailsKey: 'product.spices.details',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dry-fish',
      nameKey: 'product.dryFish.name',
      descriptionKey: 'product.dryFish.description',
      detailsKey: 'product.dryFish.details',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'
    }
  ];

  t(key: string): string {
    return this.translationService.t(key);
  }

  openModal(product: Product): void {
    this.selectedProduct.set(product);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedProduct.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
