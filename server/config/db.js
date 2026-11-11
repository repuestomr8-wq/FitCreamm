const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('MONGODB_URI no definida en .env. Usando modo sin base de datos (mocks).');
      return;
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas conectado');
  } catch (error) {
    console.warn('No se pudo conectar a MongoDB Atlas:', error.message);
    console.warn('El servidor continuará usando productos en memoria (mock local).');
  }
};

module.exports = connectDB;
