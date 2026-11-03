const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ exito: false, mensaje: 'El correo ya está registrado.' });
    }
    const nuevoUsuario = await Usuario.create({ nombre, email, password, rol });
    return res.status(201).json({ exito: true, mensaje: 'Usuario creado exitosamente', datos: { id: nuevoUsuario.id, email: nuevoUsuario.email } });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error interno en el servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await usuario.validarPassword(password))) {
      return res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas.' });
    }
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET || 'BarberShopProSecureKey2026',
      { expiresIn: '8h' }
    );
    return res.status(200).json({ exito: true, token });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error al iniciar sesión.' });
  }
};