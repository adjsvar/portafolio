// src/pages/Home.jsx - manteniendo la estructura original
import React from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";

function Home() {
  return (
    <>
      {/* Sección "Hero" o portada */}
      <section className="content hero" id="home">
        <h1>ADRIAN SILVA</h1>
        <p>
          Hola, soy un profesional en formación en Quality Assurance con enfoque
          analítico y atención al detalle. Busco mi primera oportunidad en QA
          para aplicar mis conocimientos, aprender y aportar valor al equipo.
        </p>
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