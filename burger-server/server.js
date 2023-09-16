const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'containers-us-west-155.railway.app',
  database: 'railway',
  password: '2IRYZJHl4Ybbvmgae8I9',
  port: 7532,
});

app.use(cors({
    origin: 'http://localhost:5173'
  }));
pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

app.get('/productos/hamburguesas', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM hamburguesas');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las hamburguesas desde la base de datos:', error);
    res.status(500).json({ error: 'Error al obtener las hamburguesas desde la base de datos' });
  }
});

app.get('/productos/papas', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM papas');  
      res.json(result.rows);  
      client.release();
    } catch (error) {
      console.error('Error al obtener productos de papas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  app.get('/productos/bebidas', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM bebidas');  
      res.json(result.rows);  
      client.release();
    } catch (error) {
      console.error('Error al obtener productos de bebidas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
