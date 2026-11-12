const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Acepta tanto MONGODB_URI como MONGO_URI por si acaso
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!uri) {
      throw new Error('No se encontró ninguna URI de MongoDB en el archivo .env');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    
    console.log('¡MongoDB Atlas conectado exitosamente (fitcream)! 🍦');
  } catch (error) {
    console.error('Error conectando a MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;