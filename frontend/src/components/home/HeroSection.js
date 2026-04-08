import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
      data-testid="home-hero"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center ken-burns"
        style={{ 
          backgroundImage: 'url(/hero-salon.png)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-salon-charcoal/95 via-salon-rose-gold/30 to-salon-gold/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h1 
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-salon-gold mb-6 tracking-tight leading-none fade-in-up drop-shadow-lg" 
          data-testid="home-hero-title"
        >
          Demo Salon
        </h1>
        <p 
          className="font-sans text-xl sm:text-2xl text-salon-cream mb-8 max-w-2xl fade-in-up drop-shadow-md" 
          style={{ animationDelay: '0.2s' }}
        >
          Where Every Visit Is an Experience
        </p>
        <Link
          to="/booking"
          data-testid="home-hero-cta"
          className="inline-flex items-center gap-3 bg-salon-gold text-salon-text-dark font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-salon-rose-gold transition-all duration-300 text-lg fade-in-up button-glow shadow-xl"
          style={{ animationDelay: '0.4s' }}
        >
          Book Your Appointment <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
