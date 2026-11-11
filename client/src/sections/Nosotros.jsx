import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SEO from '../components/ui/SEO';

const Nosotros = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const textRef = useRef(null);
  const benefitsRef = useRef(null);

  useScrollAnimation(sectionRef, { variant: 'fadeUp', start: 'top 80%' });
  useScrollAnimation(titleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.1 });
  useScrollAnimation(subtitleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.2 });
  useScrollAnimation(textRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.3 });
  useScrollAnimation(benefitsRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.4 });

  const beneficios = [
    'Alto contenido de proteína',
    'Bajo en azúcar',
    'Ingredientes naturales',
    'Ideal para tu plan nutricional',
  ];

  return (
    <>
      <SEO
        title="Nosotros | ¿Qué es FitCream?"
        description="FitCream nace de unir el placer de comer un helado con los objetivos de una vida saludable. Ingredientes naturales, bajos en grasa y azúcar, altos en proteína."
        path="/nosotros"
      />
      <section
        ref={sectionRef}
        id="nosotros"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight opacity-0 translate-y-4">
            ¿Qué es FitCream?
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 opacity-0 translate-y-4">
            Nace de unir dos mundos que parecían opuestos: el placer de comer un
            helado y los objetivos de una vida saludable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6 opacity-0 translate-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Todos nuestros productos son elaborados con ingredientes
              naturales, bajos en grasa y azúcar, y enriquecidos con proteína
              de alta calidad. Sin culpa, solo sabor.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cada porción de 100 g está pensada para encajar en tu plan
              nutricional, ya sea después de entrenar o como un antojo saludable
              en cualquier momento del día.
            </p>
          </div>

          <div ref={benefitsRef} className="flex flex-col gap-3 opacity-0 translate-y-4">
            {beneficios.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 pl-4 border-l-2 border-fitcream-500"
              >
                <span className="text-fitcream-500 font-bold">✓</span>
                <span className="text-gray-700">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Nosotros;
