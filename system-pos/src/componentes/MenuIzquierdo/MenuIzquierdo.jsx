import React, { useState, useEffect } from 'react';
import { obtenerPedidos } from '../Otros/Otros';
import { Reload } from '../SVG/SVG';
import './MenuIzquierdo.css';

function MenuIzquierdo() {
  const [pedidos, setPedidos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().split('T')[0]);
  const [hoveredPedido, setHoveredPedido] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      const result = await obtenerPedidos();
      setPedidos(result.pedidos);
    };
    fetchPedidos();
  }, []);

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString('en-CA');
    setFechaFiltro(formattedDate);
  }, []);  

  const handleFechaFiltroChange = (event) => setFechaFiltro(event.target.value);

  const handleMouseEnter = (pedidoId) => setHoveredPedido(pedidoId);
  const handleMouseLeave = () => setHoveredPedido(null);

  const filtrarPedidosPorFecha = () =>
    fechaFiltro ? pedidos.filter(({ fecha }) => fecha.startsWith(fechaFiltro)) : pedidos;

  const calcularValorTotal = () =>
    filtrarPedidosPorFecha().reduce((total, { valor_total }) => total + valor_total, 0);

  const recargarPedidos = async () => {
    const result = await obtenerPedidos();
    setPedidos(result.pedidos);
  };

  return (
    <div>
      <div className='justificar-espacio-alrededor'>
        <h2>Pedidos</h2>
        <input className='inputDate' type="date" id="fechaFiltro" value={fechaFiltro} onChange={handleFechaFiltroChange} />
        <button onClick={recargarPedidos}><Reload/></button>
      </div>
      <div className="valor-total">
        <h3>Total Ventas: ${Math.round(calcularValorTotal())}</h3>
      </div>
      {filtrarPedidosPorFecha().map(({ id, productos, valor_total, hora }) => (
        <div 
          key={id}
          className="pedido-container"
          onMouseEnter={() => handleMouseEnter(id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="productos">
            {productos.map(({ id, cantidad, nombre_producto }) => (
              <div key={id} className="producto">
                <span>{cantidad} {nombre_producto}</span>
              </div>
            ))}
          </div>
          {hoveredPedido === id && (
            <div className='justificar-extremo'>
              <span>${valor_total}</span>
              <span>{hora}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MenuIzquierdo;
