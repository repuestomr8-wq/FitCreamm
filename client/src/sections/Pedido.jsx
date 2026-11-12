import { useState } from 'react';
import { useCart } from '../context/CartContext';
import SEO from '../components/ui/SEO';
import { api } from '../services/api';

const METODOS_PAGO = [
  {
    id: 'efectivo',
    nombre: 'Efectivo contra entrega',
    descripcion: 'Paga en efectivo al recibir tu pedido',
    icono: '💵',
  },
  {
    id: 'tarjeta',
    nombre: 'Tarjeta de Crédito / Débito',
    descripcion: 'Pago con tarjeta (prototipo)',
    icono: '💳',
  },
  {
    id: 'transferencia',
    nombre: 'Transferencia / Nequi / Daviplata',
    descripcion: 'Pago por transferencia bancaria o billetera digital',
    icono: '📱',
  },
];

const Pedido = () => {
  const { items, total, addItem, removeItem, toggleQuantity, setQuantity, checkout } = useCart();

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

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState({});

  const [pagoModalOpen, setPagoModalOpen] = useState(false);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [montoEfectivo, setMontoEfectivo] = useState('');
  const [pagoErrors, setPagoErrors] = useState({});

  const [confirmado, setConfirmado] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validarFormulario = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Correo inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validarPago = () => {
    const newErrors = {};
    if (metodoPago === 'efectivo' && !montoEfectivo) {
      newErrors.montoEfectivo = 'Indica con cuánto vas a pagar';
    }
    setPagoErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calcularCambio = () => {
    const monto = parseFloat(montoEfectivo);
    if (isNaN(monto) || monto < total) return null;
    return monto - total;
  };

  const formatCOP = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleMetodoPagoChange = (metodo) => {
    setMetodoPago(metodo);
    setPagoErrors({});
  };

  const handleEnviarPedido = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    if (items.length === 0) {
      setErrors({ general: 'Agrega al menos un producto al carrito antes de hacer el pedido.' });
      return;
    }
    setPagoModalOpen(true);
    setMetodoPago('efectivo');
    setMontoEfectivo('');
    setPagoErrors({});
  };

  const handleConfirmarPago = async (e) => {
    e.preventDefault();
    if (!validarPago()) return;

    setSubmitting(true);

    // Mapear asegurando que tenga _id o id como productoId
    const pedidoItems = items.map((item) => ({
      productoId: item._id || item.id,
      nombre: item.nombre,
      cantidad: item.cantidad,
      precioUnitarioCOP: item.precio,
    }));

    const montoEfectivoValor =
      metodoPago === 'efectivo' ? (parseFloat(montoEfectivo) || 0) : undefined;

    try {
      await api.crearPedido({
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        mensaje: formData.mensaje.trim(),
        items: pedidoItems,
        totalCOP: total,
        metodoPago,
        montoEfectivo: montoEfectivoValor,
      });

      setPagoModalOpen(false);
      setConfirmado(true);
      checkout();
    } catch (err) {
      setPagoErrors({ general: err.message || 'Error al enviar el pedido. Intenta de nuevo.' });
      setSubmitting(false);
    }
  };

  const handleCerrarPagoModal = () => {
    setPagoModalOpen(false);
    setPagoErrors({});
    setMontoEfectivo('');
    setMetodoPago('efectivo');
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
        description="Completa el formulario y pide tus helados proteicos FitCream. Entregas en Cali, Valle del Cauca. Pago contra entrega."
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
                      key={item.id || item._id}
                      className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-fitcream-50 rounded-xl border border-fitcream-100"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img
                          src={item.imagen || '/img/producto-chocolate.jpg'}
                          alt={item.nombre}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                            {item.nombre}
                          </h4>
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
                            onClick={() => decrementQuantity(item.id || item._id)}
                            className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                            title="Disminuir"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.cantidad}
                            onChange={(e) => setItemQuantity(item.id || item._id, e.target.value)}
                            className="w-12 text-center text-xs font-bold text-gray-800 focus:outline-none bg-transparent py-1"
                          />
                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.id || item._id)}
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

            {/* Columna derecha: Formulario de datos */}
            <form onSubmit={handleEnviarPedido} className="space-y-4">
              {errors.general && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {errors.general}
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
                  minLength={3}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none ${
                    errors.nombre ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none ${
                    errors.email ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ejemplo@correo.com"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none ${
                    errors.telefono ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: 3001234567"
                />
                {errors.telefono && <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de entrega</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none ${
                    errors.direccion ? 'border-red-500 ring-2 ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Calle, número, barrio"
                />
                {errors.direccion && <p className="text-red-600 text-xs mt-1">{errors.direccion}</p>}
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

      {/* Modal de Pago */}
      {pagoModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCerrarPagoModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Método de pago"
        >
          <div
            className="relative z-10 w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 bg-white/90 backdrop-blur-md shadow-2xl flex flex-col"
          >
            <div className="p-6 bg-fitcream-50 border-b border-fitcream-100 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-fitcream-700">Método de pago</h2>
              <button
                onClick={handleCerrarPagoModal}
                className="w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Cerrar método de pago"
              >
                ✕
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {pagoErrors.general && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {pagoErrors.general}
                </div>
              )}

              {/* Resumen del total */}
              <div className="mb-6 p-4 rounded-xl bg-fitcream-100 border border-fitcream-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 text-sm">Total a pagar</span>
                  <span className="font-bold text-fitcream-600">{formatCOP(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Método seleccionado</span>
                  <span className="font-medium">{METODOS_PAGO.find((m) => m.id === metodoPago)?.nombre}</span>
                </div>
              </div>

              {/* Seleccionar método de pago */}
              <h3 className="font-bold text-lg text-fitcream-700 mb-4">Selecciona cómo pagar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {METODOS_PAGO.map((metodo) => {
                  const estaSeleccionado = metodoPago === metodo.id;
                  return (
                    <button
                      key={metodo.id}
                      type="button"
                      onClick={() => handleMetodoPagoChange(metodo.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        estaSeleccionado
                          ? 'border-fitcream-500 bg-fitcream-50 text-fitcream-700 font-bold shadow-sm'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-fitcream-200 hover:bg-fitcream-25'
                      }`}
                    >
                      <div className="text-2xl mb-1">{metodo.icono}</div>
                      <div className="text-sm font-semibold">{metodo.nombre}</div>
                      <div className="text-xs text-gray-500">{metodo.descripcion}</div>
                    </button>
                  );
                })}
              </div>

              {/* Campos condicionales */}
              {metodoPago === 'efectivo' && (
                <div className="bg-white p-4 rounded-lg border border-fitcream-100 mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Con qué billete vas a pagar?
                  </label>
                  <input
                    type="number"
                    name="montoEfectivo"
                    value={montoEfectivo}
                    onChange={(e) => setMontoEfectivo(e.target.value)}
                    placeholder="Ej: 20000"
                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                  />
                  {pagoErrors.montoEfectivo && (
                    <p className="text-red-600 text-xs mt-1">{pagoErrors.montoEfectivo}</p>
                  )}
                  {montoEfectivo && (
                    <div className={`mt-2 p-2 rounded-lg ${
                      calcularCambio() !== null && calcularCambio() >= 0
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    }`}>
                      {calcularCambio() !== null && calcularCambio() >= 0 ? (
                        <>
                          Cambio estimado: <span className="font-bold">{formatCOP(calcularCambio())}</span>
                        </>
                      ) : (
                        <>
                          Falta: <span className="font-bold">{formatCOP(total - parseFloat(montoEfectivo))}</span> para completar el pago
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {metodoPago === 'tarjeta' && (
                <div className="bg-white p-4 rounded-lg border border-fitcream-100 mb-6">
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">
                    Prototipo de pago con tarjeta (no procesable)
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                      <input
                        type="text"
                        maxLength="19"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
                        <input
                          type="text"
                          maxLength="5"
                          placeholder="MM/AA"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                        <input
                          type="text"
                          maxLength="3"
                          placeholder="123"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitcream-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {metodoPago === 'transferencia' && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                  <p className="text-sm text-blue-700">
                    <span className="font-bold">📱 Transferencia / Nequi / Daviplata</span><br />
                    Las instrucciones y el QR de pago se enviarán por WhatsApp o correo registrado.
                  </p>
                </div>
              )}

              {/* Botones de acción del modal */}
              <div className="mt-6 pt-4 border-t border-fitcream-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCerrarPagoModal}
                  className="w-full sm:w-auto btn-ghost flex items-center justify-center"
                >
                  Volver al formulario
                </button>
                <button
                  onClick={handleConfirmarPago}
                  disabled={submitting}
                  className={`w-full sm:w-auto btn-primary flex items-center justify-center ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {submitting ? 'Procesando...' : 'Confirmar y Finalizar Pedido'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pedido;