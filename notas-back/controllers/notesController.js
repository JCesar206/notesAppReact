import db from '../config/db.js';

// Crear nota y guardarla en db...
export const createNote = async (req, res) => {
  try {
    const { title, content, category, favorite, completed } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Título y contenido requeridos' });
    }

    const [result] = await db.query(
      'INSERT INTO notes (title, content, category, favorite, completed, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, content, category, favorite || 0, completed || 0, userId]
    );

    res.status(201).json({ message: 'Nota creada', noteId: result.insertId });
  } catch (err) {
    console.error('Error al guardar nota:', err);
    res.status(500).json({ error: 'Error al guardar la nota' });
  }
};

// Obtener notas
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener notas:', err);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};

// Actualizar nota
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, favorite, completed } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      'UPDATE notes SET title=?, content=?, category=?, favorite=?, completed=? WHERE id=? AND user_id=?',
      [title, content, category, favorite, completed, id, userId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota no encontrada' });

    res.json({ message: 'Nota actualizada' });
  } catch (err) {
    console.error('Error al actualizar nota:', err);
    res.status(500).json({ error: 'Error al actualizar la nota' });
  }
};

// Eliminar nota
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [result] = await db.query('DELETE FROM notes WHERE id=? AND user_id=?', [id, userId]);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Nota no encontrada' });

    res.json({ message: 'Nota eliminada' });
  } catch (err) {
    console.error('Error al eliminar nota:', err);
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
};