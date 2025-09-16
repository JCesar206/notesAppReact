import express from 'express'; // Acceso a las notas del usuario...
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/notesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;