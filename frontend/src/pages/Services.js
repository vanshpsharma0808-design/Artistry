import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Services = () => {
  const servicesData = {
    hair: [
      { name: 'Haircut (Men)', price: '₹300', description: 'Stylish cuts by expert barbers' },
      { name: 'Haircut (Women)', price: '₹500', description: 'Precision cuts and styling' },
      { name: 'Hair Color', price: '₹2000+', description: 'Premium color treatments' },
      { name: 'Blow Dry', price: '₹400', description: 'Professional styling' },
      { name: 'Hair Spa', price: '₹1500', description: 'Deep conditioning treatment' },
      { name: 'Straightening', price: '₹3000+', description: 'Keratin treatments' },
      { name: 'Highlights', price: '₹2500+', description: 'Trendy color accents' },
    ],
    nails: [
      { name: 'Manicure', price: '₹500', description: 'Complete hand care' },
      { name: 'Pedicure', price: '₹600', description: 'Foot spa and polish' },
      { name: 'Nail Art', price: '₹800+', description: 'Creative designs' },
      { name: 'Gel Nails', price: '₹1200', description: 'Long-lasting polish' },
    ],
    skin: [
      { name: 'Basic Facial', price: '₹800', description: 'Cleanse and refresh' },
      { name: 'Cleanup', price: '₹600', description: 'Quick skin rejuvenation' },
      { name: 'Bleach', price: '₹500', description: 'Skin brightening' },
      { name: 'De-Tan', price: '₹700', description: 'Remove tan naturally' },
      { name: 'Gold Facial', price: '₹1500', description: 'Luxury treatment' },
      { name: 'Anti-Aging Facial', price: '₹2000', description: 'Reduce fine lines' },
    ],
    bridal: [
      { name: 'Bridal Makeup', price: '₹8000+', description: 'Complete bridal look' },
      { name: 'Pre-Bridal Package', price: '₹15000+', description: '6 sessions for glowing skin' },
      { name: 'Engagement Look', price: '₹5000', description: 'Party makeup & styling' },
      { name: 'Bridal Hair Styling', price: '₹3000', description: 'Elegant hairstyles' },
    ],
    spa: [
      { name: 'Head Massage', price: '₹600', description: 'Relaxing scalp massage' },
      { name: 'Body Polishing', price: '₹2500', description: 'Smooth glowing skin' },
      { name: 'Waxing (Full Body)', price: '₹1500', description: 'Gentle hair removal' },
      { name: 'Waxing (Half Arms)', price: '₹300', description: 'Quick and painless' },
    ],
    mens: [
      { name: 'Haircut & Styling', price: '₹300', description: 'Modern cuts' },
      { name: 'Beard Trim', price: '₹150', description: 'Sharp and clean' },
      { name: 'Hair Color', price: '₹1500', description: 'Natural or trendy shades' },
      { name: 'Facial (Men)', price: '₹700', description: 'Deep cleansing' },
      { name: 'Head Massage', price: '₹500', description: 'Stress relief' },
    ],
  };

  return (
    <div className="bg-salon-black min-h-screen pt-16">
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-salon-gold mb-4 text-center" data-testid="services-title">
            Our Services
          </h1>
          <p className="text-salon-cream/80 font-sans text-center mb-12 max-w-2xl mx-auto">
            Premium beauty services for the entire family
          </p>

          <Tabs defaultValue="hair" className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-6 bg-salon-card border border-salon-gold/20 p-2 rounded-sm mb-8">
              <TabsTrigger value="hair" data-testid="tab-hair" className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans">Hair</TabsTrigger>
              <TabsTrigger value="nails" data-testid="tab-nails" className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans">Nails</TabsTrigger>
              <TabsTrigger value="skin" data-testid="tab-skin" className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans">Skin</TabsTrigger>
              <TabsTrigger value="bridal" data-testid="tab-bridal" className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans">Bridal</TabsTrigger>
              <TabsTrigger value="spa" data-testid="tab-spa" className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans">Spa</TabsTrigger>
              <TabsTrigger value="mens" data-testid="tab-mens" className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans">Men's</TabsTrigger>
            </TabsList>

            {Object.keys(servicesData).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {servicesData[category].map((service, idx) => (
                    <div
                      key={idx}
                      className="bg-salon-card border border-salon-gold/20 p-6 rounded-sm hover:border-salon-gold/50 transition-colors duration-300"
                      data-testid={`service-card-${category}-${idx}`}
                    >
                      <h3 className="font-serif text-xl text-salon-cream mb-2">{service.name}</h3>
                      <p className="text-salon-cream/80 font-sans text-sm mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-salon-gold font-bold font-sans text-lg">{service.price}</span>
                        <Link
                          to="/booking"
                          data-testid={`book-btn-${category}-${idx}`}
                          className="bg-salon-gold text-salon-black font-semibold px-6 py-2 rounded-sm hover:bg-[#DFC06E] transition-colors text-sm"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Services;
