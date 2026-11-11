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
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fitcream-200/60 rounded-full blur-[100px] -translate-y-[100px]" />
          <div className="absolute bottom-0 right-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-fitcream-100/60 rounded-full blur-[80px] translate-y-[50px]" />
        </div>

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

        <div className="flex flex-col items-start justify-center text-left max-w-2xl px-6 md:px-12 z-20 relative pt-20 pb-12">
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
      </section>
    </>
  );
};

export default Hero;
