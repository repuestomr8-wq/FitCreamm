import { useState } from 'react';
import { useCart } from '../context/CartContext';
import SEO from '../components/ui/SEO';

const Pedido = () => {
  const { items, total, addItem, removeItem, toggleQuantity, setQuantity, checkout } = useCart();
  
  // Función segura para cambiar cantidad absoluta (escribiendo o con botones)
  const setItemQuantity = (itemId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeItem(itemId);
      return;
    }
    setQuantity(itemId, qty);
  };

  const incrementQuantity = (itemId) => {
    toggleQuantity(itemId, 1);
  };

  const decrementQuantity = (itemId) => {
    toggleQuantity(itemId, -1);
  };

  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Correo inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      setError('Agrega al menos un producto al carrito antes de hacer el pedido.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const pedidoItems = items.map((item) => ({
      productoId: item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precioUnitarioCOP: item.precio,
    }));

    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          telefono: formData.telefono.trim(),
          direccion: formData.direccion.trim(),
          items: pedidoItems,
          totalCOP: total,
        }),
      });

      if (res.ok) {
        setConfirmado(true);
        checkout();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Error al enviar el pedido. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error de conexión al enviar el pedido.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCOP = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor);
  };

  if (confirmado) {
    return (
      <>
        <SEO
          title="Haz tu Pedido | FitCream Helados Proteicos"
          description="Completa el formulario y pide tus helados proteicos FitCream. Entregas en Cali, Valle del Cauca. Pago contra entrega."
          path="/pedido"
        />
        <section id="pedido" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 font-bold text-2xl">
              ✓
            </div>
            <h2 className="font-display text-3xl font-bold text-fitcream-700 mb-4">
              ¡Pedido recibido!
            </h2>
            <p className="text-gray-600 mb-8">
              Hola <strong>{formData.nombre}</strong>, hemos recibido tu pedido de FitCream. Te contactaremos pronto.
            </p>
            <a href="#inicio" className="btn-primary">
              Volver al inicio
            </a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Haz tu Pedido | FitCream Helados Proteicos"
        description="Completa el formulario y pide tus helados proteicos FitCream. Entregas en Cali, Valle del Cauca."
        path="/pedido"
      />
      <section id="pedido" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-fitcream-700 mb-2 tracking-tight">
              Haz tu pedido
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Completa el formulario y te contactaremos para confirmar tu pedido.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Columna izquierda: Carrito y Controles de Cantidad */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-fitcream-700 mb-4">Tu carrito</h3>

              {items.length === 0 ? (
                <div className="bg-fitcream-50 p-8 rounded-2xl border border-fitcream-100 text-center space-y-4">
                  <p className="text-gray-500 text-sm">Tu carrito está vacío</p>
                  <p className="text-xs text-gray-400">
                    Agrega helados desde el catálogo para verlos aquí.
                  </p>
                  {/* La mascota aparece SOLAMENTE cuando el carrito está vacío */}
                  <div className="pt-4 flex justify-center">
                    <img
                      src="/img/pedidos.png"
                      alt="Mascota FitCream Pedidos"
                      className="w-full max-w-xs h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-fitcream-100 shadow-sm p-5 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-fitcream-50 rounded-xl border border-fitcream-100"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img
                          src={item.imagen || '/img/producto-chocolate.jpg'}
                          alt={item.nombre}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm leading-tight">{item.nombre}</h4>
                          <p className="text-xs text-fitcream-600 font-bold mt-0.5">
                            {formatCOP(item.precio)} c/u
                          </p>
                        </div>
                      </div>

                      {/* Controles: - / Input numérico editable / + */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(item.id)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                            title="Disminuir"
                          >
                            -
                          </button>
                          
                          {/* Input numérico para escribir directamente la cantidad */}
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => setItemQuantity(item.id, e.target.value)}
                            className="w-12 text-center text-xs font-bold text-gray-800 focus:outline-none bg-transparent py-1"
                          />

                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.id)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                            title="Aumentar"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-fitcream-700 min-w-[80px] text-right">
                          {formatCOP(item.precio * item.cantidad)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-fitcream-50 flex justify-between items-center">
                    <span className="text-fitcream-700 font-bold text-lg">Total</span>
                    <span className="text-fitcream-600 font-bold text-xl">{formatCOP(total)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Columna derecha: Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                  placeholder="Ej: 3001234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de entrega</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                  placeholder="Calle, número, barrio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios adicionales</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                  placeholder="Cualquier detalle extra..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className={`w-full btn-primary ${submitting || items.length === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Enviando...' : 'Enviar pedido'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pedido;
