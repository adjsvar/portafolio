// src/App.jsx
import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

// 1. Importar estilos globales
import './styles/App.css'

// 2. Importar componentes
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

// 3. Importar páginas
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'

// Componente que se encarga de hacer scroll al tope cuando cambia la ruta
function AppContent() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll instantáneo a la parte superior
  }, [location])

  return (
    <>
      <Navbar />
      <Sidebar />

      {/* Sección principal donde cargan tus páginas */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectdetail/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* Opción para página no encontrada:
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
