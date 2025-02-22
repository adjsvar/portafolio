// src/pages/Projects.jsx
import React from 'react'
import projectsData from '../data/projects.json'
import ProjectItem from '../components/ProjectItem'
import '../styles/Projects.css'

function Projects() {
  return (
    <section id="projects" className="content projects">
      <h2>Proyectos</h2>
      <div className="projects-container">
        {projectsData.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
