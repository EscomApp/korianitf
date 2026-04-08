'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, MapPin, Tag, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const productImages = {
  attieke: 'https://fr.apanews.net/wp-content/uploads/sites/2/2024/12/20241204_235338.jpg',
  plantain: 'https://images.unsplash.com/photo-1603052875302-d376b7c0638a?w=600&q=80',
  cassava: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80',
  spices: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80',
  palmOil: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
  driedFish: 'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=600&q=80',
};

type ProductKey = keyof typeof productImages;

interface Product {
  key: ProductKey;
  name: string;
  description: string;
  longDescription: string;
  origin: string;
  category: string;
}

export function ProductsSection() {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();

  const productKeys: ProductKey[] = ['attieke', 'plantain', 'cassava', 'spices', 'palmOil', 'driedFish'];

  const products: Product[] = productKeys.map((key) => {
    const productData = t.products.items[key];
    return {
      key,
      name: productData.name,
      description: productData.description,
      longDescription: productData.longDescription,
      origin: productData.origin,
      category: productData.category,
    };
  });

  return (
    <>
      <section
        id="products"
        ref={sectionRef}
        className="relative py-28 overflow-hidden"
      >
        {/* Dark background with image overlay */}
        <div className="absolute inset-0 bg-[#0a1628]">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
            alt="Background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0a1628]/95 to-[#0a1628]" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[128px] translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div
            className={`text-center mb-20 transition-all duration-700 ${
              sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4 tracking-wide border border-primary/30">
              {t.nav.products}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              {t.products.title}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </div>

          {/* Products Grid */}
          <div
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <div
                key={product.key}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer ${
                  gridVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProduct(product)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={productImages[product.key]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent" />
                  
                  {/* Featured Badge for Attieke */}
                  {product.key === 'attieke' && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      <Star className="h-4 w-4 fill-current" />
                      Featured
                    </div>
                  )}
                  
                  {/* View button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {t.products.viewDetails}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/20 px-3 py-1.5 rounded-full border border-primary/30">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-gradient-to-br from-[#0f1f35] to-[#0a1628] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative h-64 md:h-80">
              <Image
                src={productImages[selectedProduct.key]}
                alt={selectedProduct.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f35] via-[#0f1f35]/50 to-transparent" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-colors border border-white/20"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-sm font-medium text-primary bg-primary/20 px-4 py-2 rounded-full border border-primary/30">
                  {selectedProduct.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mt-4">
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <p className="text-white/80 leading-relaxed mb-8 text-lg">
                {selectedProduct.longDescription}
              </p>

              <div className="flex flex-wrap gap-6 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Origin</p>
                    <p className="text-white font-medium">{selectedProduct.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">Category</p>
                    <p className="text-white font-medium">{selectedProduct.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                  onClick={() => {
                    setSelectedProduct(null);
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t.nav.contact}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 py-6"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
