// src/components/TestTables.jsx
import React, { useState, useEffect } from "react";
import EvidenceViewer from "./EvidenceViewer";
import "../styles/TestTables.css";

function TestTables({ tests, testType, layout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estado para mostrar/hide EvidenceViewer
  const [modalOpen, setModalOpen] = useState(false);
  // Almacena la "imagen" (string) que se mostrará en EvidenceViewer
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

  // Recolecta todas las claves
  const allKeys = [...new Set(tests.flatMap((item) => Object.keys(item)))];

  // Determina título (caption)
  const captionText = testType
    ? testType.toUpperCase()
    : tests[0].tipo
    ? tests[0].tipo.toUpperCase()
    : "TESTS";

  // --- Lógica para abrir/cerrar EvidenceViewer ---
  const handleOpenModal = (imgSrc) => {
    setModalImage(imgSrc || "");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  // Render de celdas
  const renderCell = (value, key) => {
    if (key === "evidencia") {
      if (!value || typeof value !== "object") return "-";
      // Suponemos: item.evidencia = { imagen: "URL", video: ... }
      if (value.imagen) {
        // Al hacer clic => abrimos EvidenceViewer
        return (
          <span
            className="evidence-link"
            onClick={() => handleOpenModal(value.imagen)}
          >
            Ver Evidencia
          </span>
        );
      }
      return "-";
    }
    // Si es un objeto distinto a evidencia (por ejemplo un subobjeto)
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value === undefined || value === null || value === "" ? "-" : value;
  };

  // ==================== LAYOUT ROW ====================
  if (computedLayout === "row") {
    return (
      <div className="testtables-row-container">
        {/* Renderizamos EvidenceViewer si modalOpen está en true */}
        {modalOpen && (
          <EvidenceViewer
            src={modalImage}
            alt="Evidencia"
            onClose={handleCloseModal}
          />
        )}

        <table className="test-table">
          <thead>
            <tr className="table-caption-row">
              <th colSpan={allKeys.length} className="table-caption-cell">
                {captionText}
              </th>
            </tr>
            <tr>
              {allKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tests.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {allKeys.map((key) => (
                  <td key={key}>{renderCell(item[key], key)}</td>
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

    return (
      <div className="testtables-column-container">
        {modalOpen && (
          <EvidenceViewer
            src={modalImage}
            alt="Evidencia"
            onClose={handleCloseModal}
          />
        )}

        <div
          className={`testtables-column-nav ${singleItem ? "single-item" : ""}`}
        >
          <div className="nav-arrows-container">
            {!singleItem && (
              <>
                <button onClick={handlePrev} className="nav-arrow left">                  
                </button>

                <div className="nav-title">
                  {currentItem.ID || "-"}
                </div>
                <button onClick={handleNext} className="nav-arrow right">                  
                </button>
              </>
            )}
          </div>
        </div>

        <div className="testtables-column-grid">
          {allKeys
            .filter((key) => key !== "ID")
            .map((key) => (
              <div key={key} className="testtables-column-row">
                <div className="grid-label">{key}:</div>
                <div className="grid-value">
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
