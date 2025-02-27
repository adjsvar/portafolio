// src/pages/Projects.jsx
import React, { useContext } from 'react';
import { ProjectsContext } from '../context/ProjectsContext';
import ProjectItem from '../components/ProjectItem';
import '../styles/Projects.css';

function Projects() {
  const { projects } = useContext(ProjectsContext);

  return (
    <section id="projects" className="content projects">
      <h2>Proyectos</h2>
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;