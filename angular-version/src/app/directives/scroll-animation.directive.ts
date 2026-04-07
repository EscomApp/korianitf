import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit, OnDestroy {
  @Input() animationType: 'fade' | 'fade-up' | 'fade-left' | 'fade-right' | 'scale' = 'fade-up';
  @Input() animationDelay = 0;
  @Input() animationThreshold = 0.1;

  private observer: IntersectionObserver | null = null;
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    
    // Set initial styles
    element.style.opacity = '0';
    element.style.transition = `all 0.6s ease-out ${this.animationDelay}ms`;
    
    switch (this.animationType) {
      case 'fade-up':
        element.style.transform = 'translateY(30px)';
        break;
      case 'fade-left':
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fade-right':
        element.style.transform = 'translateX(30px)';
        break;
      case 'scale':
        element.style.transform = 'scale(0.95)';
        break;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0) scale(1)';
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: this.animationThreshold }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
