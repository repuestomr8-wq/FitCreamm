import { useRef } from 'react';
import { useEntranceAnimation, useScrollAnimation } from '../hooks/useScrollAnimation';
import SEO from '../components/ui/SEO';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEntranceAnimation(heroRef, { duration: 1, stagger: 0.15 });
  useScrollAnimation(titleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.1 });
  useScrollAnimation(subtitleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.2 });
  useScrollAnimation(ctaRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.3 });

  return (
    <>
      <SEO
        title="FitCream | Helados Proteicos y Bajos en Azúcar"
        description="Disfruta sin culpa. Helados artesanales bajos en azúcar y altos en proteína, elaborados en Cali, Colombia. Ideal para tu plan nutricional."
        path="/"
      />
      <section
        ref={heroRef}
        id="inicio"
        className="relative min-h-[70vh] overflow-hidden bg-fitcream-50"
      >
        <div className="absolute inset-0 z-0">
          {/* Video de fondo */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/img/videoinicio.mp4" type="video/mp4" />
          </video>

          {/* Overlay oscuro para contraste y legibilidad */}
          <div className="absolute inset-0 bg-black/45 z-10" />

          {/* Formas decorativas orgánicas */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fitcream-200/40 rounded-full blur-[120px] -translate-y-[100px]" />
          <div className="absolute bottom-0 right-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-fitcream-100/50 rounded-full blur-[90px] translate-y-[50px]" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-green-100/30 rounded-full blur-[110px] -translate-y-[80px]" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="text-left max-w-2xl">
            <div ref={titleRef}
              className="inline-block px-4 py-1.5 rounded-full bg-fitcream-100 text-fitcream-600 text-xs font-bold tracking-wider uppercase mb-6 opacity-0 translate-y-4"
            >
              Helados artesanales fit
            </div>
            <h1 ref={titleRef}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight opacity-0 translate-y-4"
            >
              Disfruta sin culpa
              <br />
              <span className="text-fitcream-400">de sabor y proteína</span>
            </h1>
            <p ref={subtitleRef}
              className="text-white/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed opacity-0 translate-y-4"
            >
              En FitCream creamos helados artesanales bajos en azúcar y altos en
              proteína, pensados para quienes cuidan su alimentación sin renunciar
              al sabor.
            </p>
            <div ref={ctaRef}
              className="flex flex-col sm:flex-row items-start justify-start gap-4 opacity-0 translate-y-4"
            >
              <a
                href="#catalogo"
                className="w-full sm:w-auto btn-primary text-left"
              >
                Ver catálogo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
