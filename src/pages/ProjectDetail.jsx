// src/pages/ProjectDetail.jsx
import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectsContext } from '../context/ProjectsContext';
import TestTables from '../components/TestTables';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useContext(ProjectsContext);

  useEffect(() => {
    console.log("ProjectDetail -> id:", id);
    console.log("ProjectDetail -> projects:", projects);
  }, [id, projects]);

  // Convertimos el id a cadena para comparar
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return <div>Proyecto no encontrado.</div>;
  }

  return (
    <div className="project-detail">
      {/* Encabezado del proyecto */}
      <div className="project-header">
        <div className="project-info">
          <h2>{project.titulo}</h2>
          {project.descripcion && <p>{project.descripcion}</p>}
        </div>
      </div>
      {project.tests && project.tests.length > 0 ? (
        project.tests.map((test, index) => {
          console.log(`ProjectDetail -> Test ${index}:`, test);
          if (!test.items || test.items.length === 0) {
            return (
              <div key={index} className="test-section">
                <h3>{test.titulo || test.tipo}</h3>
                {test.descripcion && <p>{test.descripcion}</p>}
                <p>No hay ítems en esta sección.</p>
              </div>
            );
          }
          return (
            <div key={index} className="test-section">
              <h3>{test.titulo || test.tipo}</h3>
              {test.descripcion && <p>{test.descripcion}</p>}
              {/* Contenedor para evitar que el contenido ancho rompa el layout */}
              <div className="test-container">
                <TestTables tests={test.items} testType={test.tipo} />
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-tests">No hay pruebas registradas para este proyecto.</div>
      )}
      <Link
        to="/projects"
        className="btn"
        style={{ marginTop: '2rem', display: 'inline-block' }}
      >
        Volver a Proyectos
      </Link>
    </div>
  );
}

export default ProjectDetail;