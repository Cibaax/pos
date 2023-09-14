import React, { useState } from 'react';
import './MainContent.css'; // Importa el archivo CSS

function MainContent({ onSubProductSelect }) {
  // Definir el estado para rastrear la categoría activa y el subproducto seleccionado
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSubProduct, setSelectedSubProduct] = useState(null);

  // Datos de ejemplo para las categorías y opciones (puedes reemplazarlos con tus propios datos)
  const categories = [
    { id: 0, name: 'Hamburguesas' },
    { id: 1, name: 'Papas' },
    { id: 2, name: 'Bebidas' },
  ];

  const optionsByCategory = [
    // Opciones para la categoría "Hamburguesas"
    [
      { id: 0, name: 'Hamburguesa 1', image: 'url_de_la_imagen1' },
      { id: 1, name: 'Hamburguesa 2', image: 'url_de_la_imagen2' },
      { id: 2, name: 'Hamburguesa 3', image: 'url_de_la_imagen3' },
      // Agrega la URL de la imagen correspondiente para cada opción
    ],
    // Opciones para la categoría "Papas"
    [
      { id: 0, name: 'Papas 1', image: 'url_de_la_imagen4' },
      { id: 1, name: 'Papas 2', image: 'url_de_la_imagen5' },
      { id: 2, name: 'Papas 3', image: 'url_de_la_imagen6' },
      // Agrega la URL de la imagen correspondiente para cada opción
    ],
    // Opciones para la categoría "Bebidas"
    [
      { id: 0, name: 'Bebida 1', image: 'url_de_la_imagen7' },
      { id: 1, name: 'Bebida 2', image: 'url_de_la_imagen8' },
      { id: 2, name: 'Bebida 3', image: 'url_de_la_imagen9' },
      // Agrega la URL de la imagen correspondiente para cada opción
    ],
  ];

  // Función para cambiar la categoría activa
  const changeActiveCategory = (index) => {
    setActiveCategory(index);
    setSelectedSubProduct(null); // Reiniciar el subproducto seleccionado al cambiar de categoría
  };

  // Función para seleccionar un subproducto
  const selectSubProduct = (subProduct) => {
    setSelectedSubProduct(subProduct);
    onSubProductSelect(subProduct); // También actualiza el estado en App.js
  };

  return (
    <div className="main-content">
      <div className="category-navigation">
        {/* Barra de navegación de categorías */}
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={index === activeCategory ? 'active' : ''}
            onClick={() => changeActiveCategory(index)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="options-list">
        {/* Lista de opciones de la categoría activa como tarjetas con imágenes */}
        {optionsByCategory[activeCategory].map((option) => (
          <div
            key={option.id}
            className={`option-card`}
            onClick={() => selectSubProduct(option)}
          >
            <img src={option.image} alt={option.name} />
            <h3>{option.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainContent;
