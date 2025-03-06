import React, { useState, useEffect } from "react";
import "../styles/TestTables.css";

function TestTables({ tests, testType, layout, userStories }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determinar layout
  const computedLayout = layout || (windowWidth >= 1150 ? "row" : "column");

  if (!tests || tests.length === 0) {
    return <div>No hay pruebas disponibles.</div>;
  }

  // Recolecta todas las claves - simplificado
  const allKeys = Object.keys(tests[0] || {});

  // Determina título (caption)
  const captionText = testType
    ? testType.toUpperCase()
    : tests[0].tipo
    ? tests[0].tipo.toUpperCase()
    : "TESTS";

  // --- Lógica para abrir/cerrar modal ---
  const handleOpenModal = (imgSrc) => {
    setModalImage(imgSrc || "");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  // Función para encontrar la user story por ID - simplificada
  const getUserStoryById = (id) => {
    if (!userStories || !id) return null;
    return userStories.find(story => story.id === id);
  };

  // Render de celdas - simplificado
  const renderCell = (value, key) => {
    if (key === "evidencia" && value && typeof value === "object" && value.imagen) {
      return (
        <span
          className="evidence-link"
          onClick={() => handleOpenModal(value.imagen)}
        >
          Ver Evidencia
        </span>
      );
    }
    
    // Renderiza user story como un enlace
    if (key === "userStoryId" && value) {
      const userStory = getUserStoryById(value);
      if (userStory) {
        return (
          <a href={`#${value}`} className="user-story-link">
            {value}: {userStory.titulo}
          </a>
        );
      }
      return value;
    }
    
    // Renderiza reporte de bug como un enlace
    if (key === "reporteBugId" && value) {
      return (
        <a href={`#${value}`} className="bug-report-link">
          {value}
        </a>
      );
    }
    
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    
    return value === undefined || value === null || value === "" ? "-" : value;
  };

  // Determina la clase CSS para estados en celdas
  const getCellClass = (value, key) => {
    if (key === 'estado' || key === 'status') {
      if (typeof value === 'string') {
        const lowerValue = value.toLowerCase();
        if (lowerValue === 'pass' || lowerValue === 'ok') return 'pass';
        if (lowerValue === 'fail' || lowerValue === 'error') return 'fail';
        if (lowerValue === 'warning' || lowerValue === 'warn') return 'warning';
      }
    }
    return '';
  };

  // ==================== LAYOUT ROW ====================
  if (computedLayout === "row") {
    // Ordenamos las keys de forma simplificada
    const priorityKeys = ["ID", "userStoryId", "titulo", "descripcion"];
    const endKeys = ["reporteBugId", "testCaseId"];
    const middleKeys = allKeys.filter(key => !priorityKeys.includes(key) && !endKeys.includes(key));
    
    // Creamos el orden final
    const orderedKeys = [
      ...priorityKeys.filter(key => allKeys.includes(key)),
      ...middleKeys,
      ...endKeys.filter(key => allKeys.includes(key))
    ];

    return (
      <div className="testtables-row-container">
        {modalOpen && (
          <div className="evidence-modal" onClick={handleCloseModal}>
            <img src={modalImage} alt="Evidencia" />
          </div>
        )}

        <table className="test-table">
          <thead>
            <tr className="table-caption-row">
              <th colSpan={orderedKeys.length} className="table-caption-cell">
                {captionText}
              </th>
            </tr>
            <tr>
              {orderedKeys.map((key) => (
                <th key={key}>
                  {key === "userStoryId" ? "User Story" : 
                   key === "reporteBugId" ? "Reporte de Bug" :
                   key === "testCaseId" ? "Caso de Prueba" : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tests.map((item, rowIndex) => (
              <tr key={rowIndex} id={item.ID || `row-${rowIndex}`}>
                {orderedKeys.map((key) => (
                  <td key={key} className={getCellClass(item[key], key)}>
                    {renderCell(item[key], key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ==================== LAYOUT COLUMN ====================
  else {
    const currentItem = tests[currentIndex];
    const singleItem = tests.length === 1;

    const handlePrev = () => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : tests.length - 1));
    };
    const handleNext = () => {
      setCurrentIndex((prev) => (prev < tests.length - 1 ? prev + 1 : 0));
    };

    // Ordenamos las keys de forma simplificada
    const priorityKeys = ["ID", "userStoryId", "titulo", "descripcion"];
    const endKeys = ["reporteBugId", "testCaseId"];
    const middleKeys = allKeys.filter(key => !priorityKeys.includes(key) && !endKeys.includes(key));
    
    // Creamos el orden final - excluyendo ID que va en el título
    const orderedKeys = [
      ...priorityKeys.filter(key => key !== "ID" && allKeys.includes(key)),
      ...middleKeys,
      ...endKeys.filter(key => allKeys.includes(key))
    ];

    return (
      <div className="testtables-column-container">
        {modalOpen && (
          <div className="evidence-modal" onClick={handleCloseModal}>
            <img src={modalImage} alt="Evidencia" />
          </div>
        )}

        <div className={`testtables-column-nav ${singleItem ? "single-item" : ""}`}>
          <div className="nav-arrows-container">
            {!singleItem && (
              <>
                <button onClick={handlePrev} className="nav-arrow left" aria-label="Anterior"></button>
                <div className="nav-title">
                  {currentItem.ID || currentItem.titulo || "-"}
                </div>
                <button onClick={handleNext} className="nav-arrow right" aria-label="Siguiente"></button>
              </>
            )}
            {singleItem && (
              <div className="nav-title">
                {currentItem.ID || currentItem.titulo || "-"}
              </div>
            )}
          </div>
        </div>

        <div className="testtables-column-grid">
          {orderedKeys.map((key) => (
            <div key={key} className="testtables-column-row">
              <div className="grid-label">
                {key === "userStoryId" ? "User Story" : 
                 key === "reporteBugId" ? "Reporte de Bug" :
                 key === "testCaseId" ? "Caso de Prueba" : key}:
              </div>
              <div className={`grid-value ${getCellClass(currentItem[key], key)}`}>
                {renderCell(currentItem[key], key)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TestTables;