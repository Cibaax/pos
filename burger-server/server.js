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
  const moment = require('moment-timezone');

  app.post('/pedidos', async (req, res) => {
      try {
          const { valor_total, productos } = req.body;
  
          // Obtener la fecha y hora actual en Colombia
          const fechaActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
  
          // Insertar el pedido en la tabla 'pedidos' con la fecha actual
          const { rows: pedidoRows } = await pool.query('INSERT INTO public.pedidos (valor_total, fecha) VALUES ($1, $2) RETURNING id;', [valor_total, fechaActual]);
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


app.get('/pedidos', async (req, res) => {
  try {
      const query = `
      SELECT
      p.id AS pedido_id,
      p.valor_total,
      to_char(p.fecha, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS fecha,
      pp.nombre_producto,
      pp.cantidad,
      pp.valor_unitario,
      pp.valor_total_producto,
      pp.descripcion
    FROM
      public.pedidos p
    INNER JOIN
      public.pedidos_productos pp ON p.id = pp.pedido_id
      `;
      const result = await pool.query(query);
      // Agrupar los productos por pedido
      const pedidos = {};
      result.rows.forEach(row => {
          const pedidoId = row.pedido_id;
          if (!pedidos[pedidoId]) {
              pedidos[pedidoId] = {
                  id: pedidoId,
                  valor_total: row.valor_total,
                  fecha: new Date(row.fecha).toISOString(), // Convertir la fecha a formato ISO 8601
                  productos: []
              };
          }
          pedidos[pedidoId].productos.push({
              nombre_producto: row.nombre_producto,
              cantidad: row.cantidad,
              valor_unitario: row.valor_unitario,
              valor_total_producto: row.valor_total_producto,
              descripcion: row.descripcion
          });
      });
      res.json(Object.values(pedidos));
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error al obtener los pedidos desde la base de datos' });
  }
});
