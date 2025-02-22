// src/components/TestColumn.jsx
import React, { useState } from 'react';
import '../styles/TestColumn.css';

function TestColumn({ testCases }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestCase = testCases[currentIndex];

  // Función para formatear el ID: TC-001, etc.
  const formatId = (id) => `TC-${String(id).padStart(3, '0')}`;

  // Encabezado que muestra el ID formateado y el título del test
  const headerText = `${formatId(currentTestCase.id)} - ${currentTestCase.title}`;

  // Campos a mostrar (excluimos ID y Title, ya que se muestran en el encabezado)
  const fields = [
    { label: "Description", value: currentTestCase.description },
    { label: "Preconditions", value: currentTestCase.preconditions },
    { label: "Steps", value: currentTestCase.steps },
    { label: "Expected", value: currentTestCase.expectedResult },
    { label: "Actual", value: currentTestCase.actualResult },
    { label: "Status", value: currentTestCase.status },
    { label: "Severity", value: currentTestCase.severity },
    { label: "Priority", value: currentTestCase.priority }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testCases.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testCases.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="testcolumn-container">
      <div className="testcolumn-grid-wrapper">
        {/* Fila de título superior: muestra "Test Cases" */}
        <div className="testcolumn-title">
          TEST CASES
        </div>
        {/* Fila de navegación: 3 columnas: flecha izquierda, encabezado, flecha derecha */}
        <div className="testcolumn-nav">
          <button onClick={handlePrev} className="nav-arrow">&#8592;</button>
          <div className="nav-header">{headerText}</div>
          <button onClick={handleNext} className="nav-arrow">&#8594;</button>
        </div>
        {/* Grid para los detalles del test case */}
        <div className="testcolumn-grid">
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <div className="grid-cell grid-label">{field.label}:</div>
              <div
                className={`grid-cell grid-value ${
                  field.label === "Status"
                    ? field.value.toLowerCase() === "pass"
                      ? "status-pass"
                      : field.value.toLowerCase() === "fail"
                      ? "status-fail"
                      : field.value.toLowerCase() === "warning"
                      ? "status-warning"
                      : ""
                    : ""
                }`}
              >
                {field.value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestColumn;
