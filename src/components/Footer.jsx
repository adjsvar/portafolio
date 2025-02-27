// src/components/Footer.jsx
import React from 'react'
import '../styles/Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Made by Adrian Silva. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer