import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'fr' | 'en';

export interface Translations {
  [key: string]: {
    es: string;
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { es: 'Inicio', fr: 'Accueil', en: 'Home' },
  'nav.about': { es: 'Nosotros', fr: 'À propos', en: 'About' },
  'nav.products': { es: 'Productos', fr: 'Produits', en: 'Products' },
  'nav.contact': { es: 'Contacto', fr: 'Contact', en: 'Contact' },

  // Hero Section
  'hero.slide1.title': { es: 'Conectando Continentes a Través de los Alimentos', fr: 'Connecter les Continents par l\'Alimentation', en: 'Connecting Continents Through Food' },
  'hero.slide1.subtitle': { es: 'Su socio confiable en importación y exportación de productos alimenticios de alta calidad', fr: 'Votre partenaire fiable pour l\'import-export de produits alimentaires de haute qualité', en: 'Your trusted partner in import-export of high-quality food products' },
  'hero.slide2.title': { es: 'Productos Africanos Premium', fr: 'Produits Africains Premium', en: 'Premium African Products' },
  'hero.slide2.subtitle': { es: 'Especialistas en attieke y productos alimenticios africanos auténticos', fr: 'Spécialistes en attiéké et produits alimentaires africains authentiques', en: 'Specialists in attieke and authentic African food products' },
  'hero.slide3.title': { es: 'Comercio Internacional de Confianza', fr: 'Commerce International de Confiance', en: 'Trusted International Trade' },
  'hero.slide3.subtitle': { es: 'Más de 10 años de experiencia en el comercio global de alimentos', fr: 'Plus de 10 ans d\'expérience dans le commerce alimentaire mondial', en: 'Over 10 years of experience in global food trade' },
  'hero.cta.primary': { es: 'Descubrir Productos', fr: 'Découvrir les Produits', en: 'Discover Products' },
  'hero.cta.secondary': { es: 'Contactar', fr: 'Contacter', en: 'Contact Us' },

  // About Section
  'about.title': { es: 'Sobre Nosotros', fr: 'À Propos de Nous', en: 'About Us' },
  'about.subtitle': { es: 'Excelencia en comercio internacional de alimentos', fr: 'Excellence dans le commerce international alimentaire', en: 'Excellence in international food trade' },
  'about.description': { es: 'KORIANI TUNA FISHING SLU es una empresa especializada en la importación y exportación de productos alimenticios (vivriers). Con sede en España, nos dedicamos a conectar productores y mercados a nivel internacional, garantizando la más alta calidad en cada producto que comercializamos.', fr: 'KORIANI TUNA FISHING SLU est une entreprise spécialisée dans l\'importation et l\'exportation de produits alimentaires (vivriers). Basée en Espagne, nous nous consacrons à connecter les producteurs et les marchés au niveau international, garantissant la plus haute qualité de chaque produit que nous commercialisons.', en: 'KORIANI TUNA FISHING SLU is a company specialized in the import and export of food products (vivriers). Based in Spain, we are dedicated to connecting producers and markets internationally, guaranteeing the highest quality in every product we trade.' },
  'about.mission.title': { es: 'Nuestra Misión', fr: 'Notre Mission', en: 'Our Mission' },
  'about.mission.text': { es: 'Facilitar el acceso a productos alimenticios de calidad superior, creando puentes comerciales entre África y Europa.', fr: 'Faciliter l\'accès à des produits alimentaires de qualité supérieure, en créant des ponts commerciaux entre l\'Afrique et l\'Europe.', en: 'Facilitate access to superior quality food products, creating commercial bridges between Africa and Europe.' },
  'about.vision.title': { es: 'Nuestra Visión', fr: 'Notre Vision', en: 'Our Vision' },
  'about.vision.text': { es: 'Ser el referente en el comercio internacional de productos alimenticios africanos en el mercado europeo.', fr: 'Être la référence dans le commerce international de produits alimentaires africains sur le marché européen.', en: 'To be the reference in international trade of African food products in the European market.' },
  'about.values.title': { es: 'Nuestros Valores', fr: 'Nos Valeurs', en: 'Our Values' },
  'about.values.text': { es: 'Calidad, confianza, sostenibilidad y compromiso con nuestros socios comerciales.', fr: 'Qualité, confiance, durabilité et engagement envers nos partenaires commerciaux.', en: 'Quality, trust, sustainability, and commitment to our business partners.' },

  // Products Section
  'products.title': { es: 'Nuestros Productos', fr: 'Nos Produits', en: 'Our Products' },
  'products.subtitle': { es: 'Productos alimenticios de alta calidad para el mercado internacional', fr: 'Produits alimentaires de haute qualité pour le marché international', en: 'High-quality food products for the international market' },
  'products.featured': { es: 'Producto Destacado', fr: 'Produit Vedette', en: 'Featured Product' },
  'products.learnMore': { es: 'Ver Más', fr: 'En Savoir Plus', en: 'Learn More' },
  'products.close': { es: 'Cerrar', fr: 'Fermer', en: 'Close' },

  // Product Names
  'product.attieke.name': { es: 'Attieké', fr: 'Attiéké', en: 'Attieke' },
  'product.attieke.description': { es: 'Sémola de yuca fermentada, un alimento básico en África Occidental. Producto estrella de nuestra gama de importación.', fr: 'Semoule de manioc fermentée, un aliment de base en Afrique de l\'Ouest. Produit phare de notre gamme d\'importation.', en: 'Fermented cassava semolina, a staple food in West Africa. Star product of our import range.' },
  'product.attieke.details': { es: 'El attieké es un producto tradicional de Costa de Marfil, elaborado a partir de yuca fermentada y granulada. Es rico en carbohidratos y fibra, perfecto para acompañar carnes, pescados y verduras. Importamos directamente de productores certificados.', fr: 'L\'attiéké est un produit traditionnel de Côte d\'Ivoire, élaboré à partir de manioc fermenté et granulé. Il est riche en glucides et en fibres, parfait pour accompagner viandes, poissons et légumes. Nous importons directement de producteurs certifiés.', en: 'Attieke is a traditional product from Ivory Coast, made from fermented and granulated cassava. It is rich in carbohydrates and fiber, perfect for accompanying meats, fish, and vegetables. We import directly from certified producers.' },

  'product.plantain.name': { es: 'Plátano Macho', fr: 'Banane Plantain', en: 'Plantain' },
  'product.plantain.description': { es: 'Plátano para cocinar, esencial en la cocina africana y caribeña.', fr: 'Banane à cuire, essentielle dans la cuisine africaine et caribéenne.', en: 'Cooking banana, essential in African and Caribbean cuisine.' },
  'product.plantain.details': { es: 'El plátano macho es un ingrediente versátil utilizado en numerosos platos tradicionales. Se puede freír, asar, hervir o preparar como chips. Importamos variedades seleccionadas de alta calidad.', fr: 'La banane plantain est un ingrédient polyvalent utilisé dans de nombreux plats traditionnels. Elle peut être frite, grillée, bouillie ou préparée en chips. Nous importons des variétés sélectionnées de haute qualité.', en: 'Plantain is a versatile ingredient used in numerous traditional dishes. It can be fried, grilled, boiled, or prepared as chips. We import selected high-quality varieties.' },

  'product.cassava.name': { es: 'Yuca', fr: 'Manioc', en: 'Cassava' },
  'product.cassava.description': { es: 'Raíz nutritiva, base de muchos productos alimenticios africanos.', fr: 'Racine nutritive, base de nombreux produits alimentaires africains.', en: 'Nutritious root, base of many African food products.' },
  'product.cassava.details': { es: 'La yuca es una raíz tuberosa rica en almidón, fundamental en la alimentación de millones de personas. Comercializamos yuca fresca y procesada de la más alta calidad.', fr: 'Le manioc est une racine tubéreuse riche en amidon, fondamentale dans l\'alimentation de millions de personnes. Nous commercialisons du manioc frais et transformé de la plus haute qualité.', en: 'Cassava is a starchy tuberous root, fundamental in the diet of millions of people. We trade fresh and processed cassava of the highest quality.' },

  'product.palmOil.name': { es: 'Aceite de Palma', fr: 'Huile de Palme', en: 'Palm Oil' },
  'product.palmOil.description': { es: 'Aceite vegetal tradicional africano de producción sostenible.', fr: 'Huile végétale traditionnelle africaine de production durable.', en: 'Traditional African vegetable oil from sustainable production.' },
  'product.palmOil.details': { es: 'Aceite de palma roja de origen africano, producido de manera sostenible. Esencial en la cocina tradicional africana, rico en vitaminas A y E.', fr: 'Huile de palme rouge d\'origine africaine, produite de manière durable. Essentielle dans la cuisine traditionnelle africaine, riche en vitamines A et E.', en: 'Red palm oil of African origin, sustainably produced. Essential in traditional African cooking, rich in vitamins A and E.' },

  'product.spices.name': { es: 'Especias Africanas', fr: 'Épices Africaines', en: 'African Spices' },
  'product.spices.description': { es: 'Selección de especias auténticas para sabores únicos.', fr: 'Sélection d\'épices authentiques pour des saveurs uniques.', en: 'Selection of authentic spices for unique flavors.' },
  'product.spices.details': { es: 'Ofrecemos una variedad de especias africanas auténticas: pimiento de Guinea, jengibre, semillas de calabaza, y más. Todas seleccionadas cuidadosamente de productores locales.', fr: 'Nous offrons une variété d\'épices africaines authentiques: piment de Guinée, gingembre, graines de courge, et plus encore. Toutes soigneusement sélectionnées auprès de producteurs locaux.', en: 'We offer a variety of authentic African spices: Guinea pepper, ginger, pumpkin seeds, and more. All carefully selected from local producers.' },

  'product.dryFish.name': { es: 'Pescado Seco', fr: 'Poisson Séché', en: 'Dry Fish' },
  'product.dryFish.description': { es: 'Pescado deshidratado tradicional, rico en proteínas.', fr: 'Poisson déshydraté traditionnel, riche en protéines.', en: 'Traditional dehydrated fish, rich in protein.' },
  'product.dryFish.details': { es: 'Pescado seco y ahumado procesado según métodos tradicionales africanos. Alto contenido proteico, ideal para sopas y guisos tradicionales.', fr: 'Poisson séché et fumé traité selon les méthodes traditionnelles africaines. Haute teneur en protéines, idéal pour les soupes et ragoûts traditionnels.', en: 'Dried and smoked fish processed according to traditional African methods. High protein content, ideal for traditional soups and stews.' },

  // Contact Section
  'contact.title': { es: 'Contáctenos', fr: 'Contactez-nous', en: 'Contact Us' },
  'contact.subtitle': { es: 'Estamos aquí para atender sus consultas comerciales', fr: 'Nous sommes là pour répondre à vos demandes commerciales', en: 'We are here to handle your business inquiries' },
  'contact.form.name': { es: 'Nombre', fr: 'Nom', en: 'Name' },
  'contact.form.email': { es: 'Correo Electrónico', fr: 'Email', en: 'Email' },
  'contact.form.message': { es: 'Mensaje', fr: 'Message', en: 'Message' },
  'contact.form.submit': { es: 'Enviar Mensaje', fr: 'Envoyer le Message', en: 'Send Message' },
  'contact.form.sending': { es: 'Enviando...', fr: 'Envoi en cours...', en: 'Sending...' },
  'contact.form.success': { es: '¡Mensaje enviado con éxito!', fr: 'Message envoyé avec succès !', en: 'Message sent successfully!' },
  'contact.form.error': { es: 'Error al enviar el mensaje. Inténtelo de nuevo.', fr: 'Erreur lors de l\'envoi du message. Veuillez réessayer.', en: 'Error sending message. Please try again.' },
  'contact.info.title': { es: 'Información de Contacto', fr: 'Informations de Contact', en: 'Contact Information' },
  'contact.info.address': { es: 'Dirección', fr: 'Adresse', en: 'Address' },
  'contact.info.phone': { es: 'Teléfono', fr: 'Téléphone', en: 'Phone' },
  'contact.info.email': { es: 'Correo', fr: 'Email', en: 'Email' },
  'contact.info.hours': { es: 'Horario', fr: 'Horaires', en: 'Hours' },
  'contact.info.hoursValue': { es: 'Lun - Vie: 9:00 - 18:00', fr: 'Lun - Ven: 9:00 - 18:00', en: 'Mon - Fri: 9:00 AM - 6:00 PM' },

  // Footer
  'footer.description': { es: 'Empresa especializada en la importación y exportación de productos alimenticios de alta calidad.', fr: 'Entreprise spécialisée dans l\'importation et l\'exportation de produits alimentaires de haute qualité.', en: 'Company specialized in the import and export of high-quality food products.' },
  'footer.quickLinks': { es: 'Enlaces Rápidos', fr: 'Liens Rapides', en: 'Quick Links' },
  'footer.contact': { es: 'Contacto', fr: 'Contact', en: 'Contact' },
  'footer.rights': { es: 'Todos los derechos reservados.', fr: 'Tous droits réservés.', en: 'All rights reserved.' },

  // Validation
  'validation.required': { es: 'Este campo es obligatorio', fr: 'Ce champ est requis', en: 'This field is required' },
  'validation.email': { es: 'Introduzca un correo electrónico válido', fr: 'Veuillez entrer un email valide', en: 'Please enter a valid email' },
  'validation.minLength': { es: 'El mensaje debe tener al menos 10 caracteres', fr: 'Le message doit comporter au moins 10 caractères', en: 'Message must be at least 10 characters' },
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<Language>('es');
  
  readonly language = computed(() => this.currentLang());
  
  readonly languages: { code: Language; name: string; flag: string }[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  t(key: string): string {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[this.currentLang()] || key;
  }

  translate(key: string): string {
    return this.t(key);
  }
}
