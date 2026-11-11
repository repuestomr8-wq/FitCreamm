import { useEffect, useRef, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/ui/SEO';

const Catalogo = () => {
  const { productos, loading, error } = useProducts();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const gridRef = useRef(null);

  useScrollAnimation(sectionRef, { variant: 'fadeUp', start: 'top 80%' });
  useScrollAnimation(titleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.1 });
  useScrollAnimation(subtitleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.2 });

  // Stagger animación de las tarjetas al entrar al viewport
  useEffect(() => {
    if (!productos || productos.length === 0) return;
    gsap.to(gridRef.current.children, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, [productos]);

  if (loading) {
    return (
      <section id="catalogo" className="py-20 px-4 bg-fitcream-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight">
            Nuestro Catálogo
          </h2>
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="catalogo" className="py-20 px-4 bg-fitcream-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight">
            Nuestro Catálogo
          </h2>
          <p className="text-red-500">No se pudieron cargar los productos. Intenta de nuevo más tarde.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title="Catálogo | Helados FitCream Precios COP"
        description="Elige entre nuestros 5 sabores de helados proteicos: Chocolate, Vainilla, Fresa, Maní y Café. Precios en pesos colombianos (COP)."
        path="/catalogo"
      />
      <section
        ref={sectionRef}
        id="catalogo"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-fitcream-50"
      >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight opacity-0 translate-y-4">
            Nuestro Catálogo
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 opacity-0 translate-y-4">
            Elige entre nuestros sabores disponibles. Todos incluyen información
            nutricional aproximada por porción (100 g).
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {productos.map((producto) => (
            <ProductCard
              key={producto._id || producto.id}
              producto={producto}
              className="opacity-0 translate-y-10"
            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Catalogo;
