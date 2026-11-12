require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();

  app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
  app.use(express.json());
  app.use('/img', express.static(path.join(__dirname, '../client/public/img')));

  app.use('/api/productos', require('./routes/productos'));
  app.use('/api/pedidos', require('./routes/pedidos'));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'fitcream-server' });
  });

  app.listen(PORT, () => {
    console.log(`FitCream server escuchando en puerto ${PORT}`);
  });
};

start().catch((error) => {
  console.error('Error iniciando el servidor:', error.message);
  process.exit(1);
});
