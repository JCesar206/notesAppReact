// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// Registro
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });

  const hashed = bcrypt.hashSync(password, 8);

  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashed],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.json({ message: 'Usuario registrado correctamente', id: result.insertId });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan datos' });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error en la consulta' });
    if (rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email } });
  });
});

// Reset password
router.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) return res.status(400).json({ error: 'Faltan datos' });

  const hashed = bcrypt.hashSync(newPassword, 8);
  db.query('UPDATE users SET password = ? WHERE email = ?', [hashed, email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error en la consulta' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ message: 'Contraseña actualizada correctamente' });
  });
});

module.exports = router;