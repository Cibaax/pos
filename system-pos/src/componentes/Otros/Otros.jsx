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
