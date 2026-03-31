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
          backgroundImage: 'url(https://images.pexels.com/photos/21031387/pexels-photo-21031387.jpeg?auto=compress&cs=tinysrgb&w=1200)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-salon-black/90 via-salon-black/60 to-salon-black/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h1 
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-salon-gold mb-6 tracking-tight leading-none fade-in-up" 
          data-testid="home-hero-title"
        >
          Artistry Family Salon
        </h1>
        <p 
          className="font-sans text-xl sm:text-2xl text-salon-champagne mb-8 max-w-2xl fade-in-up" 
          style={{ animationDelay: '0.2s' }}
        >
          Where Every Visit Is an Experience
        </p>
        <Link
          to="/booking"
          data-testid="home-hero-cta"
          className="inline-flex items-center gap-3 bg-salon-gold text-salon-black font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300 text-lg fade-in-up button-glow"
          style={{ animationDelay: '0.4s' }}
        >
          Book Your Appointment <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
