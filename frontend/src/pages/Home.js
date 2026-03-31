import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Shield, Heart, ArrowRight, Star } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    { icon: <Sparkles size={32} />, title: 'Expert Stylists', description: 'Trained professionals with years of experience' },
    { icon: <Shield size={32} />, title: 'Premium Products', description: 'Only the finest brands for your care' },
    { icon: <Heart size={32} />, title: 'Hygienic & Clean', description: 'Sanitized equipment and spotless environment' },
    { icon: <Users size={32} />, title: 'Family Friendly', description: 'Services for everyone in your family' },
  ];

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

  const reviews = [
    { name: 'Priya Shah', rating: 5, text: 'Best salon experience in Anand! The staff is so professional and caring.' },
    { name: 'Rohan Patel', rating: 5, text: 'Amazing haircut and beard styling. Highly recommend for men\'s grooming!' },
    { name: 'Neha Desai', rating: 5, text: 'My bridal makeup was absolutely stunning. Thank you Artistry!' },
  ];

  return (
    <div className="bg-salon-black min-h-screen">
      <SEO />
      
      <section
        className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/21031387/pexels-photo-21031387.jpeg?auto=compress&cs=tinysrgb&w=1200)' }}
        data-testid="home-hero"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-salon-black/90 via-salon-black/60 to-salon-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-salon-gold mb-6 tracking-tight leading-none fade-in-up" data-testid="home-hero-title">
            Artistry Family Salon
          </h1>
          <p className="font-sans text-xl sm:text-2xl text-salon-champagne mb-8 max-w-2xl fade-in-up" style={{ animationDelay: '0.2s' }}>
            Where Every Visit Is an Experience
          </p>
          <Link
            to="/booking"
            data-testid="home-hero-cta"
            className="inline-flex items-center gap-3 bg-salon-gold text-salon-black font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300 text-lg fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Book Your Appointment <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-salon-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-gold text-center mb-16 animate-on-scroll" data-testid="home-why-us-title">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-salon-card border border-salon-gold/20 p-6 sm:p-8 rounded-sm hover:border-salon-gold/50 transition-all duration-300 hover-lift animate-on-scroll"
                data-testid={`home-feature-${idx}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-salon-gold mb-4">{feature.icon}</div>
                <h3 className="font-serif text-xl sm:text-2xl text-salon-cream mb-3">{feature.title}</h3>
                <p className="text-salon-cream/80 font-sans text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-salon-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-gold text-center mb-16 animate-on-scroll" data-testid="home-services-title">
            Featured Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-salon-card border border-salon-gold/20 rounded-sm overflow-hidden hover:border-salon-gold/50 transition-all duration-300 hover-lift animate-on-scroll"
                data-testid={`home-service-${idx}`}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <img src={service.image} alt={service.title} className="w-full h-64 object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-salon-cream mb-2">{service.title}</h3>
                  <p className="text-salon-cream/80 font-sans text-sm mb-4">{service.description}</p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-salon-gold font-sans text-sm hover:text-salon-champagne transition-colors"
                    data-testid={`home-service-link-${idx}`}
                  >
                    View All Services <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-salon-charcoal pb-32 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-gold text-center mb-16 animate-on-scroll" data-testid="home-reviews-title">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-salon-card border border-salon-gold/20 p-6 sm:p-8 rounded-sm hover:border-salon-gold/30 transition-all duration-300 animate-on-scroll"
                data-testid={`home-review-${idx}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#C9A84C" className="text-salon-gold" />
                  ))}
                </div>
                <p className="text-salon-cream/80 font-sans text-sm leading-relaxed mb-4">"{review.text}"</p>
                <p className="font-sans font-bold text-salon-champagne text-sm">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
