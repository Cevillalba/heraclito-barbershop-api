const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cita = sequelize.define('Cita', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fecha_hora: { type: DataTypes.DATE, allowNull: false },
  precio_total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  estado: { 
    type: DataTypes.ENUM('CONFIRMADA', 'CANCELADA', 'FINALIZADA'), 
    defaultValue: 'CONFIRMADA' 
  }
});

module.exports = Cita;