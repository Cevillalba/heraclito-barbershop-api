const express = require('express');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Heráclito Barbershop - SENA ADSO' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
