const jwt = require('jsonwebtoken');  // Validar autorizaciones
const db = require('../db');
const secret = process.env.JWT_SECRET || 'secret_dev';

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload; // { id, email, iat, ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
