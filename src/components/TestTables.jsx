// src/components/TestTables.jsx
import React, { useState, useEffect } from 'react';
import '../styles/TestTables.css';

function TestTables({ tests, testType, layout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper para renderizar el valor o un '-' si está vacío.
  const renderCell = (value) =>
    value === undefined || value === null || value === '' ? '-' : value;

  // Determinar layout: por prop o según ancho de ventana.
  const computedLayout = layout || (windowWidth >= 1150 ? 'row' : 'column');

  if (!tests || tests.length === 0) {
    return <div>No hay pruebas disponibles.</div>;
  }

  // Calcular la unión de todas las claves presentes en los tests.
  const baseKeys = Object.keys(tests[0]);
  const additionalKeys = tests.reduce((acc, test) => {
    Object.keys(test).forEach((key) => {
      if (!baseKeys.includes(key) && !acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);
  const allKeys = [...baseKeys, ...additionalKeys];

  // Asignación de caption según el tipo de prueba.
  let captionText = '';
  if (testType === 'testCases') {
    captionText = 'TEST CASES';
  } else if (testType === 'apiTests') {
    captionText = 'API TESTS';
  } else if (testType === 'performanceTests') {
    captionText = 'PERFORMANCE TESTS';
  } else if (testType === 'bugReports') {
    captionText = 'BUG REPORTS';
  } else {
    captionText = 'TESTS';
  }

  if (computedLayout === 'row') {
    // Layout "row": tabla completa con encabezado (título en una fila estilo header)
    return (
      <div className="testtables-row-container">
        <table className="test-table">
          <thead>
            <tr className="table-caption-row">
              <th colSpan={allKeys.length} className="table-caption-cell">
                {captionText}
              </th>
            </tr>
            <tr>
              {allKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tests.map((test, rowIndex) => (
              <tr key={rowIndex}>
                {allKeys.map((key) => (
                  <td key={key}>{renderCell(test[key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    // Layout "column": se muestra una prueba a la vez con navegación.
    const currentTest = tests[currentIndex];
    const singleItem = tests.length === 1;

    return (
      <div className="testtables-column-container">
        <div className={`testtables-column-nav ${singleItem ? 'single-item' : ''}`}>
          {!singleItem && (
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : tests.length - 1))
              }
              className="nav-arrow left"
            ></button>
          )}
          <div className="nav-headers">
            <div className="nav-caption">{captionText}</div>
            <div className="nav-id">{renderCell(currentTest.id)}</div>
          </div>
          {!singleItem && (
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev < tests.length - 1 ? prev + 1 : 0))
              }
              className="nav-arrow right"
            ></button>
          )}
        </div>
        <div className="testtables-column-grid">
          {allKeys.map((key) => (
            <div key={key} className="testtables-column-row">
              <div className="grid-label">{key}:</div>
              <div className="grid-value">{renderCell(currentTest[key])}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TestTables;
