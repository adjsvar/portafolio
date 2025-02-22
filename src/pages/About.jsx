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
            Soy un profesional apasionado por el desarrollo web y las tecnologías digitales. 
            Aquí encontrarás información sobre mi experiencia y habilidades.
          </p>
          <div className="about-buttons">
            {/* Botón Contact: redirige al componente Contact */}
            <Link to="/contact" className="btn">
              Contact
            </Link>
            {/* Botón Descargar CV: descarga el archivo PDF */}
            <a href={cv} download className="btn">
              Descargar CV
            </a>
          </div>
        </div>

        <div className="skills">
          <h2>Skills</h2>
          <div className="skills-badges">
            <button type="button" disabled className="skill-badge">QA Manual Testing</button>
            <button type="button" disabled className="skill-badge">Test Case Design & Execution</button>
            <button type="button" disabled className="skill-badge">Bug Reporting & Tracking</button>
            <button type="button" disabled className="skill-badge">Exploratory Testing</button>
            <button type="button" disabled className="skill-badge">Basic SQL</button>
            <button type="button" disabled className="skill-badge">API Testing (Postman)</button>
            <button type="button" disabled className="skill-badge">Agile & Scrum</button>
            <button type="button" disabled className="skill-badge">Basic HTML/CSS & JavaScript</button>
            <button type="button" disabled className="skill-badge">Version Control (Git)</button>
            <button type="button" disabled className="skill-badge">Test Management Tools</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
