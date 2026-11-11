import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SEO from '../components/ui/SEO';

const Contacto = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  useScrollAnimation(sectionRef, { variant: 'fadeUp', start: 'top 80%' });
  useScrollAnimation(titleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.1 });
  useScrollAnimation(subtitleRef, { variant: 'fadeUp', start: 'top 80%', delay: 0.2 });
  useScrollAnimation(infoRef, { variant: 'fadeLeft', start: 'top 80%', delay: 0.3 });
  useScrollAnimation(formRef, { variant: 'fadeRight', start: 'top 80%', delay: 0.3 });

  return (
    <>
      <SEO
        title="Contáctanos | FitCream Cali Colombia"
        description="Contáctanos en FitCream. Cali, Valle del Cauca, Colombia. Tel: 300 123 4567, correo: contacto@fitcream.com."
        path="/contacto"
      />
      <section
        ref={sectionRef}
        id="contacto"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-fitcream-50"
      >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={infoRef} className="opacity-0 translate-x-10">
            <h2 ref={titleRef} className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight">
              Contáctanos
            </h2>
            <p ref={subtitleRef} className="text-gray-600 text-lg mb-8 leading-relaxed">
              ¿Tienes preguntas sobre nuestros helados o quieres hacer un pedido
              grande? Escríbenos y te respondemos pronto.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-fitcream-500 text-white flex items-center justify-center text-xs font-bold">
                  📍
                </span>
                <span className="text-gray-700">Cali, Valle del Cauca, Colombia</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-fitcream-500 text-white flex items-center justify-center text-xs font-bold">
                  📞
                </span>
                <a href="tel:+573001234567" className="text-fitcream-600 hover:underline font-medium">
                  300 123 4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-fitcream-500 text-white flex items-center justify-center text-xs font-bold">
                  ✉
                </span>
                <a href="mailto:contacto@fitcream.com" className="text-fitcream-600 hover:underline font-medium">
                  contacto@fitcream.com
                </a>
              </div>
            </div>
          </div>

          <div ref={formRef} className="opacity-0 translate-x-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 focus:border-fitcream-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correo
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 focus:border-fitcream-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 focus:border-fitcream-500 outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Enviar mensaje
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contacto;
