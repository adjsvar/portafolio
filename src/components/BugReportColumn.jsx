// src/components/BugReportColumn.jsx
import React, { useState } from 'react';
import '../styles/BugReportColumn.css';

function BugReportColumn({ bugReports }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBug = bugReports[currentIndex];

  // Función para formatear el ID: BR-001, etc.
  const formatId = (id) => `BR-${String(id).padStart(3, '0')}`;
  const headerText = `${formatId(currentBug.id)} - ${currentBug.titulo}`;

  const fields = [
    { label: "Descripción", value: currentBug.descripcion },
    { label: "Pasos para Reproducir", value: currentBug.pasos },
    { label: "Resultado Esperado", value: currentBug.resultadoEsperado },
    { label: "Resultado Actual", value: currentBug.resultadoActual },
    { label: "Entorno/Configuración", value: currentBug.entorno },
    { label: "Severidad/Prioridad", value: currentBug.severidadPrioridad },
    { label: "Adjuntos", value: currentBug.adjuntos }
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : bugReports.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < bugReports.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="bugreport-column-container">
      <div className="bugreport-grid-wrapper">
        {/* Fila de navegación: tres columnas */}
        <div className="bugreport-nav">
          <button onClick={handlePrev} className="nav-arrow">&#8592;</button>
          <div className="nav-header">{headerText}</div>
          <button onClick={handleNext} className="nav-arrow">&#8594;</button>
        </div>
        {/* Grid de detalle: 2 columnas, 35% para header y 65% para valor */}
        <div className="bugreport-grid">
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

export default BugReportColumn;
