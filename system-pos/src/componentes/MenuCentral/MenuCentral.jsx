import React, { useState } from 'react';
import './MenuCentral.css';
import { obtenerProductos, obtenerInventario } from '../Otros/Otros';

function MenuCentral({ agregarProductos }) {
  const { productos } = obtenerProductos();
  const { inventario } = obtenerInventario();

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Hamburguesas');
  const categorias = [...new Set(productos.map(producto => producto.categoria))];

  const agregarProducto = (producto) => {
    agregarProductos({
      ...producto,
    });
  };

  return (
    <div className="menu-central-contenedor">
      <div className="menu-navegacion">
        {categorias.map(categoria => (
          <button
            key={categoria}
            onClick={() => setCategoriaSeleccionada(categoria)}
            className={categoria === categoriaSeleccionada ? 'activo' : ''}
          >
            {categoria}
          </button>
        ))}
      </div>
      <div className="menu-seleccion">
        {productos
          .filter(producto => producto.categoria === categoriaSeleccionada)
          .map(producto => (
            <div key={producto.id} className={`menu-producto`}>
              <div className="image-container">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="text-container">
                <h3>{producto.nombre.slice(0, -1)}</h3>
                <p>${producto.valor}</p>
                <button
                  className="activo"
                  onClick={() => agregarProducto(producto)}
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MenuCentral;

