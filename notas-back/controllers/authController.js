import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Registro de usuario...
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [userExists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed]);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Error en register:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(400).json({ error: 'Credenciales inválidas' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error en el login' });
  }
};

// ✅ Resetear password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password=? WHERE email=?', [hashed, email]);

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error('Error en resetPassword:', err);
    res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
};