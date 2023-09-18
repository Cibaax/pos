// LeftSidebar.js
import React from 'react';

function MenuIzquierdo({pedido}) {
  return (
    <div className="left-sidebar">
      {pedido.map((pedido, index) => (
      <div key={index} className="contenedor-producto">
        <div className="justificar-centro">
          <p className="t16">{pedido.cantidad}</p>
        </div>
        <div>
          <p>
          {pedido.tipo.slice(0, -1)} {pedido.nombre}
          </p>
        </div>
      </div>
      ))}
    </div>
  );
}

export default MenuIzquierdo;
