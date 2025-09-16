import express from 'express'; // Server main...
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import db from './config/db.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Verificación DB
db.getConnection()
  .then(conn => {
    console.log('✅ Conexión establecida con MySQL');
    conn.release();
  })
  .catch(err => console.error('❌ Error conectando a MySQL:', err));

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});