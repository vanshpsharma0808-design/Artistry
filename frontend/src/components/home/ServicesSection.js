import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const ServicesSection = () => {
  const services = [
    {
      title: 'Hair Services',
      image: 'https://images.pexels.com/photos/3993451/pexels-photo-3993451.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Cuts, colors, styling & treatments',
    },
    {
      title: 'Bridal Makeup',
      image: 'https://images.pexels.com/photos/17476244/pexels-photo-17476244.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Make your special day unforgettable',
    },
    {
      title: 'Spa & Wellness',
      image: 'https://images.pexels.com/photos/19666192/pexels-photo-19666192.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Relax and rejuvenate',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-salon-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-gold text-center mb-16" data-testid="home-services-title">
            Featured Services
          </h2>
        </AnimatedSection>
        
        <AnimatedSection 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          stagger={true}
          staggerDelay={150}
        >
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-salon-card border border-salon-gold/20 rounded-sm overflow-hidden hover:border-salon-gold/50 transition-all duration-300 hover-lift"
              data-testid={`home-service-${idx}`}
            >
              <img src={service.image} alt={service.title} className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-6">
                <h3 className="font-serif text-2xl text-salon-cream mb-2">{service.title}</h3>
                <p className="text-salon-cream/80 font-sans text-sm mb-4">{service.description}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-salon-gold font-sans text-sm hover:text-salon-champagne transition-colors duration-300"
                  data-testid={`home-service-link-${idx}`}
                >
                  View All Services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ServicesSection;
