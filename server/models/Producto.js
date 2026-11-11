const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    precioCOP: { type: Number, required: true, min: 0 },
    proteinasG: { type: Number, required: true, min: 0 },
    calorias: { type: Number, required: true, min: 0 },
    imagen: { type: String, required: true, trim: true },
    sabor: {
      type: String,
      enum: ['chocolate', 'vainilla', 'fresa', 'mani', 'cafe'],
      required: true,
    },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);
