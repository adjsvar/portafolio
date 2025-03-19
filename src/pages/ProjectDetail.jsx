import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProjectsContext } from '../context/ProjectsContext';
import TestTables from '../components/TestTables';
import UserStoryCard from '../components/UserStoryCard';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useContext(ProjectsContext);
  const project = projects.find((p) => p.id.toString() === id);
  const [activeStory, setActiveStory] = useState(null);

  // Escuchar evento de activación de user story desde TestTables
  useEffect(() => {
    const handleActivateUserStory = (event) => {
      const { storyId } = event.detail;
      setActiveStory(storyId);
    };
    
    document.addEventListener('activate-userstory', handleActivateUserStory);
    
    return () => {
      document.removeEventListener('activate-userstory', handleActivateUserStory);
    };
  }, []);

  if (!project) {
    return <div>Proyecto no encontrado.</div>;
  }

  return (
    <div className="project-detail">
      {/* Encabezado del proyecto con imagen */}
      <div className="project-header">
        {project.imagen && (
          <div className="project-image">
            <img src={project.imagen} alt={project.titulo} />
          </div>
        )}
        <div className="project-info">
          <h2>{project.titulo}</h2>
          {project.descripcion && <p>{project.descripcion}</p>}
        </div>
      </div>

      {/* Sección de User Stories */}
      {project.userStories && project.userStories.length > 0 && (
        <div className="user-stories-section">
          <h3>User Stories / Casos de Uso</h3>
          <div 
            className={`user-stories-container ${activeStory ? 'has-active-story' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {project.userStories.map((story) => (
              <UserStoryCard
                key={story.id}
                storyId={story.id}
                story={story}
                tests={project.tests}
                isActive={activeStory === story.id}
                onActivate={(storyId) => {
                  setActiveStory(prevStoryId => prevStoryId === storyId ? null : storyId);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sección de Tests */}
      {project.tests && project.tests.length > 0 ? (
        project.tests.map((test, index) => {
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
            <div 
              key={index} 
              className={`test-section ${test.tipo === 'Reportes de Bug' ? 'bug-reports-section' : ''}`}
            >
              <h3>{test.titulo || test.tipo}</h3>
              {test.descripcion && <p>{test.descripcion}</p>}
              <div className="test-container">
                <TestTables 
                  tests={test.items} 
                  testType={test.tipo} 
                  userStories={project.userStories} 
                />
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