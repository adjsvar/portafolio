import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ProjectsContext } from '../context/ProjectsContext';
import logo from '../assets/foto.jpg';
import hamOpen from '../assets/hamopen.svg';
import hamClose from '../assets/hamclose.svg';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const { projects } = useContext(ProjectsContext);

  // Monitorea el ancho de la ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const routeNames = {
    '/': 'Home',
    '/about': 'About Me',
    '/projects': 'Projects',
    '/contact': 'Contact'
  };

  // Determina si estamos en un detalle de proyecto
  const isProjectDetail = location.pathname.startsWith('/projectdetail/');
  
  // Busca el proyecto actual si estamos en vista de detalle
  const currentProject = isProjectDetail ? 
    projects.find(p => p.id.toString() === location.pathname.split('/')[2]) : 
    null;

  const projectTitle = currentProject ? currentProject.titulo : '';

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <section className="navbar">
      <NavLink to="/" className="logo-link" onClick={closeMenu}>
        <div className="logo">
          <img src={logo} alt="Foto de perfil" className="logo-img" />
          <h2 className="logo-texto">Adrian Silva</h2>
        </div>
      </NavLink>

      {/* Active link en modo móvil */}
      <div className={`active-link ${isProjectDetail ? 'is-project-detail' : ''}`}>
        {isProjectDetail ? (
          <span className="project-detail-title">
            <span className="projects-small">Projects / </span>
            <span className="project-name">{projectTitle}</span>
          </span>
        ) : (
          routeNames[location.pathname] || ''
        )}
      </div>

      <img
        src={isOpen ? hamClose : hamOpen}
        alt="Menú"
        className="hamburguer"
        aria-expanded={isOpen}
        onClick={handleToggle}
      />

      <ul className={isOpen ? 'navlinks open' : 'navlinks'} id="navlinks">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            About Me
          </NavLink>
        </li>
        <li className={windowWidth > 850 && isProjectDetail ? "project-stack-item" : ""}>
          {windowWidth > 850 && isProjectDetail ? (
            <>
              <NavLink
                to="/projects"
                className="projects-parent"
                onClick={closeMenu}
              >
                Projects
              </NavLink>
              <span className="current-project">{projectTitle}</span>
            </>
          ) : (
            <NavLink
              to="/projects"
              className={({ isActive }) => (isActive || isProjectDetail ? 'active' : '')}
              onClick={closeMenu}
            >
              Projects
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Navbar;