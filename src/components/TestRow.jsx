// src/components/TestRow.jsx
import React from 'react';
import '../styles/TestRow.css';

function TestRow({ testCases }) {
  const headers = [
    "ID",
    "Title",
    "Description",
    "Preconditions",
    "Steps",
    "Expected",
    "Actual",
    "Status",
    "Severity",
    "Priority"
  ];

  const gridItems = [];

  // Fila de título (caption) que abarca las 10 columnas
  gridItems.push(
    <div key="caption" className="cell caption">
      TEST CASES
    </div>
  );

  // Fila de encabezado: 10 celdas
  headers.forEach((header, index) => {
    gridItems.push(
      <div key={`header-${index}`} className="cell header-cell">
        {header}
      </div>
    );
  });

  // Para cada test case, agregamos 10 celdas (una fila completa)
  testCases.forEach((tc, rowIndex) => {
    gridItems.push(
      <div key={`cell-${rowIndex}-0`} className="cell">{tc.id}</div>,
      <div key={`cell-${rowIndex}-1`} className="cell">{tc.title}</div>,
      <div key={`cell-${rowIndex}-2`} className="cell">{tc.description}</div>,
      <div key={`cell-${rowIndex}-3`} className="cell">{tc.preconditions}</div>,
      <div key={`cell-${rowIndex}-4`} className="cell">{tc.steps}</div>,
      <div key={`cell-${rowIndex}-5`} className="cell">{tc.expectedResult}</div>,
      <div key={`cell-${rowIndex}-6`} className="cell">{tc.actualResult}</div>,
      <div key={`cell-${rowIndex}-7`} className="cell">{tc.status}</div>,
      <div key={`cell-${rowIndex}-8`} className="cell">{tc.severity}</div>,
      <div key={`cell-${rowIndex}-9`} className="cell">{tc.priority}</div>
    );
  });

  return (
    <div className="testrow-grid">
      {gridItems}
    </div>
  );
}

export default TestRow;
