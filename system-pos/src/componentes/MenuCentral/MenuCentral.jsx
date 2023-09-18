import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuCentral.css';

function MenuCentral({ agregarProducto}) {
  const [productosActivos, setProductosActivos] = useState('hamburguesas');
  const [productos, setProductos] = useState([]);
  const [comidaSeleccionada, setComidaSeleccionada] = useState('Hamburguesas');
  const [pedido, setPedido] = useState([])

  const valorProducto = (producto) => {
    const subtotal = Number(producto.valor);
    return subtotal.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\s/g, '');
  };
  
  useEffect(() => {
    const obtenerProductos = async (comida) => {
      try {
        const respuesta = await axios.get(`http://localhost:3001/productos/${comida}`);
        setProductos(respuesta.data);
      } catch (error) {
        console.error(`Error al obtener los productos de ${comida.nombre}:`, error);
      }
    };
    obtenerProductos(productosActivos);
  }, [productosActivos]);

  const comidas = [
    { id: 'hamburguesas', nombre: 'Hamburguesas' },
    { id: 'papas', nombre: 'Papas' },
    { id: 'bebidas', nombre: 'Bebidas' },
  ];

  const cambiarProductosActivos = ({id, nombre}) => {
    setProductosActivos(id);
    setProductos([]);
    setComidaSeleccionada(nombre);
  };

  const seleccionarSubProducto = (producto) => agregarProducto({ ...producto, 'tipo': comidaSeleccionada });

  return (
    <div className="menu-central-contenedor">
      <div className="category-navigation">
        {comidas.map((comida) => (
          <button
            key={comida.id}
            className={comida.id === productosActivos ? 'activo' : ''}
            onClick={() => cambiarProductosActivos(comida)}
          >
            {comida.nombre}
          </button>
        ))}
      </div>
      <div className="options-list">
        {productos.map((producto, index) => (
          <div key={index} className="option-card">
            <div className="image-container">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="text-container">
              <h3>{producto.nombre}</h3>
              <p>{valorProducto(producto)}</p>
              <button className='activo' onClick={() => seleccionarSubProducto(producto)}>agregar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MenuCentral;
