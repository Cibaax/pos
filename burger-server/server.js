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
      const { valor_total, fecha, productos } = req.body;
  
      // Insertar el pedido en la tabla 'pedidos'
      const { rows: pedidoRows } = await pool.query('INSERT INTO public.pedidos (valor_total, fecha) VALUES ($1, $2) RETURNING id;', [valor_total, fecha]);
      const pedidoId = pedidoRows[0].id;
  
      // Insertar los productos asociados al pedido en la tabla 'pedidos_productos'
      for (const producto of productos) {
        const { nombre_producto, cantidad, valor_unitario, valor_total_producto, descripcion } = producto;
        await pool.query('INSERT INTO public.pedidos_productos (pedido_id, nombre_producto, cantidad, valor_unitario, valor_total_producto, descripcion) VALUES ($1, $2, $3, $4, $5, $6);', [pedidoId, nombre_producto, cantidad, valor_unitario, valor_total_producto, descripcion]);
      }
  
      res.status(201).json({ message: 'Pedido creado', id: pedidoId });
    } catch (e) {
      console.error('Error:', e);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
