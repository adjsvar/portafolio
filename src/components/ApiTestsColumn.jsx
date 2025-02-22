// src/components/ApiTestsColumn.jsx
import React, { useState } from 'react';
import '../styles/ApiTestsColumn.css';

function ApiTestsColumn({ apiTests }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTest = apiTests[currentIndex];

  // Formatear el ID (ej: API-TC-001)
  const formatId = (id) => `API-TC-${String(id).padStart(3, '0')}`;
  const headerText = `${formatId(currentTest.id)} - ${currentTest.description}`;

  // Campos a mostrar en detalle
  const fields = [
    { label: "Endpoint", value: currentTest.endpoint },
    { label: "Método", value: currentTest.method },
    { label: "Descripción", value: currentTest.description },
    { label: "Datos de Entrada", value: currentTest.datosEntrada },
    { label: "Resultado Esperado", value: currentTest.resultadoEsperado },
    { label: "Resultado Real", value: currentTest.resultadoReal },
    { label: "Estado", value: currentTest.estado },
    { label: "Comentarios", value: currentTest.comentarios }
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : apiTests.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < apiTests.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="apitestscolumn-container">
      <div className="apitestscolumn-grid-wrapper">
        {/* Fila de navegación con 3 columnas: flecha, header, flecha */}
        <div className="apitestscolumn-nav">
          <button onClick={handlePrev} className="nav-arrow">&#8592;</button>
          <div className="nav-header">{headerText}</div>
          <button onClick={handleNext} className="nav-arrow">&#8594;</button>
        </div>
        {/* Grid de detalles: 2 columnas, 35% para header y 65% para valor */}
        <div className="apitestscolumn-grid">
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <div className="grid-cell grid-label">{field.label}:</div>
              <div className="grid-cell grid-value">{field.value}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApiTestsColumn;
