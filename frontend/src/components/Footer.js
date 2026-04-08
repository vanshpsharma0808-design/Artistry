import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-salon-charcoal border-t border-salon-gold/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-salon-gold mb-4" data-testid="footer-logo">Demo Salon</h3>
            <p className="text-salon-cream/80 font-sans text-sm leading-relaxed">
              Where every visit is an experience. Premium beauty services for the entire family.
            </p>
          </div>

          <div>
            <h4 className="font-sans font-bold text-salon-champagne mb-4 uppercase tracking-wider text-sm">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-salon-gold mt-1" />
                <p className="text-salon-cream/80 text-sm font-sans">
                  123 Main Street, Your City
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-salon-gold" />
                <a href="tel:+91XXXXXXXXXX" className="text-salon-cream/80 text-sm font-sans hover:text-salon-gold transition-colors" data-testid="footer-phone">
                  +91 XXXXXXXXXX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-salon-gold" />
                <div className="text-salon-cream/80 text-sm font-sans">
                  <p>Mon-Sat: 10:00 AM – 8:00 PM</p>
                  <p>Sunday: 11:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold text-salon-champagne mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/services" className="block text-salon-cream/80 text-sm font-sans hover:text-salon-gold transition-colors" data-testid="footer-services">Services</Link>
              <Link to="/booking" className="block text-salon-cream/80 text-sm font-sans hover:text-salon-gold transition-colors" data-testid="footer-booking">Book Appointment</Link>
              <Link to="/gallery" className="block text-salon-cream/80 text-sm font-sans hover:text-salon-gold transition-colors" data-testid="footer-gallery">Gallery</Link>
              <Link to="/about" className="block text-salon-cream/80 text-sm font-sans hover:text-salon-gold transition-colors" data-testid="footer-about">About Us</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-salon-gold/10 text-center">
          <p className="text-salon-cream/60 text-sm font-sans">© 2026 Demo Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
