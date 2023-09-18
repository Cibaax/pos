import React, { useState } from 'react';

import MenuIzquierdo from './componentes/MenuIzquierdo/MenuIzquierdo';
import MenuCentral from './componentes/MenuCentral/MenuCentral';
import MenuDerecho from './componentes/MenuDerecho/MenuDerecho';
import './App.css';

function App() {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [menuDerecho, setMenuDerecho] = useState(false);
  const [menuIzquierdo, setMenuIzquierdo] = useState(false);

  const agregarProducto = (producto) => {
    const productoIndex = productosSeleccionados.findIndex((p) => p.nombre === producto.nombre);
    if (productoIndex !== -1) {
      productosSeleccionados[productoIndex].cantidad += 1;
    } else {
      producto.cantidad = 1;
      productosSeleccionados.push(producto);
    }  
    setProductosSeleccionados([...productosSeleccionados]);
    setMenuDerecho(true);
  };
  
  const resetearProductos = () => {
    setProductosSeleccionados([]);
    setMenuDerecho(false);
  };
    
  const quitarProducto = (producto) => {
    console.log('1caso', producto)
    const productoIndex = productosSeleccionados.findIndex((p) => p === producto);  
    if (productoIndex !== -1) {
      if (producto.cantidad > 1) {
        productosSeleccionados[productoIndex].cantidad -= 1;
      } else {
        productosSeleccionados.splice(productoIndex, 1);
        if (productosSeleccionados.length === 0) {
          setMenuDerecho(false);
        }
      }
      setProductosSeleccionados([...productosSeleccionados]);
    }
  };  

  const handleDragStart = (e) => {
    e.preventDefault();
  }

  const agregarPedido = (pedido) => {
    const copiaPedidos = [...pedidos];
    // Agregar el nuevo pedido al final del array
    copiaPedidos.push(pedido);
    // Actualizar el estado con el nuevo array de pedidos
    setPedidos(copiaPedidos);
    setMenuIzquierdo(true)
    };

  return (
    <div className="app">
      <div onDragStart={handleDragStart} className={`menu-izquierdo ${menuIzquierdo ? 'activo' : ''}`}>
        <MenuIzquierdo pedido={pedidos}/>
      </div>
      <div onDragStart={handleDragStart} className="menu-central">
        <MenuCentral agregarProducto={agregarProducto}/>
      </div>
      <div onDragStart={handleDragStart} className={`menu-derecho ${menuDerecho ? 'activo' : ''}`}>
        <MenuDerecho productos={productosSeleccionados} quitarProducto={quitarProducto} resetearProductos={resetearProductos} menuDerecho={menuDerecho} agregarPedido={agregarPedido} />
      </div>
    </div>
  );
}

export default App;

