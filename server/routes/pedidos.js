const express = require('express');
const Pedido = require('../models/Pedido');

const router = express.Router();

const PEDIDOS_MOCK = [];

router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, direccion, items, totalCOP } = req.body;

    if (!nombre || !email || !telefono || !direccion || !items || items.length === 0) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const pedido = {
      _id: 'mock-' + Date.now(),
      nombre,
      email,
      telefono,
      direccion,
      items,
      totalCOP,
      estado: 'pendiente',
      creadoEn: new Date(),
    };

    // Intentar guardar en MongoDB si está disponible
    try {
      const saved = await Pedido.create(pedido);
      res.status(201).json(saved);
    } catch (dbError) {
      PEDIDOS_MOCK.push(pedido);
      res.status(201).json(pedido);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creando pedido' });
  }
});

router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ creadoEn: -1 });
    res.json(pedidos);
  } catch (error) {
    res.json(PEDIDOS_MOCK);
  }
});

module.exports = router;
