const express = require('express');
const Producto = require('../models/Producto');

const router = express.Router();

const PRODUCTOS_MOCK = [
  {
    _id: 'mock-chocolate',
    nombre: 'Chocolate Proteico',
    descripcion: 'Helado artesanal de chocolate con alto contenido de proteína y bajo en azúcar. Ideal para después de entrenar.',
    precioCOP: 9500,
    proteinasG: 15,
    calorias: 120,
    imagen: '/img/producto-chocolate.jpg',
    sabor: 'chocolate',
    activo: true,
  },
  {
    _id: 'mock-vainilla',
    nombre: 'Vainilla Fit',
    descripcion: 'Helado artesanal de vainilla, bajo en calorías y rico en proteína. Sabor clásico y saludable.',
    precioCOP: 9000,
    proteinasG: 14,
    calorias: 110,
    imagen: '/img/producto-vainilla.jpg',
    sabor: 'vainilla',
    activo: true,
  },
  {
    _id: 'mock-fresa',
    nombre: 'Fresa Light',
    descripcion: 'Helado artesanal de fresa, la opción más ligera con solo 105 kcal por porción.',
    precioCOP: 9000,
    proteinasG: 13,
    calorias: 105,
    imagen: '/img/producto-fresa.jpg',
    sabor: 'fresa',
    activo: true,
  },
  {
    _id: 'mock-mani',
    nombre: 'Mantequilla de Maní Proteica',
    descripcion: 'Helado artesanal de maní con la mayor cantidad de proteína: 18 g por cada 100 g.',
    precioCOP: 10500,
    proteinasG: 18,
    calorias: 140,
    imagen: '/img/producto-mani.jpg',
    sabor: 'mani',
    activo: true,
  },
  {
    _id: 'mock-cafe',
    nombre: 'Café Proteico',
    descripcion: 'Helado artesanal de café con proteína, perfecto para un impulso de energía.',
    precioCOP: 9500,
    proteinasG: 15,
    calorias: 115,
    imagen: '/img/producto-cafe.jpg',
    sabor: 'cafe',
    activo: true,
  },
];

router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true }).sort({ sabor: 1 });
    res.json(productos);
  } catch (error) {
    console.warn('MongoDB no disponible, devolviendo productos mock:', error.message);
    res.json(PRODUCTOS_MOCK);
  }
});

module.exports = router;
