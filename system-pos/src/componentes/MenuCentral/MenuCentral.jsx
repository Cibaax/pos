import React, { useState } from 'react';
import './MenuCentral.css';
import { valorProducto, obtenerProductos } from '../Otros/Otros';

function MenuCentral({ agregarProductos }) {
  const { productos } = obtenerProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Hamburguesas');
  const [ingredientesProducto, setIngredientesProducto] = useState({});
  const categorias = [...new Set(productos.map(producto => producto.categoria))];
  const [ingredientes, setIngredientes] = useState({});

  const mostrarIngredientes = (productoId) => {
    setIngredientes(prevProductos => ({
      ...prevProductos,
      [productoId]: !prevProductos[productoId]
    }));
  };

  const seleccionarIngrediente = (productoId, opcion) => {
    setIngredientesProducto(prevIngredientes => ({
      ...prevIngredientes,
      [productoId]: prevIngredientes[productoId]
        ? prevIngredientes[productoId].includes(opcion)
          ? prevIngredientes[productoId].filter(item => item !== opcion)
          : [...prevIngredientes[productoId], opcion]
        : [opcion],
    }));
  };


  const agregarProducto = (producto) => {
    const ingredientesSeleccionados = ingredientesProducto[producto.id] || [];
    
    if (ingredientesSeleccionados.length > 0) {
      const ultimoIngrediente = ingredientesSeleccionados[ingredientesSeleccionados.length - 1];
      ingredientesSeleccionados[ingredientesSeleccionados.length - 1] = ultimoIngrediente + ' •';
    }
  
    agregarProductos({
      ...producto,
      opciones: ingredientesSeleccionados,
    });
  
    setIngredientesProducto(prevIngredientes => ({
      ...prevIngredientes,
      [producto.id]: [],
    }));
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
            <div key={producto.id} className={`menu-producto ${ingredientes[producto.id] ? 'mostrar-ingredientes' : ''}`}>
              <div className="image-container">
                <img src={producto.imagen} alt={producto.nombre} />
              </div>
              <div className="text-container">
                <h3>{producto.categoria === 'Bebidas' ? producto.nombre : producto.nombre.slice(0, -1)}</h3>
                <p>{valorProducto(producto)}</p>
                <button
                  className="activo"
                  onClick={() => agregarProducto(producto)}
                >
                  Agregar
                </button>
              </div>
              <div className='justificar-centro '>
                {categoriaSeleccionada === 'Hamburguesas' && (
                  <button className='menos noHover'
                    onClick={() => mostrarIngredientes(producto.id)}
                  >
                    {ingredientes[producto.id] ? '<' : '>'}
                  </button>
                )}
              </div>
              {categoriaSeleccionada === 'Hamburguesas' && ingredientes[producto.id] && (
                <div className={`opciones-container mostrar`}>
                  {['Sals', 'Lech', 'Toma', 'Cebo', 'Ques', 'Toci'].map(opcion => (
                    <div key={opcion} className='justificar-inicio'>
                      <input
                        className="checkbox-input"
                        type="checkbox"
                        value={opcion}
                        checked={(ingredientesProducto[producto.id] || []).includes(opcion)}
                        onChange={() => seleccionarIngrediente(producto.id, opcion)}
                      />
                      {opcion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default MenuCentral;

