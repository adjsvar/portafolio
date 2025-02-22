// src/components/BugReportRow.jsx
import React from 'react';
import '../styles/BugReportRow.css';

function BugReportRow({ bugReports }) {
  return (
    <div className="bugreport-row-container">
      <table className="bugreport-row-table">
        <caption className="bugreport-row-caption">BUG REPORTS</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Pasos para Reproducir</th>
            <th>Resultado Esperado</th>
            <th>Resultado Actual</th>
            <th>Entorno/Configuración</th>
            <th>Severidad/Prioridad</th>
            <th>Adjuntos</th>
          </tr>
        </thead>
        <tbody>
          {bugReports.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.id}</td>
              <td>{bug.titulo}</td>
              <td>{bug.descripcion}</td>
              <td>{bug.pasos}</td>
              <td>{bug.resultadoEsperado}</td>
              <td>{bug.resultadoActual}</td>
              <td>{bug.entorno}</td>
              <td>{bug.severidadPrioridad}</td>
              <td>{bug.adjuntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BugReportRow;
