// src/components/ApiTestsRow.jsx
import React from 'react';
import '../styles/ApiTestsRow.css';

function ApiTestsRow({ apiTests }) {
  const headers = [
    "ID del Test Case",
    "Endpoint",
    "Método",
    "Descripción",
    "Datos de Entrada",
    "Resultado Esperado",
    "Resultado Real",
    "Estado",
    "Comentarios"
  ];

  return (
    <div className="apitestsrow-container">
      <div className="apitestsrow-grid header">
        {headers.map((header, index) => (
          <div key={index} className="cell header-cell">
            {header}
          </div>
        ))}
      </div>
      {apiTests.map((test) => (
        <div key={test.id} className="apitestsrow-grid row">
          <div className="cell">{test.id}</div>
          <div className="cell">{test.endpoint}</div>
          <div className="cell">{test.method}</div>
          <div className="cell">{test.description}</div>
          <div className="cell">{test.datosEntrada}</div>
          <div className="cell">{test.resultadoEsperado}</div>
          <div className="cell">{test.resultadoReal}</div>
          <div className="cell">{test.estado}</div>
          <div className="cell">{test.comentarios}</div>
        </div>
      ))}
    </div>
  );
}

export default ApiTestsRow;
