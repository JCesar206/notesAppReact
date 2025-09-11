const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notas_app'
});

db.connect(err => {
    if(err) console.error('Error conectando a DB:', err);
    else console.log('✅ Conexión a la DB exitosa');
});

module.exports = db;
