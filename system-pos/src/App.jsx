import React, { useState } from 'react';

import MenuIzquierdo from './componentes/MenuIzquierdo/MenuIzquierdo';
import MenuCentral from './componentes/MenuCentral/MenuCentral';
import MenuDerecho from './componentes/MenuDerecho/MenuDerecho';
import './App.css';

function App() {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [panelDerecho, setPanelDerecho] = useState(false);

  const agregarProducto = (producto) => {
    const productoExistente = productosSeleccionados.find(
      (p) => p.nombre === producto.nombre
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
      setProductosSeleccionados([...productosSeleccionados]);
    } else {
      producto.cantidad = 1;
      setProductosSeleccionados([...productosSeleccionados, producto]);
    }
    setPanelDerecho(true);
  };
  const resetearProducto = () => {
    setProductosSeleccionados([]);
    setPanelDerecho(false)
  };


  const restarCantidad = (producto) => {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      setProductosSeleccionados([...productosSeleccionados]);
    } else {
      const nuevosProductos = productosSeleccionados.filter((p) => p !== producto);
      setProductosSeleccionados(nuevosProductos);
      if (nuevosProductos.length === 0) {
        setPanelDerecho(false);
      }
    }
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  }

  return (
    <div className="app">
      <div onDragStart={handleDragStart} className="left-sidebar">
        <MenuIzquierdo />
      </div>
      <div onDragStart={handleDragStart} className="main-content">
        <MenuCentral agregarProducto={agregarProducto} />
      </div>
      <div onDragStart={handleDragStart} className={`right-panel ${panelDerecho ? 'active' : ''}`}>
        <MenuDerecho productos={productosSeleccionados} restarCantidad={restarCantidad} resetearProducto={resetearProducto} panelDerecho={panelDerecho}/>
      </div>
    </div>
  );
}

export default App;

