import React from 'react';
import SEO from '../components/SEO';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ServicesSection from '../components/home/ServicesSection';
import ReviewsSection from '../components/home/ReviewsSection';

const Home = () => {
  return (
    <div className="bg-salon-charcoal min-h-screen">
      <SEO />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <ReviewsSection />
    </div>
  );
};

export default Home;
