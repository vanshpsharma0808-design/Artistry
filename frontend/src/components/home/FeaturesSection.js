import React from 'react';
import { Sparkles, Users, Shield, Heart } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const FeaturesSection = () => {
  const features = [
    { icon: <Sparkles size={32} />, title: 'Expert Stylists', description: 'Trained professionals with years of experience' },
    { icon: <Shield size={32} />, title: 'Premium Products', description: 'Only the finest brands for your care' },
    { icon: <Heart size={32} />, title: 'Hygienic & Clean', description: 'Sanitized equipment and spotless environment' },
    { icon: <Users size={32} />, title: 'Family Friendly', description: 'Services for everyone in your family' },
  ];

  return (
    <section className="py-20 md:py-32 bg-salon-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-text-dark text-center mb-16" data-testid="home-why-us-title">
            Why Choose Us
          </h2>
        </AnimatedSection>
        
        <AnimatedSection 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          stagger={true}
          staggerDelay={100}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-salon-rose-gold/30 p-6 sm:p-8 rounded-sm hover:border-salon-gold hover:shadow-lg transition-all duration-300 hover-lift"
              data-testid={`home-feature-${idx}`}
            >
              <div className="text-salon-gold mb-4">{feature.icon}</div>
              <h3 className="font-serif text-xl sm:text-2xl text-salon-text-dark mb-3">{feature.title}</h3>
              <p className="text-salon-text-dark/70 font-sans text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;
