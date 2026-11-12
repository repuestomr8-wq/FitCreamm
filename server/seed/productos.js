require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
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
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI no definida en .env');
    }
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    await Producto.deleteMany({});
    await Producto.insertMany(productos);
    console.log('Seed completado: 5 productos insertados en MongoDB Atlas (fitcream)');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando el seed:', error.message);
    process.exit(1);
  }
};

seed();
