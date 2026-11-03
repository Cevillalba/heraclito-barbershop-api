const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Servicio = require('./Servicio');
const Cita = require('./Cita');

Usuario.hasMany(Cita, { foreignKey: 'cliente_id', as: 'citasCliente' });
Usuario.hasMany(Cita, { foreignKey: 'barbero_id', as: 'citasBarbero' });
Cita.belongsTo(Usuario, { foreignKey: 'cliente_id', as: 'cliente' });
Cita.belongsTo(Usuario, { foreignKey: 'barbero_id', as: 'barbero' });

Servicio.hasMany(Cita, { foreignKey: 'servicio_id' });
Cita.belongsTo(Servicio, { foreignKey: 'servicio_id', as: 'servicio' });

module.exports = { sequelize, Usuario, Servicio, Cita };