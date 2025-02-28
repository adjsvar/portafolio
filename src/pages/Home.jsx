// src/pages/Home.jsx - Versión actualizada con foto de perfil
import React from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import profileImg from "../assets/foto.jpg"; // Importar la foto de perfil

function Home() {
  return (
    <>
      {/* Sección "Hero" o portada con foto de perfil */}
      <section className="content hero" id="home">
        <div className="hero-container">
          <div className="hero-profile">
            <img src={profileImg} alt="Adrian Silva" className="hero-img" />
          </div>
          <div className="hero-text">
            <h1>ADRIAN SILVA</h1>
            <p>
              Hola, soy un profesional en formación en Quality Assurance con enfoque
              analítico y atención al detalle. Busco mi primera oportunidad en QA
              para aplicar mis conocimientos, aprender y aportar valor al equipo.
            </p>
          </div>
        </div>
      </section>

      {/* Sección About */}
      <About />

      {/* Sección Projects */}
      <Projects />

      {/* Sección Contact */}
      <Contact />
    </>
  );
}

export default Home;