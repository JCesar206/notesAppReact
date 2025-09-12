// routes/notes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Token requerido' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token mal formado' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Crear nota
router.post('/', authMiddleware, (req, res) => {
  const { title, content = '', category = '', favorite = false, completed = false } = req.body;
  const userId = req.user?.id;
  if (!title || !userId) return res.status(400).json({ error: 'Faltan datos obligatorios' });

  db.query(
    'INSERT INTO notes (title, content, category, favorite, completed, user_id) VALUES (?, ?, ?, ?, ?, ?)',
    [title, content, category, Boolean(favorite), Boolean(completed), userId],
    (err, result) => {
      if (err) {
        console.error('Error al crear nota:', err);
        return res.status(500).json({ error: 'Error al crear nota' });
      }
      res.json({ message: 'Nota creada correctamente', id: result.insertId });
    }
  );
});

// Obtener notas del usuario
router.get('/', authMiddleware, (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(400).json({ error: 'Usuario no válido' });

  db.query('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) {
      console.error('Error al obtener notas:', err);
      return res.status(500).json({ error: 'Error al obtener notas' });
    }
    res.json(rows);
  });
});

// Buscar notas
router.get('/search', authMiddleware, (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(400).json({ error: 'Usuario no válido' });

  const { title, category, favorite, completed } = req.query;
  let query = 'SELECT * FROM notes WHERE user_id = ?';
  const values = [userId];

  if (title) { query += ' AND title LIKE ?'; values.push(`%${title}%`); }
  if (category) { query += ' AND category = ?'; values.push(category); }
  if (favorite !== undefined) { query += ' AND favorite = ?'; values.push(favorite === 'true'); }
  if (completed !== undefined) { query += ' AND completed = ?'; values.push(completed === 'true'); }

  db.query(query, values, (err, rows) => {
    if (err) {
      console.error('Error en búsqueda de notas:', err);
      return res.status(500).json({ error: 'Error en búsqueda' });
    }
    res.json(rows);
  });
});

// Actualizar nota
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const { title, content = '', category = '', favorite = false, completed = false } = req.body;

  if (!id || !userId || !title) return res.status(400).json({ error: 'Faltan datos obligatorios' });

  db.query(
    'UPDATE notes SET title=?, content=?, category=?, favorite=?, completed=? WHERE id=? AND user_id=?',
    [title, content, category, Boolean(favorite), Boolean(completed), id, userId],
    (err, result) => {
      if (err) { console.error('Error al actualizar nota:', err); return res.status(500).json({ error: 'Error al actualizar nota' }); }
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota no encontrada' });
      res.json({ message: 'Nota actualizada correctamente' });
    }
  );
});

// Eliminar nota
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!id || !userId) return res.status(400).json({ error: 'Faltan datos obligatorios' });

  db.query('DELETE FROM notes WHERE id=? AND user_id=?', [id, userId], (err, result) => {
    if (err) { console.error('Error al eliminar nota:', err); return res.status(500).json({ error: 'Error al eliminar nota' }); }
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota no encontrada' });
    res.json({ message: 'Nota eliminada correctamente' });
  });
});

module.exports = router;