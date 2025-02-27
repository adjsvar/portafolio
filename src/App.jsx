// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Importar estilos globales
import './styles/App.css';

// Importar componentes
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Importar páginas
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

// Importamos el proveedor del contexto
import { ProjectsProvider } from './context/ProjectsContext';

// Componente para hacer scroll al tope al cambiar de ruta
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectdetail/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Ruta para página no encontrada */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ProjectsProvider>
        <AppContent />
      </ProjectsProvider>
    </BrowserRouter>
  );
}

export default App;