// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cv from '../assets/cv.pdf';  // Asegúrate de que cv.pdf esté en la carpeta assets
import '../styles/About.css';

function About() {
  return (
    <section id="about" className="content about">
      {/* Contenedor adicional para centrar el grupo completo */}
      <div className="about-wrapper">
        <div className="about-info">
          <h2>About Me</h2>
          <p>
            Soy un profesional en formación en Quality Assurance con enfoque analítico y atención al detalle. 
            Cuento con conocimientos en diseño y ejecución de casos de prueba, gestión de defectos con Jira y Trello, 
            y experiencia probando aplicaciones web y móviles en distintos navegadores y dispositivos.
          </p>
          <p>
            Busco mi primera oportunidad laboral en QA, donde pueda aplicar mis conocimientos técnicos, 
            seguir aprendiendo y aportar valor al equipo con mi capacidad analítica y organización.
          </p>
          <div className="about-buttons">
            {/* Botón Contact: redirige al componente Contact */}
            <Link to="/contact" className="btn">
              Contact
            </Link>
            {/* Botón Descargar CV: descarga el archivo PDF */}
            <a href={cv} download className="btn btn-secondary">
              Descargar CV
            </a>
          </div>
        </div>

        <div className="skills">
          <h2>Skills</h2>
          <div className="skills-badges">
            <span className="skill-badge skill-badge-primary">QA Manual Testing</span>
            <span className="skill-badge">Test Case Design</span>
            <span className="skill-badge">Bug Reporting</span>
            <span className="skill-badge">Jira</span>
            <span className="skill-badge">Trello</span>
            <span className="skill-badge skill-badge-primary">SQL</span>
            <span className="skill-badge skill-badge-primary">API Testing (Postman)</span>
            <span className="skill-badge">Selenium Basics</span>
            <span className="skill-badge">HTML & CSS</span>
            <span className="skill-badge">JavaScript</span>
            <span className="skill-badge">Git</span>
            <span className="skill-badge">Python Basics</span>
            <span className="skill-badge">Node.js Basics</span>
            <span className="skill-badge">English B2</span>
          </div>
          
          <h2 className="mt-4">Soft Skills</h2>
          <div className="skills-badges">
            <span className="skill-badge skill-badge-soft">Trabajo en Equipo</span>
            <span className="skill-badge skill-badge-soft">Pensamiento Analítico</span>
            <span className="skill-badge skill-badge-soft">Resolución de Problemas</span>
            <span className="skill-badge skill-badge-soft">Organización</span>
            <span className="skill-badge skill-badge-soft">Documentación Detallada</span>
            <span className="skill-badge skill-badge-soft">Aprendizaje Continuo</span>
            <span className="skill-badge skill-badge-soft">Comunicación Efectiva</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;