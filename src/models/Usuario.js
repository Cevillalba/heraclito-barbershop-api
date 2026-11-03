const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  rol: { 
    type: DataTypes.ENUM('CLIENTE', 'BARBERO', 'ADMINISTRADOR'), 
    defaultValue: 'CLIENTE' 
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

Usuario.prototype.validarPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Usuario;