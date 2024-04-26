// SeleccionadorIngredientes.js

import React, { useState } from 'react';

function Ingredientes() {
  const [cantidad, setCantidad] = useState(1);
  const [tipoProducto, setTipoProducto] = useState('');
  const [ingredientesNoDeseados, setIngredientesNoDeseados] = useState([]);

  // Funciones para manejar los cambios en los selectores

  return (
    <div className="seleccionador-ingredientes">
      <h2>Selecciona tus ingredientes</h2>
      <div>
        <label>Cantidad:</label>
        <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
      </div>
      <div>
        <label>Tipo de producto:</label>
        <select value={tipoProducto} onChange={(e) => setTipoProducto(e.target.value)}>
          <option value="">Selecciona...</option>
          {/* Aquí puedes agregar opciones para el tipo de producto */}
        </select>
      </div>
      <div>
        <label>Ingredientes que no debe llevar:</label>
        {/* Aquí puedes agregar checkboxes o cualquier otro método para seleccionar los ingredientes */}
      </div>
    </div>
  );
}

export default Ingredientes;
