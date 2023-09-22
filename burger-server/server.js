const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3001;

  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'c-burger',
    password: 'cibax',
    port: 5432,
  });

  app.use(cors({
      origin: 'http://localhost:5173'
    }));
  pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
  });

  app.get('/productos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM public.productos');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos desde la base de datos' });
    }
  });


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
