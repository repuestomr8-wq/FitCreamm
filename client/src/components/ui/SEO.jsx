import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = '/' }) => {
  const siteName = 'FitCream';
  const baseUrl = 'https://fitcream.com';
  const url = `${baseUrl}${path}`;
  const image = `${baseUrl}/img/og-imagen.jpg`;
  const defaultTitle = 'FitCream | Helados artesanales bajos en azúcar y altos en proteína';
  const defaultDescription = 'Helados artesanales bajos en azúcar y altos en proteína. Elaborados en Cali, Colombia. Ideal para tu plan nutricional sin renunciar al sabor.';

  return (
    <Helmet>
      <html lang="es" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content="helados proteicos, helados bajos en azúcar, fit cream, helado fitness, helados artesanales Cali" />
      <meta name="author" content="FitCream" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_CO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data - LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          'name': 'FitCream',
          'description': 'Helados artesanales bajos en azúcar y altos en proteína',
          'image': image,
          'url': baseUrl,
          'telephone': '+573001234567',
          'email': 'contacto@fitcream.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Cali, Valle del Cauca',
            'addressLocality': 'Cali',
            'addressRegion': 'Valle del Cauca',
            'addressCountry': 'CO',
          },
          'priceRange': '$',
          'servesCuisine': 'Helados artesanales',
          'hasMenu': {
            '@type': 'Menu',
            'name': 'Catálogo FitCream',
            'hasMenuItem': [
              {
                '@type': 'MenuItem',
                'name': 'Chocolate Proteico',
                'description': 'Helado artesanal de chocolate con alto contenido de proteína',
                'offers': { '@type': 'Offer', 'price': '9500', 'priceCurrency': 'COP' },
              },
              {
                '@type': 'MenuItem',
                'name': 'Vainilla Fit',
                'description': 'Helado artesanal de vainilla bajo en calorías',
                'offers': { '@type': 'Offer', 'price': '9000', 'priceCurrency': 'COP' },
              },
              {
                '@type': 'MenuItem',
                'name': 'Fresa Light',
                'description': 'Helado artesanal de fresa, opción más ligera',
                'offers': { '@type': 'Offer', 'price': '9000', 'priceCurrency': 'COP' },
              },
              {
                '@type': 'MenuItem',
                'name': 'Mantequilla de Maní Proteica',
                'description': 'Helado artesanal de maní con 18g de proteína por 100g',
                'offers': { '@type': 'Offer', 'price': '10500', 'priceCurrency': 'COP' },
              },
              {
                '@type': 'MenuItem',
                'name': 'Café Proteico',
                'description': 'Helado artesanal de café con proteína',
                'offers': { '@type': 'Offer', 'price': '9500', 'priceCurrency': 'COP' },
              },
            ],
          },
          'sameAs': [
            'https://instagram.com/fitcream',
            'https://facebook.com/fitcream',
          ],
        }, null, 2)}
      </script>
    </Helmet>
  );
};

export default SEO;
