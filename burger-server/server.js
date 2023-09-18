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

  app.post('/crear-pedido', async (req, res) => {
    try {
      const { sencilla,doble, valor, fecha, cocacola } = req.body; // Asegúrate de ajustar esto a la estructura de tu pedido.
      
      const client = await pool.connect();
      const result = await client.query('INSERT INTO pedidos (sencilla, doble, valor, fecha, cocacola) VALUES ($1, $2, $3, $4, $5)', [sencilla, doble, valor, fecha, cocacola]);
      client.release();
  
      res.status(201).json({ message: 'Pedido creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
