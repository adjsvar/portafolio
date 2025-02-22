// src/components/Sidebar.jsx
import React from 'react'
import linkedin from '../assets/linkedin.svg'
import github from '../assets/github.svg'
import xIcon from '../assets/x.svg'

// Importa los estilos exclusivos para el Sidebar
import '../styles/Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src={linkedin} alt="LinkedIn" />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <img src={github} alt="GitHub" />
      </a>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer">
        <img src={xIcon} alt="X (Twitter)" />
      </a>
    </aside>
  )
}

export default Sidebar
