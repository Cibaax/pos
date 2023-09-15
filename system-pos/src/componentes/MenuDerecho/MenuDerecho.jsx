import './MenuDerecho.css';
import React, { useRef } from 'react';
import { useReactToPrint} from 'react-to-print';
import { Line, Logo } from '../SVG/SVG';
function RightPanel({ productos, restarCantidad, resetearProducto, panelDerecho }) {
  const componentRef= useRef()

  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current,
  })

  const handlePrintAndReset = () => {
    handlePrint();
    resetearProducto();
  }; 

  const calcularSubtotal = (producto) => {
    const subtotal = producto.valor * producto.cantidad;
    return subtotal.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\s/g, ''); // Elimina los espacios en blanco
  };
  
  const total = productos.reduce((acc, producto) => {
    return acc + producto.valor * producto.cantidad;
  }, 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/\s/g, ''); // Elimina los espacios en blanco
  

  if (!panelDerecho) {
    return null;
  }

  return (
    <div ref={componentRef} style={{width: '100%'}} className="right-panel-content">
      <div className='images-container'>
       <Logo />  
      </div>
      <Line/>
      {productos.map((producto, index) => (
  <div key={index} className="producto-container">
    <div className="cantidad-container">
      <button className="print-only-button menos" onClick={() => restarCantidad(producto)} >- </button>
      <p className="producto-cantidad">{producto.cantidad}</p>
    </div>
    <div className="producto-info">
      <p className="producto-nombre">
        {producto.tipo.slice(0, -1)} {producto.nombre}
      </p>
    </div>
      <div  className="precio">{calcularSubtotal(producto)}</div>
  </div>
))}
      <Line/>
      <div className="producto-container">
        <div></div>
        <p className="producto-nombre">Total:</p>
        <div className="precio">{total}</div>
      </div>
      <Line/>
      <div className='images-container'>
        <img src="/qr.svg" alt="qr" className="svg-qr" />
      </div>
      <div className='images-container'>
      <button onClick={handlePrintAndReset} className="print-only-button active" >Imprimir</button>
      </div>
    </div>
  );
}


export default RightPanel;




