import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Calendar } from '../components/ui/calendar';
import { Check } from 'lucide-react';
import SEO from '../components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service_category: '',
    service_name: '',
    stylist: '',
    date: null,
    time: '',
    customer_name: '',
    customer_phone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/stylists`);
      setStylists(data.filter(s => s.is_available));
    } catch (error) {
      console.error('Failed to fetch stylists', error);
    }
  };

  const serviceCategories = ['Hair', 'Nails', 'Skin & Facial', 'Bridal', 'Spa & Wellness', "Men's Grooming"];
  const timeSlots = {
    morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '2:00 PM', '3:00 PM'],
    evening: ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'],
  };

  const handleNext = useCallback(() => {
    if (step < 4) setStep(step + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step > 1) setStep(step - 1);
  }, [step]);

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        date: formData.date ? formData.date.toISOString().split('T')[0] : '',
      };
      await axios.post(`${BACKEND_URL}/api/bookings`, payload);
      setBookingComplete(true);
    } catch (error) {
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const message = `Hi, I just booked an appointment for ${formData.service_name} on ${formData.date?.toLocaleDateString()} at ${formData.time}. My name is ${formData.customer_name}.`;
    window.open(`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`, '_blank');
  };

  const progress = (step / 4) * 100;

  if (bookingComplete) {
    return (
      <div className="bg-salon-black min-h-screen pt-16 flex items-center justify-center pb-20 md:pb-0">
        <SEO title="Booking Confirmed | Artistry Family Salon" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-salon-card border border-salon-gold/20 p-8 sm:p-12 rounded-sm fade-in">
            <div className="w-16 h-16 bg-salon-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-salon-black" />
            </div>
            <h2 className="font-serif text-3xl text-salon-gold mb-4" data-testid="booking-success-title">Booking Confirmed!</h2>
            <div className="bg-salon-charcoal p-6 rounded-sm mb-6 text-left">
              <p className="text-salon-cream/80 font-sans text-sm mb-2"><strong className="text-salon-champagne">Service:</strong> {formData.service_name}</p>
              <p className="text-salon-cream/80 font-sans text-sm mb-2"><strong className="text-salon-champagne">Stylist:</strong> {formData.stylist}</p>
              <p className="text-salon-cream/80 font-sans text-sm mb-2"><strong className="text-salon-champagne">Date:</strong> {formData.date?.toLocaleDateString()}</p>
              <p className="text-salon-cream/80 font-sans text-sm"><strong className="text-salon-champagne">Time:</strong> {formData.time}</p>
            </div>
            <p className="text-salon-cream/80 font-sans text-sm mb-6">✅ <strong>No payment required now.</strong> Pay at the salon on your visit.</p>
            <button
              onClick={openWhatsApp}
              data-testid="booking-whatsapp-btn"
              className="bg-[#25D366] text-white font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-[#1da851] transition-all duration-300 w-full mb-4 button-glow"
            >
              Notify Us on WhatsApp
            </button>
            <button
              onClick={() => window.location.href = '/'}
              data-testid="booking-home-btn"
              className="bg-transparent border border-salon-gold text-salon-gold font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-salon-gold/10 transition-all duration-300 w-full"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-salon-black min-h-screen pt-16 pb-20 md:pb-0">
      <SEO title="Book Appointment | Artistry Family Salon" />
      <div className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-salon-gold mb-8 text-center fade-in" data-testid="booking-title">
            Book Appointment
          </h1>

          <div className="mb-8">
            <div className="h-1 w-full bg-salon-charcoal rounded-full overflow-hidden">
              <div className="h-full bg-salon-gold transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm text-salon-champagne font-sans mt-2 text-right" data-testid="booking-step-indicator">Step {step} of 4</p>
          </div>

          <div className="bg-salon-card border border-salon-gold/20 p-6 sm:p-8 rounded-sm min-h-[400px]">
            {step === 1 && (
              <div data-testid="booking-step-1" className="slide-in-right">
                <h2 className="font-serif text-2xl text-salon-cream mb-6">Select Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        updateFormData('service_category', category);
                        updateFormData('service_name', category);
                        handleNext();
                      }}
                      data-testid={`service-category-${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="min-h-[48px] p-4 border rounded-sm transition-all duration-300 font-sans hover-lift bg-salon-charcoal text-salon-cream border-salon-gold/30 hover:border-salon-gold/50 hover:bg-salon-gold hover:text-salon-black"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div data-testid="booking-step-2" className="slide-in-right">
                <h2 className="font-serif text-2xl text-salon-cream mb-6">Select Stylist</h2>
                <div className="grid grid-cols-1 gap-4">
                  {stylists.map((stylist) => (
                    <button
                      key={stylist.id}
                      onClick={() => {
                        updateFormData('stylist', stylist.name);
                        handleNext();
                      }}
                      data-testid={`stylist-${stylist.name.toLowerCase().replace(/\s/g, '-')}`}
                      className="min-h-[48px] p-4 border rounded-sm transition-all duration-300 text-left hover-lift bg-salon-charcoal text-salon-cream border-salon-gold/30 hover:border-salon-gold/50"
                    >
                      <p className="font-sans font-bold">{stylist.name}</p>
                      <p className="font-sans text-sm opacity-80">{stylist.specialty}</p>
                    </button>
                  ))}
                </div>
                <button onClick={handleBack} className="mt-4 text-salon-gold font-sans text-sm hover:text-salon-champagne transition-colors" data-testid="booking-back-btn">← Back</button>
              </div>
            )}

            {step === 3 && (
              <div data-testid="booking-step-3" className="slide-in-right">
                <h2 className="font-serif text-2xl text-salon-cream mb-6">Select Date & Time</h2>
                <div className="mb-6">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => updateFormData('date', date)}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-sm border border-salon-gold/30 bg-salon-charcoal text-salon-cream"
                    data-testid="booking-calendar"
                  />
                </div>
                {formData.date && (
                  <div>
                    <h3 className="font-sans font-bold text-salon-champagne mb-3 text-sm uppercase tracking-wider">Select Time</h3>
                    {Object.keys(timeSlots).map((period) => (
                      <div key={period} className="mb-4">
                        <p className="text-salon-cream/60 text-xs font-sans uppercase mb-2">{period}</p>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots[period].map((time) => (
                            <button
                              key={time}
                              onClick={() => {
                                updateFormData('time', time);
                                handleNext();
                              }}
                              data-testid={`time-slot-${time.replace(/\s/g, '-').toLowerCase()}`}
                              className="min-h-[48px] px-4 py-2 border rounded-sm transition-all duration-300 font-sans text-sm bg-salon-charcoal text-salon-cream border-salon-gold/30 hover:border-salon-gold/50 hover:bg-salon-gold hover:text-salon-black"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={handleBack} className="mt-4 text-salon-gold font-sans text-sm hover:text-salon-champagne transition-colors" data-testid="booking-back-btn-2">← Back</button>
              </div>
            )}

            {step === 4 && (
              <div data-testid="booking-step-4" className="slide-in-right">
                <h2 className="font-serif text-2xl text-salon-cream mb-6">Your Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-salon-champagne font-sans text-sm mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.customer_name}
                      onChange={(e) => updateFormData('customer_name', e.target.value)}
                      data-testid="booking-input-name"
                      className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="block text-salon-champagne font-sans text-sm mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) => updateFormData('customer_phone', e.target.value)}
                      data-testid="booking-input-phone"
                      className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="block text-salon-champagne font-sans text-sm mb-2">Special Requests (Optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      data-testid="booking-input-notes"
                      className="min-h-[96px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                      placeholder="Any special requests?"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-6">
                  <button onClick={handleBack} className="text-salon-gold font-sans text-sm hover:text-salon-champagne transition-colors" data-testid="booking-back-btn-3">← Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.customer_name || !formData.customer_phone}
                    data-testid="booking-submit-btn"
                    className="bg-salon-gold text-salon-black font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-1 button-glow"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
