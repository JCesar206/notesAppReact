import express from 'express'; // Autorizar acceso a la app y notas...
import { register, login, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);

export default router;