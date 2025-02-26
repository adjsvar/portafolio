// src/context/ProjectsContext.jsx
import React, { createContext, useState } from 'react';
// Importa directamente el JSON (esto funciona con webpack/create-react-app)
import projectsData from '../data/proyectos.json';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  // Inicializa directamente con los datos del JSON
  const [projects, setProjects] = useState(projectsData);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};