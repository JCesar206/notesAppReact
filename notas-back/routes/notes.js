const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear nota
router.post('/', (req, res) => {
    const { title, content, category, favorite, completed } = req.body;
    db.query(
        'INSERT INTO notes (title, content, category, favorite, completed) VALUES (?, ?, ?, ?, ?)',
        [title, content, category || '', favorite || false, completed || false],
        (err, result) => {
            if(err) return res.status(500).json(err);
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

// Listar notas con filtros
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM notes WHERE 1=1';
    const params = [];
    const { title, category, keyword, favorite, completed } = req.query;

    if(title) { sql += ' AND title LIKE ?'; params.push(`%${title}%`); }
    if(category) { sql += ' AND category LIKE ?'; params.push(`%${category}%`); }
    if(keyword) { sql += ' AND content LIKE ?'; params.push(`%${keyword}%`); }
    if(favorite) { sql += ' AND favorite = ?'; params.push(favorite === 'true'); }
    if(completed) { sql += ' AND completed = ?'; params.push(completed === 'true'); }

    db.query(sql, params, (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
});

// Editar nota
router.put('/:id', (req, res) => {
  const { title, content, category, favorite, completed } = req.body;
  db.query(
    'UPDATE notes SET title=?, content=?, category=?, favorite=?, completed=? WHERE id=?',
    [title, content, category || '', favorite, completed, req.params.id],
    (err) => {
    if(err) return res.status(500).json(err);
    res.json({ message: 'Nota actualizada' });
    }
    );
});

// Eliminar nota
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM notes WHERE id=?', [req.params.id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({ message: 'Nota eliminada' });
    });
});

module.exports = router;
