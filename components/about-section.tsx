'use client';

import Image from 'next/image';
import { Target, Eye, Heart, Globe, Ship, Award } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function AboutSection() {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();

  const values = [
    {
      icon: Target,
      title: t.about.mission.title,
      text: t.about.mission.text,
    },
    {
      icon: Eye,
      title: t.about.vision.title,
      text: t.about.vision.text,
    },
    {
      icon: Heart,
      title: t.about.values.title,
      text: t.about.values.text,
    },
  ];

  const stats = [
    { icon: Globe, value: '15+', label: 'Countries' },
    { icon: Ship, value: '500+', label: 'Shipments/Year' },
    { icon: Award, value: '10+', label: 'Years Experience' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
    >
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 tracking-wide">
            {t.nav.about}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image Stack */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              sectionVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            {/* Main Image */}
            <div className="relative h-[450px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                alt="Import Export Operations"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-transparent" />
            </div>
            
            {/* Floating secondary image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-background hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80"
                alt="Food Products"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Stats Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-2xl shadow-2xl shadow-primary/30 hidden lg:block">
              <p className="text-5xl font-bold">10+</p>
              <p className="text-sm opacity-90">
                {t.about.subtitle.includes('confiance') || t.about.subtitle.includes('trust')
                  ? 'Years of Excellence'
                  : 'Años de Excelencia'}
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              sectionVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.about.description}
            </p>
            
            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {values.slice(0, 2).map((item, index) => (
                <div key={index} className="flex gap-5 items-start group">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8"
        >
          {values.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-card p-8 rounded-3xl border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden ${
                cardsVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              
              <div className="relative z-10">
                <div className="p-4 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl w-fit mb-6 group-hover:from-primary/25 group-hover:to-primary/10 transition-colors">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
