const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Servicio = sequelize.define('Servicio', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  duracion_min: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 }
});

module.exports = Servicio;