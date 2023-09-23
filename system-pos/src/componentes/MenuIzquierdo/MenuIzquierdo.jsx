import React from 'react';
import './MenuIzquierdo.css';
import { Line } from '../SVG/SVG';

function MenuIzquierdo({ pedidos, menuIzquierdo, eliminarPedido }) {
  const handleEliminarPedido = (index) => {
    eliminarPedido(index);
  };

  if (!menuIzquierdo) {
    return null;
  }

    return (
    <div>
      <div className='justificar-espacio-alrededor'>
      <h2 className='w50'>Pedidos:</h2>
      <h2 className='w50'>Sin:</h2>
      </div>
      
      {pedidos.map((pedido, index) => (
        <div key={index}>
          {pedido.map((pedido, subIndex) => (
            <div key={subIndex} className='justificar-espacio-alrededor'>
              <p className='w50'>{pedido.split(' sin: ').map(item => item.replace(' sin:', ''))[0]}</p>
              <p className='w50'>{pedido.split(' sin: ').map(item => item.replace(' sin:', ''))[1]}</p>
            </div>
          ))}
          <button onClick={() => handleEliminarPedido(index)}>Eliminar</button>
          <div>
            <Line />
          </div>
        </div>
          
      ))}
      <div className='espacio-blanco'></div>
    </div>
  );
}

export default MenuIzquierdo;
