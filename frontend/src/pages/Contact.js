import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="bg-salon-black min-h-screen pt-16">
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-salon-gold mb-4 text-center" data-testid="contact-title">
            Get In Touch
          </h1>
          <p className="text-salon-cream/80 font-sans text-center mb-12 max-w-2xl mx-auto">
            Visit us or reach out for appointments and inquiries
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl text-salon-gold mb-6">Contact Form</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-salon-champagne font-sans text-sm mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="contact-input-name"
                    className="min-h-[48px] w-full bg-salon-card border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-salon-champagne font-sans text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    data-testid="contact-input-phone"
                    className="min-h-[48px] w-full bg-salon-card border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-salon-champagne font-sans text-sm mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="contact-input-message"
                    className="min-h-[96px] w-full bg-salon-card border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                    placeholder="Your message"
                    required
                  />
                </div>
                <button
                  type="submit"
                  data-testid="contact-submit-btn"
                  className="bg-salon-gold text-salon-black font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300 w-full"
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="text-salon-gold" size={24} />
                  <a href="tel:+91XXXXXXXXXX" className="text-salon-cream font-sans hover:text-salon-gold transition-colors" data-testid="contact-phone">
                    +91 XXXXXXXXXX
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="contact-whatsapp"
                    className="bg-[#25D366] text-white font-semibold min-h-[48px] px-6 py-3 rounded-sm hover:bg-[#1da851] transition-all duration-300 flex items-center gap-2"
                  >
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-salon-gold mb-6">Visit Us</h2>
              <div className="space-y-6 mb-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-salon-gold mt-1" size={24} />
                  <div>
                    <p className="font-sans text-salon-cream/80 text-sm leading-relaxed">
                      G-4, Gajanand The Business Hub<br />
                      Nana Bazaar, Vallabh Vidyanagar<br />
                      Bakrol, Anand, Gujarat 388315
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-salon-gold mt-1" size={24} />
                  <div className="font-sans text-salon-cream/80 text-sm">
                    <p className="font-bold text-salon-champagne mb-2">Business Hours</p>
                    <p>Mon-Sat: 10:00 AM – 8:00 PM</p>
                    <p>Sunday: 11:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-salon-card border border-salon-gold/20 rounded-sm overflow-hidden h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.5!2d72.9!3d22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzAwLjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  data-testid="contact-map"
                  title="Salon Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
