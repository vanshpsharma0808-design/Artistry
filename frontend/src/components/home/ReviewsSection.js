import React from 'react';
import { Star } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const ReviewsSection = () => {
  const reviews = [
    { name: 'Priya Shah', rating: 5, text: 'Best salon experience in Anand! The staff is so professional and caring.' },
    { name: 'Rohan Patel', rating: 5, text: 'Amazing haircut and beard styling. Highly recommend for men\'s grooming!' },
    { name: 'Neha Desai', rating: 5, text: 'My bridal makeup was absolutely stunning. Thank you Artistry!' },
  ];

  return (
    <section className="py-20 md:py-32 bg-salon-cream pb-32 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-text-dark text-center mb-16" data-testid="home-reviews-title">
            What Our Clients Say
          </h2>
        </AnimatedSection>
        
        <AnimatedSection 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          stagger={true}
          staggerDelay={100}
        >
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white border border-salon-rose-gold/30 p-6 sm:p-8 rounded-sm hover:border-salon-gold hover:shadow-lg transition-all duration-300"
              data-testid={`home-review-${idx}`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#C9A84C" className="text-salon-gold" />
                ))}
              </div>
              <p className="text-salon-text-dark/70 font-sans text-sm leading-relaxed mb-4">"{review.text}"</p>
              <p className="font-sans font-bold text-salon-rose-gold text-sm">- {review.name}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ReviewsSection;
