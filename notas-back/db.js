const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'notasdb',
  port: process.env.DB_PORT || 3306
});

// Test de conexión
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar a la DB:', err.message);
    return;
  }
  console.log('✅ Conexión a MySQL exitosa');
  connection.release();
});

module.exports = db;