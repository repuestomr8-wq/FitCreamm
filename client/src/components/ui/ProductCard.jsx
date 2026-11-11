import { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ producto }) => {
  const { addItem } = useCart();
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.opacity = '0';
    img.style.transform = 'translateY(10px)';
    img.style.transition = 'all 0.6s ease-out';
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  const handleAdd = () => {
    addItem({
      id: producto._id || producto.id,
      nombre: producto.nombre,
      precio: producto.precioCOP,
      imagen: producto.imagen,
    });
  };

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative h-48 md:h-56 overflow-hidden bg-fitcream-50">
        <img
          ref={imgRef}
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span
          className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-fitcream-600 border border-fitcream-100"
        >
          {producto.proteinasG}g proteína
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-fitcream-700 mb-1">{producto.nombre}</h3>
        <p className="text-gray-500 text-sm mb-3">{producto.descripcion}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-xl text-fitcream-600">$ {producto.precioCOP.toLocaleString('es-CO')}</span>
          <span className="text-xs text-fitcream-500 bg-fitcream-50 px-2 py-1 rounded text-fitcream-600 font-semibold">
            {producto.calorias} kcal
          </span>
        </div>

        <button
          onClick={handleAdd}
          className="w-full btn-ghost flex items-center justify-center gap-2"
        >
          <span>+ Agregar</span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
