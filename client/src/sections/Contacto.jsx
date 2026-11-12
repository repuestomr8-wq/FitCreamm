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
        description="Contáctanos en FitCream. Cali, Valle del Cauca, Colombia. Tel: +57 300 766 5191, correo: sebastian429hb@gmail.com."
        path="/contacto"
      />
      <section
        ref={sectionRef}
        id="contacto"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-fitcream-50 relative overflow-hidden"
      >
        {/* Formas decorativas orgánicas en tonos crema y verde menta */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-fitcream-100/50 rounded-full blur-[140px] -translate-x-20 -translate-y-30" />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-green-100/40 rounded-full blur-[160px] -translate-x-30 translate-y-20" />
          <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-fitcream-200/30 rounded-full blur-[100px] translate-x-40 -translate-y-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
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
                  <a href="tel:+573007665191" className="text-fitcream-600 hover:underline font-medium">
                    300 766 5191
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-fitcream-500 text-white flex items-center justify-center text-xs font-bold">
                    ✉
                  </span>
                  <a href="mailto:sebastian429hb@gmail.com" className="text-fitcream-600 hover:underline font-medium">
                    sebastian429hb@gmail.com
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
