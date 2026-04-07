import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProductsSectionComponent,
    ContactSectionComponent,
    FooterComponent
  ],
  template: `
    <app-header />
    <main>
      <app-hero-section />
      <app-about-section />
      <app-products-section />
      <app-contact-section />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {}
