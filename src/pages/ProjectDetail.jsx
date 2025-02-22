// src/pages/ProjectDetail.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import projectsData from '../data/projects.json';
import TestCases from '../components/TestCases';
import BugReport from '../components/BugReport'; // Este componente internamente alterna entre BugReportRow y BugReportColumn
import ApiTests from '../components/ApiTests';     // Este componente internamente alterna entre ApiTestsRow y ApiTestsColumn
import '../styles/ProjectDetail.css';

function ProjectDetail(props) {
  const { summary } = props;
  let project = null;

  if (summary) {
    // Modo resumen: los datos vienen directamente de las props
    project = props;
  } else {
    // Modo detalle: usamos el id de la URL para buscar el proyecto
    const { id } = useParams();
    project = projectsData.find((p) => p.id.toString() === id);
  }

  if (!project) {
    return <div>Proyecto no encontrado.</div>;
  }

  // Modo resumen: muestra una tarjeta básica
  if (summary) {
    return (
      <div className="project-item">
        <img
          src={`https://picsum.photos/300/200?random=${project.id}`}
          alt={`Imagen del Proyecto ${project.title}`}
        />
        <div className="project-description">
          <h3>{project.title}</h3>
          <p>{project.briefDescription}</p>
          <Link to={`/projectdetail/${project.id}`}>Ver detalles</Link>
        </div>
      </div>
    );
  }

  // Modo detalle: se muestra la información completa del proyecto
  return (
    <div className="project-detail">
      <h2>{project.title}</h2>
      <p>{project.briefDescription}</p>

      {/* Casos de Prueba */}
      {project.testCases && project.testCases.length > 0 && (
        <div className="test-cases">
          <h3>Casos de Prueba</h3>
          <TestCases testCases={project.testCases} layout="row" />
        </div>
      )}

      {/* Bug Reports */}
      {project.bugReports && project.bugReports.length > 0 && (
        <div className="bug-reports">
          <h3>Bug Reports</h3>
          <BugReport bugReports={project.bugReports} />
        </div>
      )}

      {/* Pruebas API */}
      {project.apiTests && project.apiTests.length > 0 && (
        <div className="api-tests">
          <h3>Pruebas API</h3>
          <ApiTests apiTests={project.apiTests} />
        </div>
      )}

      {/* Pruebas de Rendimiento */}
      {project.performanceTests && project.performanceTests.length > 0 && (
        <div className="performance-tests">
          <h3>Pruebas de Rendimiento</h3>
          <table>
            <thead>
              <tr>
                <th>Métrica</th>
                <th>Valor</th>
                <th>Threshold</th>
              </tr>
            </thead>
            <tbody>
              {project.performanceTests.map((perf) => (
                <tr key={perf.id}>
                  <td>{perf.metric}</td>
                  <td>{perf.value}</td>
                  <td>{perf.threshold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/projects" className="btn" style={{ marginTop: '2rem', display: 'inline-block' }}>
        Volver a Proyectos
      </Link>
    </div>
  );
}

export default ProjectDetail;
