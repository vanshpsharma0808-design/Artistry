import React, { useState } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { url: 'https://images.pexels.com/photos/3993451/pexels-photo-3993451.jpeg', category: 'hair', alt: 'Hair styling' },
    { url: 'https://images.pexels.com/photos/17476244/pexels-photo-17476244.jpeg', category: 'bridal', alt: 'Bridal makeup' },
    { url: 'https://images.pexels.com/photos/19666192/pexels-photo-19666192.jpeg', category: 'spa', alt: 'Spa treatment' },
    { url: 'https://images.pexels.com/photos/34871614/pexels-photo-34871614.jpeg', category: 'nails', alt: 'Nail art' },
    { url: 'https://images.pexels.com/photos/18367697/pexels-photo-18367697.jpeg', category: 'hair', alt: 'Hair model' },
    { url: 'https://images.pexels.com/photos/13068357/pexels-photo-13068357.jpeg', category: 'salon', alt: 'Salon interior' },
  ];

  const filteredImages = filter === 'all' ? images : images.filter((img) => img.category === filter);

  return (
    <div className="bg-salon-black min-h-screen pt-16">
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-salon-gold mb-4 text-center" data-testid="gallery-title">
            Our Gallery
          </h1>
          <p className="text-salon-cream/80 font-sans text-center mb-12">
            Explore our work and get inspired
          </p>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {['all', 'hair', 'bridal', 'nails', 'spa'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`gallery-filter-${cat}`}
                className={`min-h-[48px] px-6 py-2 rounded-sm font-sans transition-all duration-300 ${
                  filter === cat
                    ? 'bg-salon-gold text-salon-black'
                    : 'bg-salon-card text-salon-cream border border-salon-gold/30 hover:border-salon-gold/50'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(image)}
                data-testid={`gallery-image-${idx}`}
                className="relative aspect-square overflow-hidden rounded-sm border border-salon-gold/20 cursor-pointer hover:border-salon-gold/50 transition-all duration-300 group"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-salon-card border-salon-gold/20">
          {selectedImage && (
            <img src={selectedImage.url} alt={selectedImage.alt} className="w-full h-auto rounded-sm" data-testid="gallery-lightbox-image" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
