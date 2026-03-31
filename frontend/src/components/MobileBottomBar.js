import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileBottomBar = () => {
  const navigate = useNavigate();

  const handleCall = () => {
    window.location.href = 'tel:+91XXXXXXXXXX';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Artistry%20Family%20Salon', '_blank');
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-salon-charcoal border-t border-salon-gold/20 backdrop-blur-lg safe-area-pb">
      <div className="grid grid-cols-3 h-16">
        <button
          onClick={handleCall}
          data-testid="mobile-bar-call"
          className="flex flex-col items-center justify-center gap-1 text-salon-cream hover:bg-salon-card transition-colors active:bg-salon-gold/10"
        >
          <Phone size={20} className="text-salon-gold" />
          <span className="text-xs font-sans">Call</span>
        </button>
        <button
          onClick={handleWhatsApp}
          data-testid="mobile-bar-whatsapp"
          className="flex flex-col items-center justify-center gap-1 text-salon-cream hover:bg-salon-card transition-colors active:bg-salon-gold/10"
        >
          <MessageCircle size={20} className="text-[#25D366]" />
          <span className="text-xs font-sans">WhatsApp</span>
        </button>
        <button
          onClick={handleBookNow}
          data-testid="mobile-bar-book"
          className="flex flex-col items-center justify-center gap-1 bg-salon-gold text-salon-black hover:bg-[#DFC06E] transition-colors active:bg-[#C9A84C]"
        >
          <Calendar size={20} />
          <span className="text-xs font-sans font-semibold">Book Now</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomBar;
