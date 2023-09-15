import React, { useState, useEffect } from 'react';
import './MenuCentral.css';
import axios from 'axios';

function MainContent({ agregarProducto }) {
  const [productosActivos, setProductosActivos] = useState('hamburguesas');
  const [productos, setProductos] = useState([]);
  const [comidaSeleccionada, setComidaSeleccionada] = useState('Hamburguesas');


  useEffect(() => {
    const obtenerProductos = async (comida) => {
      try {
        const respuesta = await axios.get(`http://localhost:3001/productos/${comida}`);
        setProductos(respuesta.data);
      } catch (error) {
        console.error(`Error al obtener los productos de ${comida.name}:`, error);
      }
    };

    obtenerProductos(productosActivos);
  }, [productosActivos]);

  const comidas = [
    { id: 'hamburguesas', name: 'Hamburguesas' },
    { id: 'papas', name: 'Papas' },
    { id: 'bebidas', name: 'Bebidas' },
  ];

  const cambiarProductosActivos = (comida) => {
    setProductosActivos(comida.id);
    setProductos([]);
    setComidaSeleccionada(comida.name);
  };

  const seleccionarSubProducto = (producto) => {
    const productoConComidaSeleccionada ={...producto, 'tipo': comidaSeleccionada }
    agregarProducto(productoConComidaSeleccionada);
  };

  return (
    <div className="main-content">
      <div className="category-navigation">
        {comidas.map((comida) => (
          <button
            key={comida.id}
            className={comida.id === productosActivos ? 'active' : ''}
            onClick={() => cambiarProductosActivos(comida)}
          >
            {comida.name}
          </button>
        ))}
      </div>
      <div className="options-list">
        {productos.map((producto, index) => (
          <div
            key={index}
            className={`option-card`}
            onClick={() => seleccionarSubProducto(producto)}
          >
          <h3>{producto.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MainContent;
