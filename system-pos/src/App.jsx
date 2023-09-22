import React, { useState } from 'react';
import MenuIzquierdo from './componentes/MenuIzquierdo/MenuIzquierdo';
import MenuCentral from './componentes/MenuCentral/MenuCentral';
import MenuDerecho from './componentes/MenuDerecho/MenuDerecho';
import './App.css';

function App() {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [menuDerecho, setMenuDerecho] = useState(false);
  const [menuIzquierdo, setMenuIzquierdo] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const agregarProductos = (producto) => {
    const productoExistente = productosSeleccionados.find((p) => p.id === producto.id);
  
    if (productoExistente) {
      const nuevosProductos = productosSeleccionados.map((p) => {
        if (p.id === producto.id) {
          return {
            ...p,
            cantidad: p.cantidad + 1,
            opciones: [...p.opciones, ...producto.opciones],
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
  
    const eliminarPedido = (index) => {
      const copiaPedidos = [...pedidos];
      copiaPedidos.splice(index, 1);
      setPedidos(copiaPedidos);
      if (copiaPedidos.length === 0) {
        setMenuIzquierdo(false);
      }
    };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      <div onDragStart={handleDragStart} className={`menu-izquierdo ${menuIzquierdo ? 'activo' : ''}`}>
        <MenuIzquierdo pedidos={pedidos} menuIzquierdo={menuIzquierdo} eliminarPedido={eliminarPedido}/>
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

