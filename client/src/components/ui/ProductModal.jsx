import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../../context/CartContext';

const BENEFICIOS_POR_SABOR = {
  chocolate: [
    '20 g de proteína por porción',
    'Antioxidantes naturales del cacao',
    'Bajo en índice glucémico',
    'Saciedad prolongada',
  ],
  vainilla: [
    '18 g de proteína por porción',
    'Sabor natural de vainilla',
    'Bajo en azúcar añadido',
    'Ideal para post-entreno',
  ],
  fresa: [
    '17 g de proteína por porción',
    'Antioxidantes de frutos rojos',
    'Bajo en calorías',
    'Refrescante y ligero',
  ],
  mani: [
    '20 g de proteína por porción',
    'Grasas saludables del maní',
    'Energía sostenida',
    'Muy saciante',
  ],
  cafe: [
    '18 g de proteína por porción',
    'Cafeína natural para activarte',
    'Bajo en azúcar añadido',
    'Estimulante y delicioso',
  ],
};

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();
  const [hasAdded, setHasAdded] = useState(false);

  const videoSrc = `/img/${product.sabor}.mp4`;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem({
      id: product._id || product.id,
      nombre: product.nombre,
      precio: product.precioCOP,
      imagen: product.imagen,
    });
    setHasAdded(true);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const beneficios = BENEFICIOS_POR_SABOR[product.sabor] || [];

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Detalle del producto"
    >
      <div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-white/80 backdrop-blur-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          aria-label="Cerrar detalle del producto"
        >
          ✕
        </button>

        {/* Split view: dos columnas */}
        <div className="grid md:grid-cols-2 h-full">

          {/* Columna Izquierda: Video */}
          <div className="h-full bg-black/10 relative">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster={product.imagen}
            >
              <source src={videoSrc} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
            {!hasAdded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-white text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                  Reproduciendo: {product.nombre}
                </span>
              </div>
            )}
          </div>

          {/* Columna Derecha: Información del producto */}
          <div className="p-6 md:p-8 h-full overflow-y-auto">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-display font-bold text-fitcream-700 tracking-tight">
                {product.nombre}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.descripcion}
              </p>

              {/* Beneficios clave */}
              <div className="mt-6">
                <h3 className="font-semibold text-fitcream-700 mb-3 flex items-center gap-2">
                  <span className="text-fitcream-500">✓</span> Beneficios clave
                </h3>
                <ul className="space-y-2">
                  {beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-fitcream-500 mt-0.5">•</span>
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Precio y botón de acción */}
              <div className="mt-8 pt-6 border-t border-fitcream-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xl font-bold text-fitcream-600">
                  $ {product.precioCOP.toLocaleString('es-CO')}
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={hasAdded}
                  className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2"
                >
                  {hasAdded ? (
                    <>
                      ✓ Agregado
                    </>
                  ) : (
                    <>
                      <span className="text-fitcream-500">+</span> Añadir al carrito
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
