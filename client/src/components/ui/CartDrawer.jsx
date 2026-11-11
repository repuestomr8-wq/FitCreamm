import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
  const { items, total, removeItem, toggleQuantity, checkout, setQuantity } = useCart();
  const drawerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatCOP = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  if (!isOpen) {
    return (
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-fitcream-500 text-white flex items-center justify-center shadow-lg hover:bg-fitcream-600 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-fitcream-500"
        aria-label="Abrir carrito de compras"
        title={`Carrito: ${items.length} producto(s) - ${formatCOP(total)}`}
      >
        🛒
        {items.length > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity opacity-100"
        onClick={closeCart}
      />
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 translate-x-0 flex flex-col"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-fitcream-700">Tu carrito</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-fitcream-600 transition-colors"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-fitcream-100 rounded-full flex items-center justify-center mx-auto mb-4 text-fitcream-500 text-2xl">
                🛒
              </div>
              <p className="text-gray-500">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="mt-6 btn-ghost"
              >
                Seguir navegando
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-50 pb-3 last:border-0">
                  <img
                    src={item.imagen || '/img/producto-chocolate.jpg'}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{item.nombre}</h4>
                    <p className="text-xs text-fitcream-600 font-bold">
                      {formatCOP(item.precio)} c/u
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-fitcream-200 flex items-center justify-center text-xs font-bold text-fitcream-600 hover:bg-fitcream-50 hover:border-fitcream-500"
                      aria-label={`Restar ${item.nombre}`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.cantidad}
                      min="1"
                      max="20"
                      className="w-8 text-center text-sm font-semibold border-b border-fitcream-200 focus:outline-none focus:border-fitcream-500"
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val >= 1 && val <= 20) {
                          // Acción directa via setter
                          setQuantity(item.id, val);
                        }
                      }}
                    />
                    <button
                      onClick={() => toggleQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-fitcream-200 flex items-center justify-center text-xs font-bold text-fitcream-600 hover:bg-fitcream-50 hover:border-fitcream-500"
                      aria-label={`Sumar ${item.nombre}`}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 ml-2"
                      aria-label="Eliminar producto"
                    >
                      ✕
                    </button>
                  </div>
                  <span className="text-sm font-bold text-fitcream-700">
                    {formatCOP(item.precio * item.cantidad)}
                  </span>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-xl font-bold mb-2">
                  <span className="text-fitcream-700">Total</span>
                  <span className="text-fitcream-600">{formatCOP(total)}</span>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    const el = document.getElementById('pedido');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full btn-primary mt-3"
                >
                  Ver resumen del pedido
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
