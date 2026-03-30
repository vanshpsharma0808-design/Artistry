import React from 'react';
import { Users, Award, Clock, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users size={32} />, value: '500+', label: 'Happy Clients' },
    { icon: <Star size={32} />, value: '4.9★', label: 'Rating' },
    { icon: <Clock size={32} />, value: '3+', label: 'Years of Excellence' },
    { icon: <Award size={32} />, value: '20+', label: 'Services' },
  ];

  const team = [
    { name: 'Priya Sharma', role: 'Hair Specialist', specialty: 'Color & Styling Expert' },
    { name: 'Anjali Patel', role: 'Bridal Makeup Artist', specialty: 'HD & Airbrush Makeup' },
    { name: 'Ravi Kumar', role: 'Senior Barber', specialty: 'Men\'s Grooming' },
  ];

  return (
    <div className="bg-salon-black min-h-screen pt-16">
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-salon-gold mb-8 text-center" data-testid="about-title">
            About Artistry Family Salon
          </h1>

          <div className="max-w-3xl mx-auto mb-20">
            <p className="text-salon-cream/80 font-sans text-base leading-relaxed mb-6 text-center">
              Artistry Family Salon was founded with one vision — to bring world-class beauty services to the heart of Vallabh Vidyanagar. We believe that every visit should be an experience, not just an appointment.
            </p>
            <p className="text-salon-cream/80 font-sans text-base leading-relaxed text-center">
              Our team of expert stylists uses only premium products and cutting-edge techniques to ensure you leave feeling confident and beautiful. From precision haircuts to luxurious bridal makeup, we offer comprehensive services for the entire family.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center" data-testid={`about-stat-${idx}`}>
                <div className="text-salon-gold mb-4 flex justify-center">{stat.icon}</div>
                <p className="font-serif text-3xl text-salon-gold mb-2">{stat.value}</p>
                <p className="font-sans text-sm text-salon-cream/80">{stat.label}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-gold mb-12 text-center" data-testid="about-team-title">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-salon-card border border-salon-gold/20 p-6 sm:p-8 rounded-sm text-center"
                data-testid={`about-team-${idx}`}
              >
                <div className="w-24 h-24 bg-salon-gold/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-serif text-xl text-salon-cream mb-2">{member.name}</h3>
                <p className="text-salon-champagne font-sans text-sm mb-2">{member.role}</p>
                <p className="text-salon-cream/80 font-sans text-sm">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
