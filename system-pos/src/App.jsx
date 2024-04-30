import React, { useState, useEffect } from 'react';
import MenuIzquierdo from './componentes/MenuIzquierdo/MenuIzquierdo';
import MenuCentral from './componentes/MenuCentral/MenuCentral';
import MenuDerecho from './componentes/MenuDerecho/MenuDerecho';
import './App.css';

function App() {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [menuDerecho, setMenuDerecho] = useState(false);
  const [menuIzquierdo, setMenuIzquierdo] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  
  useEffect(() => {
    // Aquí puedes realizar una solicitud a tu servidor para obtener la lista de pedidos
    fetch('http://localhost:3001/pedidos')
      .then(response => response.json())
      .then(data => setPedidos(data))
      .catch(error => console.error('Error al obtener pedidos:', error));
  }, []);

  const agregarProductos = (producto) => {
    const productoExistente = productosSeleccionados.find((p) => p.id === producto.id);
  
    if (productoExistente) {
      const nuevosProductos = productosSeleccionados.map((p) => {
        if (p.id === producto.id) {
          return {
            ...p,
            cantidad: p.cantidad + 1,
          };
        }
        return p;
      });
      setProductosSeleccionados(nuevosProductos);
    } else {
      const nuevoProducto = {
        ...producto,
        cantidad: 1,
      };
      setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
    }
  
    setMenuDerecho(true);
  };  

  const quitarProducto = (producto) => {
    const nuevosProductos = productosSeleccionados.map((p) => {
      if (p.id === producto) {
        return p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : null;
      }
      return p;
    }).filter(Boolean);
  
    setProductosSeleccionados(nuevosProductos);
    setMenuDerecho(nuevosProductos.length > 0);
  };  

  const resetearProductos = () => {
    setProductosSeleccionados([]);
    setMenuDerecho(false);
  };

  

  const agregarPedido = (pedido) => {
    const copiaPedidos = [...pedidos];
    copiaPedidos.push(pedido);
    setPedidos(copiaPedidos);
    setMenuIzquierdo(true)
    };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <div onDragStart={handleDragStart} className={`menu-izquierdo ${menuIzquierdo ? 'activo' : ''}`}>
      <MenuIzquierdo menuIzquierdo={menuIzquierdo} pedidos={pedidos} />
      </div>
      <div onDragStart={handleDragStart} className="menu-central">
        <MenuCentral agregarProductos={agregarProductos} />
      </div>
      <div onDragStart={handleDragStart} className={`menu-derecho ${menuDerecho ? 'activo' : ''}`}>
        <MenuDerecho productosSeleccionados={productosSeleccionados} quitarProducto={quitarProducto} resetearProductos={resetearProductos} menuDerecho={menuDerecho} agregarPedido={agregarPedido}/>
      </div>
    </div>
  );
}

export default App;

