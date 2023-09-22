import React, { useRef, useState } from 'react';
import { useReactToPrint} from 'react-to-print';
import { Line, Logo, Qr } from '../SVG/SVG';
import './MenuDerecho.css';
import { calcularSubtotal, total } from '../Otros/Otros';

function MenuDerecho({ productosSeleccionados, quitarProducto, resetearProductos, menuDerecho, agregarPedido}) {

  
  const referenciarComponente= useRef()

  const fecha = new Date().toLocaleDateString('es-CO');
  const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const imprimir = useReactToPrint({
    content: ()=>referenciarComponente.current,
  })

  const imprimirResetarProducto = () => {
     
    const pedidos = productosSeleccionados.map(producto => (`${producto.cantidad} ${producto.cantidad > 1 ? producto.categoria : producto.categoria.slice(0, -1)} ${producto.categoria === "Bebidas" ? producto.nombre : producto.cantidad > 1 ? producto.nombre : producto.nombre.slice(0, -1)} ${producto.opciones.length ? 'sin: ' : ''}${producto.opciones.join(' ')}`
    ));
    agregarPedido(pedidos);
    imprimir();
    resetearProductos();
  };
  

  if (!menuDerecho) {
    return null;
  } 

  return (
    <div ref={referenciarComponente} className="menu-derecho-contenedor">
      <div className='justificar-centro'>
        <button onClick={resetearProductos} className='no-imprimir menos p0'>x</button>
      </div>
      <div className="justificar-extremo f16">
        <p>{fecha}</p>
        <p>{hora}</p>
      </div>
      <div className='justificar-centro'>
       <Logo/>  
      </div>
      <Line/>
      {productosSeleccionados.map((producto, index) => (
      <div key={index} className={`contenedor-producto ${producto.opciones.length > 0 ? 'producto-con-opciones' : ''}`}>
        <div className="justificar-centro">
          <button className="no-imprimir p0 menos noHover" onClick={() => quitarProducto(producto.id)} >- </button>
          <p className="t16">{producto.cantidad}</p>
        </div>
        <div className='contenedor-productos-seleccionados'>
          <p>
            {producto.cantidad > 1 ? producto.categoria : producto.categoria.slice(0, -1)} {producto.categoria === "Bebidas" ? producto.nombre : producto.cantidad > 1 ? producto.nombre : producto.nombre.slice(0, -1)}
          </p>
          <p className="p-small">{producto.opciones.length > 0 ? `Sin: ${producto.opciones.join(' ')}` : null}</p>
        </div>
        <div className="precio">{calcularSubtotal(producto)}</div>          
      </div>
      ))}
      <Line/>
      <div className="contenedor-producto">
        <div></div>
        <p>Total:</p>
        <div>{total({ productosSeleccionados })}</div>
      </div>      
      <Line/>
      <div className='justificar-centro'>
        <Qr/>
      </div>
      <div className="espacio-blanco"></div>
      <Line/>
      <div className='justificar-centro'>        
        <button onClick={imprimirResetarProducto} className="no-imprimir activo">Imprimir</button>
      </div>
    </div>
  );
}

export default MenuDerecho;





