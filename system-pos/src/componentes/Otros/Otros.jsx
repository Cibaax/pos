import { useEffect, useState } from 'react';
import axios from 'axios';

const formatoMoneda = {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

const formatearMoneda = (valor) => Number(valor).toLocaleString('es-CO', formatoMoneda).replace(/\s/g, '');

export const valorProducto = (producto) => formatearMoneda(producto.valor);

export const calcularSubtotal = ({ valor, cantidad }) => formatearMoneda(valor * cantidad);

export const total = ({ productosSeleccionados }) => formatearMoneda(productosSeleccionados.reduce((acc, producto) => acc + producto.valor * producto.cantidad, 0));

export function obtenerProductos() {
  const [productos, setProductos] = useState([]);  
  useEffect(() => {
    axios.get('http://localhost:3001/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error al obtener los productos:', error));
  }, []);  
  return { productos };
}

export function obtenerInventario() {
  const [inventario, setInventario] = useState([]);  
  useEffect(() => {
    axios.get('http://localhost:3001/inventario')
      .then(response => setInventario(response.data))
      .catch(error => console.error('Error al obtener el inventario:', error));
  }, []);  
  return { inventario };
}

export async function obtenerPedidos() {
  try {
    const response = await axios.get('http://localhost:3001/pedidos');
    const result = response.data;
    const pedidos = {};
    result.forEach(row => {
      const pedidoId = row.pedido_id;
      if (!pedidos[pedidoId]) {
        const fecha = new Date(row.fecha_pedido).toISOString();
        pedidos[pedidoId] = {
          id: pedidoId,
          valor_total: parseFloat(row.valor_total),
          fecha: fecha,
          hora: row.hora_pedido,
          productos: []
        };
      }
      pedidos[pedidoId].productos.push({
        nombre_producto: row.nombre_producto,
        cantidad: row.cantidad,
        valor_unitario: parseFloat(row.valor_unitario),
        valor_total_producto: parseFloat(row.valor_total_producto),
        descripcion: row.descripcion
      });
    });

    return { pedidos: Object.values(pedidos) };
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    return { pedidos: [] };
  }
}
