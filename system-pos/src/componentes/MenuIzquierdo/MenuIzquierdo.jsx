// LeftSidebar.js
import React from 'react';

function MenuIzquierdo({pedido}) {
  return (
    <div className="menu-izquierdo-contenedor">
      {pedido.map((pedido, index) => (
          <div key={index} className='prueba'>
            <p >{pedido}</p>
          </div>
        ))}
      </div>
  );
}

export default MenuIzquierdo;
