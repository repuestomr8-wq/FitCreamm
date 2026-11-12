const express = require('express');
const Pedido = require('../models/Pedido');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, direccion, items, totalCOP, metodoPago, montoEfectivo } = req.body;

    if (!nombre || !email || !telefono || !direccion || !items || items.length === 0) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const pedido = new Pedido({
      nombre,
      email,
      telefono,
      direccion,
      items,
      totalCOP,
      metodoPago: metodoPago || 'efectivo',
      montoEfectivo,
      estado: 'pendiente',
    });

    const saved = await pedido.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creando pedido:', error.message);
    res.status(500).json({ error: 'Error creando pedido' });
  }
});

router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    console.error('Error obteniendo pedidos:', error.message);
    res.status(500).json({ error: 'Error obteniendo pedidos' });
  }
});

module.exports = router;
