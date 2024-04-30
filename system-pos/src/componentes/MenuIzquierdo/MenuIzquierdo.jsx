import React, { useState } from 'react';

function MenuIzquierdo({ menuIzquierdo, pedidos }) {
  console.log(pedidos)
  const [pedidoExpandido, setPedidoExpandido] = useState(null);

  const togglePedido = (pedidoId) => {
    if (pedidoExpandido === pedidoId) {
      setPedidoExpandido(null);
    } else {
      setPedidoExpandido(pedidoId);
    }
  };

  if (!menuIzquierdo || pedidos.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            <span>
  {pedido.id} - {pedido.valor_total} - 
  {new Date(
    new Date(pedido.fecha).getTime() + new Date(pedido.fecha).getTimezoneOffset() * 60000
  ).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  })}
  
  <button onClick={() => togglePedido(pedido.id)}>
    {pedidoExpandido === pedido.id ? '-' : '+'}
  </button>
</span>

            {pedidoExpandido === pedido.id && (
              <ul>
                {pedido.productos.map(producto => (
                  <li key={producto.nombre_producto}>
                    <div>Producto: {producto.nombre_producto}</div>
                    <div>Cantidad: {producto.cantidad}</div>
                    <div>Valor Unitario: {producto.valor_unitario}</div>
                    <div>Valor Total Producto: {producto.valor_total_producto}</div>
                    <div>Descripción: {producto.descripcion}</div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuIzquierdo;

