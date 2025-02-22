// src/components/Navbar.jsx
import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import projectsData from '../data/projects.json'
import logo from '../assets/foto.jpg'
import hamOpen from '../assets/hamopen.svg'
import hamClose from '../assets/hamclose.svg'
import '../styles/Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const routeNames = {
    '/': 'Home',
    '/about': 'About Me',
    '/projects': 'Projects',
    '/contact': 'Contact'
  }

  let activeTextContent = routeNames[location.pathname] || ''

  // Si la ruta es de detalle de proyecto, se muestra el active link personalizado
  if (location.pathname.startsWith('/projectdetail')) {
    const parts = location.pathname.split('/');
    const projectId = parts[2];
    const project = projectsData.find(p => p.id.toString() === projectId);
    if (project) {
      activeTextContent = `/${project.title}`;
    }
  }
  
  

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <section className="navbar">
      <NavLink to="/" className="logo-link" onClick={closeMenu}>
        <div className="logo">
          <img src={logo} alt="Foto de perfil" className="logo-img" />
          <h2 className="logo-texto">Adrian Silva</h2>
        </div>
      </NavLink>

      {/* Active link en modo móvil */}
      <div className="active-link" id="active-link">{activeTextContent}</div>

      <img
        src={isOpen ? hamClose : hamOpen}
        alt="Menú"
        className="hamburguer"
        id="hamburguer"
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
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Projects
          </NavLink>
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
  )
}

export default Navbar
