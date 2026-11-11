require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('../models/Producto');

const productos = [
  {
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

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Producto.deleteMany({});
    await Producto.insertMany(productos);
    console.log('Seed completado: 5 productos insertados');
    process.exit(0);
  } catch (error) {
    console.warn('No se pudo conectar a MongoDB Atlas para el seed:', error.message);
    console.warn('Continuando con productos en memoria (mock local). La aplicación funcionará con el fallback de la API.');
    process.exit(0);
  }
};

seed();
