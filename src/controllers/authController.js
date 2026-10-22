const pool = require('../config/database');
const bcrypt = require('bcrypt');

// Servicio de Registro
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios.' });
    }

    const userExists = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ status: 'error', message: 'El correo electrónico ya está registrado.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
      [nombre, email, hashedPassword]
    );

    res.status(201).json({
      status: 'success',
      message: 'Registro de usuario exitoso.',
      data: newUser.rows[0]
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor.' });
  }
};

// Servicio de Inicio de Sesión (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Debe ingresar email y contraseña.' });
    }

    const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Error en la autenticación: Credenciales inválidas.' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Error en la autenticación: Credenciales inválidas.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Autenticación satisfactoria. Bienvenido ' + user.nombre,
      userId: user.id
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor.' });
  }
};
