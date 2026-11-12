const mongoose = require('mongoose');

const itemPedidoSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true, min: 1 },
  precioUnitarioCOP: { type: Number, required: true, min: 0 },
});

const pedidoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    direccion: { type: String, required: true, trim: true },
    items: [itemPedidoSchema],
    totalCOP: { type: Number, required: true, min: 0 },
    metodoPago: {
      type: String,
      enum: ['efectivo', 'tarjeta', 'transferencia'],
      default: 'efectivo',
    },
    montoEfectivo: { type: Number, min: 0 },
    estado: {
      type: String,
      enum: ['pendiente', 'confirmado', 'enviado', 'cancelado'],
      default: 'pendiente',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pedido', pedidoSchema);
