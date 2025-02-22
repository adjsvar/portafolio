// src/pages/ProjectDetail.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import projectsData from '../data/projects.json';
import TestTables from '../components/TestTables'; // Componente unificado para tests
import '../styles/ProjectDetail.css';

function ProjectDetail(props) {
  const { summary } = props;
  let project = null;

  if (summary) {
    // Modo resumen: los datos vienen de las props directamente
    project = props;
  } else {
    // Modo detalle: obtenemos el id desde la URL y buscamos en el JSON
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
          <TestTables tests={project.testCases} testType="testCases" />
        </div>
      )}

      {/* Bug Reports */}
      {project.bugReports && project.bugReports.length > 0 && (
        <div className="bug-reports">
          <TestTables tests={project.bugReports} testType="bugReports" />
        </div>
      )}

      {/* Pruebas API */}
      {project.apiTests && project.apiTests.length > 0 && (
        <div className="api-tests">
          <TestTables tests={project.apiTests} testType="apiTests" />
        </div>
      )}

      {/* Pruebas de Rendimiento */}
      {project.performanceTests && project.performanceTests.length > 0 && (
        <div className="performance-tests">
          <TestTables tests={project.performanceTests} testType="performanceTests" />
        </div>
      )}

      <Link to="/projects" className="btn" style={{ marginTop: '2rem', display: 'inline-block' }}>
        Volver a Proyectos
      </Link>
    </div>
  );
}

export default ProjectDetail;
