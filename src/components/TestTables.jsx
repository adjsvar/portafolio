import React, { useState, useEffect } from "react";
import "../styles/TestTables.css";

function TestTables({ tests, testType, layout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [activeItemId, setActiveItemId] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    
    // Escuchar los hash changes para resaltar elementos
    const handleHashChange = () => {
      highlightElementFromHash();
    };
    
    // Escuchar activaciones de items
    const handleActivateItem = (event) => {
      const { itemId } = event.detail;
      setActiveItemId(itemId);
      highlightItemById(itemId);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('activateItem', handleActivateItem);
    
    // Comprobar si hay un hash al cargar
    setTimeout(highlightElementFromHash, 500);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('activateItem', handleActivateItem);
    };
  }, []);
  
  // Función para resaltar elemento basado en el hash actual
  const highlightElementFromHash = () => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      highlightItemById(hash);
    }
  };

  // Función para resaltar un elemento por su ID
  const highlightItemById = (id) => {
    // Buscar el elemento por su ID
    let element = document.getElementById(id);
    if (!element) {
      // Si no encontramos el elemento exacto, buscar en el contenido de celdas
      const cells = document.querySelectorAll('td');
      cells.forEach(cell => {
        if (cell.textContent.trim() === id) {
          // Encontrado el ID en una celda, resaltar la fila completa
          const row = cell.closest('tr');
          if (row) {
            row.classList.add('highlighted-row');
            row.classList.add('super-highlight');
            
            // Hacer scroll a la fila
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Actualizar el estado activo
            setActiveItemId(id);
            
            // Eliminar después de un tiempo
            setTimeout(() => {
              row.classList.remove('highlighted-row');
              row.classList.remove('super-highlight');
            }, 3000);
          }
        }
      });
      
      return;
    }
    
    // Si encontramos el elemento, resaltarlo
    element.classList.add('highlight-test');
    element.classList.add('super-highlight');
    
    // Buscar la fila que contiene el elemento
    const containingRow = element.closest('tr');
    if (containingRow) {
      containingRow.classList.add('highlighted-row');
      containingRow.classList.add('super-highlight');
      
      // Hacer scroll a la fila
      containingRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Añadir atributo tabindex para recibir focus
      containingRow.setAttribute('tabindex', '-1');
      containingRow.focus();
      
      // Eliminar la clase highlight después de un tiempo
      setTimeout(() => {
        element.classList.remove('highlight-test');
        element.classList.remove('super-highlight');
        containingRow.classList.remove('highlighted-row');
        containingRow.classList.remove('super-highlight');
      }, 3000);
    } else {
      // Si no hay fila, hacer scroll al elemento en sí
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      setTimeout(() => {
        element.classList.remove('highlight-test');
        element.classList.remove('super-highlight');
      }, 3000);
    }
  };
  
  // Función de scroll
  const scrollToElement = (element) => {
    if (!element) return;
    
    setTimeout(() => {
      // Obtener coordenadas del elemento
      const rect = element.getBoundingClientRect();
      
      // Calcular posición para alinear elemento en el centro
      const scrollPosition = window.pageYOffset + rect.top - window.innerHeight / 2 + rect.height / 2;
      
      // Realizar scroll
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }, 100);
  };

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
    
  // Determina si es un bug report para cambiar estilos
  const isBugReport = testType === "Reportes de Bug" || captionText === "REPORTES DE BUG";

  // --- Lógica para abrir/cerrar modal ---
  const handleOpenModal = (imgSrc) => {
    setModalImage(imgSrc || "");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  // Render de celdas - simplificado
  const renderCell = (value, key, item) => {
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
    
    // Renderiza reporte de bug como un enlace
    if (key === "reporteBugId" && value) {
      return (
        <a 
          href={`#${value}`} 
          className="bug-report-link"
          onClick={(e) => {
            e.preventDefault();
            highlightItemById(value);
          }}
        >
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
    const priorityKeys = ["ID", "titulo", "descripcion"];
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

        <table className={`test-table ${isBugReport ? "bug-report-table" : ""}`}>
          <thead>
            <tr className="table-caption-row">
              <th colSpan={orderedKeys.length} className="table-caption-cell">
                {captionText}
              </th>
            </tr>
            <tr>
              {orderedKeys.map((key) => (
                <th key={key}>
                  {key === "reporteBugId" ? "Reporte de Bug" :
                   key === "testCaseId" ? "Caso de Prueba" : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tests.map((item, rowIndex) => (
              <tr 
                key={rowIndex} 
                id={`row-${item.ID || rowIndex}`}
                className={`test-row ${item.estado ? item.estado.toLowerCase() + '-row' : ''} ${item.ID === activeItemId ? 'highlighted-row' : ''}`}
              >
                {orderedKeys.map((key) => (
                  <td key={key} className={getCellClass(item[key], key)}>
                    {key === "ID" ? (
                      // Agregar un ancla para el ID con mejor formato
                      <a id={item.ID} className="test-id-anchor">
                        {item.ID}
                      </a>
                    ) : (
                      renderCell(item[key], key, item)
                    )}
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
    const priorityKeys = ["ID", "titulo", "descripcion"];
    const endKeys = ["reporteBugId", "testCaseId"];
    const middleKeys = allKeys.filter(key => !priorityKeys.includes(key) && !endKeys.includes(key));
    
    // Creamos el orden final - excluyendo ID que va en el título
    const orderedKeys = [
      ...priorityKeys.filter(key => key !== "ID" && allKeys.includes(key)),
      ...middleKeys,
      ...endKeys.filter(key => allKeys.includes(key))
    ];

    return (
      <div 
        className={`testtables-column-container ${isBugReport ? "bug-report-container" : ""} ${currentItem.estado ? currentItem.estado.toLowerCase() + '-container' : ''} ${currentItem.ID === activeItemId ? 'active-container' : ''}`}
      >
        {modalOpen && (
          <div className="evidence-modal" onClick={handleCloseModal}>
            <img src={modalImage} alt="Evidencia" />
          </div>
        )}

        <div className={`testtables-column-nav ${singleItem ? "single-item" : ""} ${isBugReport ? "bug-report-nav" : ""}`}>
          <div className="nav-arrows-container">
            {!singleItem && (
              <>
                <button onClick={handlePrev} className="nav-arrow left" aria-label="Anterior"></button>
                <div className="nav-title">
                  {/* Agregar un ancla para el ID */}
                  <a id={currentItem.ID} className="test-id-anchor">
                    {currentItem.ID || currentItem.titulo || "-"}
                  </a>
                </div>
                <button onClick={handleNext} className="nav-arrow right" aria-label="Siguiente"></button>
              </>
            )}
            {singleItem && (
              <div className="nav-title">
                {/* Agregar un ancla para el ID */}
                <a id={currentItem.ID} className="test-id-anchor">
                  {currentItem.ID || currentItem.titulo || "-"}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={`testtables-column-grid ${isBugReport ? "bug-report-grid" : ""}`}>
          {orderedKeys.map((key) => (
            <div key={key} className="testtables-column-row">
              <div className={`grid-label ${isBugReport ? "bug-grid-label" : ""}`}>
                {key === "reporteBugId" ? "Reporte de Bug" :
                 key === "testCaseId" ? "Caso de Prueba" : key}:
              </div>
              <div className={`grid-value ${getCellClass(currentItem[key], key)}`}>
                {renderCell(currentItem[key], key, currentItem)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TestTables;