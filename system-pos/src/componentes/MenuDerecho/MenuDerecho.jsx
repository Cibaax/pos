import React, { useRef } from 'react';
import { useReactToPrint} from 'react-to-print';
import { Line, Logo, Qr } from '../SVG/SVG';
import './MenuDerecho.css';

function MenuDerecho({ productos, quitarProducto, resetearProductos, menuDerecho }) {

  const referenciarComponente= useRef()
  const fecha = new Date().toLocaleDateString('es-CO');
  const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const imprimir = useReactToPrint({
    content: ()=>referenciarComponente.current,
  })

  const imprimirResetarProducto = () => {
    imprimir();
    resetearProductos();
  }; 

  const formatoMoneda = {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  
  const calcularSubtotal = ({ valor, cantidad }) => {
    const subtotal = valor * cantidad;
    return subtotal.toLocaleString('es-CO', formatoMoneda).replace(/\s/g, '');
  };
  
  
  const total = productos.reduce((acc, producto) => {
    return acc + producto.valor * producto.cantidad;
  }, 0).toLocaleString('es-CO', formatoMoneda).replace(/\s/g, '');

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
       <Logo />  
      </div>
      <Line/>
      {productos.map((producto, index) => (
      <div key={index} className="contenedor-producto">
        <div className="justificar-centro">
          <button className="no-imprimir p0 menos" onClick={() => quitarProducto(producto)} >- </button>
          <p className="t16">{producto.cantidad}</p>
        </div>
        <div>
          <p>
          {producto.tipo.slice(0, -1)} {producto.nombre}
          </p>
        </div>
        <div className="precio">{calcularSubtotal(producto)}</div>
      </div>
      ))}
      <Line/>
      <div className="contenedor-producto">
        <div></div>
        <p>Total:</p>
        <div>{total}</div>
      </div>
      <Line/>
      <div className='justificar-centro'>
        <Qr/>
      </div>
      <div className="espacio-blanco"></div>
      <Line/>
      <div className='justificar-centro'>        
        <button onClick={imprimirResetarProducto} className="no-imprimir activo" >Imprimir</button>
      </div>
    </div>
  );
}

export default MenuDerecho;




