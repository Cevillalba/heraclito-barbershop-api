const app = require('./src/app');
const { sequelize } = require('./src/models');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos sincronizada correctamente.');
  app.listen(PORT, () => {
    console.log(`Servidor BarberShop PRO ejecutándose en puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});