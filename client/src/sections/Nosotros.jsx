import { useRef } from 'react';
import SEO from '../components/ui/SEO';

const Nosotros = () => {
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
        description="FitCream nace en el campo colombiano, elaborado con familias campesinas y frutas frescas del Valle del Cauca. Helados artesanales altos en proteína y bajos en azúcar."
        path="/nosotros"
      />
      <section
        id="nosotros"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight">
              ¿Qué es FitCream?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Nace en el corazón del Valle del Cauca, donde el campo colombiano
              es nuestro mayor orgullo y nuestra mejor materia prima.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Columna izquierda: Narrativa */}
            <div className="space-y-7">
              <p className="text-lg text-gray-700 leading-relaxed">
                FitCream no nace en una fábrica, nace en la tierra. Cada helado
                que sale de nuestra cocina empieza mucho antes: en las manos de
                familias campesinas del Valle del Cauca que siembran con cariño
                las fresas, el cacao y las vainillas que endulzan nuestros
                helados artesanales.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Trabajamos mano a mano con productores locales que cultivan
                con respeto y pasión, sin prisa, respetando los ciclos de la
                naturaleza. La leche que usamos proviene de ganaderías cercanas,
                donde el bienestar animal es prioridad y cada gota lleva el
                sabor auténtico del campo colombiano.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Así, cada cucharada de FitCream es un homenaje a quienes
                trabajan la tierra. Son helados hechos con ingredientes
                naturales, altos en proteína y bajos en azúcar, pensados para
                quienes cuidan su alimentación sin renunciar al placer de un
                buen helado. Porque lo bueno de Colombia merece ser compartido.
              </p>
            </div>

            {/* Columna derecha: Beneficios */}
            <div className="flex flex-col gap-4 space-y-6">
              <h3 className="text-2xl font-bold text-fitcream-700 mb-4 tracking-tight">
                ¿Por qué elegir FitCream?
              </h3>
              {beneficios.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pl-4 border-l-3 border-fitcream-500 bg-white/50 rounded-r-lg py-3 px-4 hover:bg-white/20 transition-colors"
                >
                  <span className="text-fitcream-400 font-bold text-lg">✓</span>
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