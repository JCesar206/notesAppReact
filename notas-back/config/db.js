import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
// Se obtienen de las variables de entorno...
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'notasdb',
});

export default db;