const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Ruta de prueba
app.get('/', (req, res) => res.send('Servidor funcionando 🚀'));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));