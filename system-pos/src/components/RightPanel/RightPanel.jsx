import React from 'react';

function RightPanel({ selectedSubProducts }) {
  // Crear un objeto para rastrear la cantidad de subproductos por tipo
  const subProductCount = {};

  // Rellenar el objeto con la cantidad de subproductos
  selectedSubProducts.forEach((subProduct) => {
    const { name } = subProduct;
    if (subProductCount[name]) {
      subProductCount[name]++;
    } else {
      subProductCount[name] = 1;
    }
  });

  return (
    <div className="right-panel">
      <h2>Subproductos Seleccionados</h2>
      <ul>
        {Object.entries(subProductCount).map(([name, count]) => (
          <li key={name}>
            {count > 1 ? `${name} (x${count})` : name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RightPanel;
