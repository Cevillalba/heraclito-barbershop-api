const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ exito: false, mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'BarberShopProSecureKey2026');
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ exito: false, mensaje: 'Token inválido o expirado.' });
  }
};