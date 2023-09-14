import React, { useState } from 'react';
import LeftSideBar from './components/LeftSideBar/LeftSideBar';
import MainContent from './components/MainContent/MainContent';
import RightPanel from './components/RightPanel/RightPanel';

function App() {
  const [selectedSubProducts, setSelectedSubProducts] = useState([]);

  const handleSubProductSelect = (subProduct) => {
    setSelectedSubProducts((prevSelectedSubProducts) => [...prevSelectedSubProducts, subProduct]);
  };

  return (
    <div className="app">
      <LeftSideBar selectedSubProducts={selectedSubProducts} />
      <MainContent onSubProductSelect={handleSubProductSelect} />
      <RightPanel selectedSubProducts={selectedSubProducts} />
    </div>
  );
}


export default App
