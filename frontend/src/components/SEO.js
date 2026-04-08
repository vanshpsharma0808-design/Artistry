import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = 'Demo Salon | Premium Beauty Services',
  description = 'Book hair, skin, bridal and nail services at Demo Salon. Expert stylists, premium products, walk-ins welcome.',
  image = '/hero-salon.png',
  url = 'https://premium-salon-anand.preview.emergentagent.com',
  type = 'website'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Demo Salon",
    "description": "Premium salon offering hair, skin, bridal and nail services",
    "image": "/hero-salon.png",
    "url": "https://premium-salon-anand.preview.emergentagent.com",
    "telephone": "+91XXXXXXXXXX",
    "priceRange": "$$",
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
      <meta name="keywords" content="salon, beauty salon, bridal makeup, hair salon, family salon, best salon" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Demo Salon" />
      
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
