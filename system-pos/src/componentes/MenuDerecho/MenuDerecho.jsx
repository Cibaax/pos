import './MenuDerecho.css';
import React, { useRef } from 'react';
import { useReactToPrint} from 'react-to-print';
import { Line, Logo } from '../SVG/SVG';
function RightPanel({ productos, restarCantidad }) {

  const componentRef= useRef()
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current,
  })

  const calcularSubtotal = (producto) => {
    const subtotal = producto.valor * producto.cantidad;
    return subtotal.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const total = productos.reduce((acc, producto) => {
    return acc + producto.valor * producto.cantidad;
  }, 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div ref={componentRef} style={{width: '100%'}} className="right-panel-content">
      <div className='images-container'>
       <Logo className="svg-logo"/>  
      </div>
      <Line/>
      {productos.map((producto, index) => (
        <div key={index} className="producto-container">
          <button onClick={() => restarCantidad(producto)} className="print-only-button">-</button>
          <p className="producto-nombre">
            {producto.cantidad}•{producto.nombre}
          </p>
          <div className="precio">{calcularSubtotal(producto)}</div>
        </div>
      ))}
      <Line/>
      <div className="producto-container">
        <p className="producto-nombre">Total:</p>
        <div className="precio">{total}</div>
      </div>
      <Line/>
      <div className='images-container'>
        <img src="/qr.svg" alt="qr" className="svg-qr" />
      </div>
      <button onClick={handlePrint} className="print-only-button" >Print</button>
    </div>
  );
}


export default RightPanel;




