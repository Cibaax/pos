import React, { useRef, useState } from 'react';
import { useReactToPrint} from 'react-to-print';
import { Line, Logo, Whatsapp, Address} from '../SVG/SVG';
import './MenuDerecho.css';
import { calcularSubtotal, total } from '../Otros/Otros';

function MenuDerecho({ productosSeleccionados, quitarProducto, resetearProductos, menuDerecho}) {
  
  const referenciarComponente= useRef()
  const fecha = new Date().toLocaleDateString('es-CO');
  const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const imprimir = useReactToPrint({
    content: ()=>referenciarComponente.current,
  })

  const imprimirResetarProducto = async () => {
    const pedido = {
      valor_total: total({productosSeleccionados}).slice(1).replace(/\./g, ""),
      fecha: new Date().toISOString(),
      productos: productosSeleccionados.map(producto => ({
        nombre_producto: producto.nombre,
        cantidad: producto.cantidad,
        valor_unitario: producto.valor,
        valor_total_producto: calcularSubtotal(producto).slice(1).replace(/\./g, ""),
        descripcion: producto.descripcion
      }))
    };
    try {
      const response = await fetch('http://localhost:3001/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedido)
      });
  
      if (response.status === 201) {
        const data = await response.json();
        console.log('Pedido creado con ID:', data.id);  
        imprimir();
        resetearProductos();
  
      } else {
        console.error('Error en la solicitud al servidor:', response.status);
      }
    } catch (error) {
      console.error('Error interno del cliente:', error);
    }
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
      <div key={index} className={`contenedor-producto`}>
        <div className="justificar-centro">
          <button className="no-imprimir p0 menos noHover" onClick={() => quitarProducto(producto.id)} >- </button>
          <p className="t16">{producto.cantidad}</p>
        </div>
        <div className='contenedor-productos-seleccionados'>
          <p>
            {producto.cantidad > 1 ? producto.categoria : producto.categoria.slice(0, -1)} {producto.categoria === "Bebidas" ? producto.nombre : producto.cantidad > 1 ? producto.nombre : producto.nombre.slice(0, -1)}
          </p>
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
      <Whatsapp/> 3233113227
      </div>
      <div className='justificar-centro'>
      <Address/> Manzana B Casa 5 Quito Lopez III
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





