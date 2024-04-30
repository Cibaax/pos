import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Line, Logo, Whatsapp, Address } from '../SVG/SVG';
import './MenuDerecho.css';
import { calcularSubtotal, total } from '../Otros/Otros';
import Ingredientes from '../Ingredientes/Ingredientes';


function MenuDerecho({ productosSeleccionados, quitarProducto, resetearProductos, menuDerecho }) {
  const referenciarComponente = useRef();
  const fecha = new Date().toLocaleDateString('es-CO').replace(/\//g, '-');
  const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  const [llevar, setLlevar] = useState(true);
  const [servirse, setServirse] = useState(false);
  const imprimir = useReactToPrint({
    content: () => referenciarComponente.current,
  });

  const imprimirResetarProducto = async () => {
    const pedido = {
      valor_total: total({ productosSeleccionados }).slice(1).replace(/\./g, ""),
      productos: productosSeleccionados.map(producto => ({
        nombre_producto: (producto.cantidad > 1 ? producto.categoria : producto.categoria.slice(0, -1)) + ' ' + (producto.cantidad > 1 ? producto.nombre : producto.nombre.slice(0, -1)),
        cantidad: producto.cantidad,
        valor_unitario: producto.valor,
        valor_total_producto: calcularSubtotal(producto).slice(1).replace(/\./g, ""),
        descripcion: producto.descripcion
      }))
    };
    console.log(pedido)
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
        setLlevar(true);
        setServirse(false);
        resetearProductos();

      } else {
        console.error('Error en la solicitud al servidor:', response.status);
      }
    } catch (error) {
      console.error('Error interno del cliente:', error);
    }
  };

  const handleLlevarChange = () => {
    setLlevar(true);
    setServirse(false);
  };

  const handleServirseChange = () => {
    setLlevar(false);
    setServirse(true);
  };

  if (!menuDerecho) {
    return null;
  }

  return (  
    <div ref={referenciarComponente} className="menu-derecho-contenedor">
      <div className='justificar-centro'>
      <button onClick={() => { resetearProductos(); setLlevar(true); setServirse(false); }} className='no-imprimir menos p0'>x</button>
      </div>
      <div className="justificar-extremo f16">
        <p>{fecha}</p>
        <p>{hora}</p>
      </div>
      <div className='justificar-centro'>
        <Logo />
        <div className='contenedor-info'>
          <span className='span m10'><Whatsapp /> 3233113227</span>
          <span className='span'><Address /> Manzana B Casa 5</span>
          <span className='span'>         Quito Lopez III</span>
        </div>
      </div>
      <Line />
      {productosSeleccionados.map((producto, index) => (
        <div key={index} className={`contenedor-producto`}>
          <div className="justificar-centro">
            <button className="no-imprimir p0 menos noHover" onClick={() => quitarProducto(producto.id)}>-</button>
            <p className="t16">{producto.cantidad}</p>
          </div>
          <div className='contenedor-productos-seleccionados'>
            <p>
            {producto.cantidad > 1 ? producto.categoria : producto.categoria.slice(0, -1)} {producto.cantidad > 1 ? producto.nombre : producto.nombre.slice(0, -1)}            </p>
          </div>
          <div className="precio">{calcularSubtotal(producto)}</div>
        </div>
      ))}
      <Line />
      <div className="contenedor-producto">
        <div></div>
        <p>Total:</p>
        <div>{total({ productosSeleccionados })}</div>
      </div>
      <Line />
      <div className='justificar-centro'>
        <label>
          <span className={llevar ? '' : 'no-imprimir'}>
            Llevar
          </span>
          <input
            type="radio"
            value="llevar"
            checked={llevar}
            onChange={handleLlevarChange}
            className="input-oculto"
          />
        </label>
        <label>
          <span className={servirse ? '' : 'no-imprimir'}>
            Servirse
          </span>
          <input
            type="radio"
            value="servirse"
            checked={servirse}
            onChange={handleServirseChange}
            className="input-oculto"
          />
        </label>
      </div>
      {/* <div className="espacio-blanco"></div> */}
      <Line />
      <div className='justificar-centro'>
        <button onClick={imprimirResetarProducto} className="no-imprimir activo">Imprimir</button>
      </div>
      <div className='no-imprimir'>
        <Ingredientes />
      </div>
    </div>
  );
}

export default MenuDerecho;
