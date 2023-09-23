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

  app.use(express.json());


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

  app.post('/pedidos', async (req, res) => {
    try {
      const { cantidad, categoria, nombre, valor } = req.body;
      const { rows } = await pool.query('INSERT INTO public.pedidos (cantidad, categoria, nombre, valor, fecha) VALUES ($1, $2, $3, $4, NOW()) RETURNING id;', [cantidad, categoria, nombre, valor]);
      res.status(201).json({ message: 'Pedido creado', id: rows[0].id });
    } catch (e) {
      console.error('Error:', e);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  
  
  
  
  


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
