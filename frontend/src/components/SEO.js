import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = 'Artistry Family Salon | Best Family Salon in Vallabh Vidyanagar, Anand',
  description = 'Book hair, skin, bridal and nail services at Artistry Family Salon in Anand, Gujarat. Expert stylists, premium products, walk-ins welcome.',
  image = 'https://images.pexels.com/photos/21031387/pexels-photo-21031387.jpeg',
  url = 'https://premium-salon-anand.preview.emergentagent.com',
  type = 'website'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Artistry Family Salon",
    "description": "Premium family salon offering hair, skin, bridal and nail services in Anand, Gujarat",
    "image": "https://images.pexels.com/photos/21031387/pexels-photo-21031387.jpeg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "G-4, Gajanand The Business Hub, Nana Bazaar",
      "addressLocality": "Vallabh Vidyanagar, Bakrol",
      "addressRegion": "Gujarat",
      "postalCode": "388315",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.560621",
      "longitude": "72.9254909"
    },
    "url": "https://premium-salon-anand.preview.emergentagent.com",
    "telephone": "+91XXXXXXXXXX",
    "priceRange": "₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "11:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="salon anand, beauty salon vallabh vidyanagar, bridal makeup anand, hair salon gujarat, family salon anand, best salon anand" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Artistry Family Salon" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
