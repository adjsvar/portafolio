import React, { useState, useEffect, useRef } from 'react';
import '../styles/UserStoryCard.css';

const UserStoryCard = ({ story, tests = [], isActive, onActivate, storyId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const [activeItemId, setActiveItemId] = useState(null);

  // Filtrar los tests relacionados a esta user story y organizarlos jerárquicamente
  const getRelatedTests = () => {
    const relatedItems = [];
    const bugReportsGroup = tests.find(group => group.tipo === 'Reportes de Bug');
    const bugReports = bugReportsGroup?.items || [];
    
    tests.forEach(testGroup => {
      // Saltamos el procesamiento del grupo de bugs porque los trataremos como elementos anidados
      if (testGroup.tipo === 'Reportes de Bug') return;
      
      if (testGroup.items && testGroup.items.length > 0) {
        const filteredItems = testGroup.items.filter(
          item => item.userStoryId === story.id
        );
        
        if (filteredItems.length > 0) {
          // Para cada item, añadimos los bugs relacionados
          const itemsWithBugs = filteredItems.map(item => {
            const relatedBugs = bugReports.filter(bug => 
              bug.testCaseId === item.ID && bug.userStoryId === story.id
            );
            
            return {
              ...item,
              relatedBugs
            };
          });
          
          relatedItems.push({
            type: testGroup.tipo,
            items: itemsWithBugs
          });
        }
      }
    });
    
    // Añadir bugs que no están relacionados con casos de prueba pero sí con la user story
    const orphanBugs = bugReports.filter(bug => 
      bug.userStoryId === story.id && 
      !bug.testCaseId
    );
    
    if (orphanBugs.length > 0) {
      relatedItems.push({
        type: 'Bugs sin caso de prueba asociado',
        items: orphanBugs.map(bug => ({...bug, isBug: true}))
      });
    }
    
    return relatedItems;
  };
  
  const relatedTests = getRelatedTests();
  const hasRelatedTests = relatedTests.length > 0;
  
  // Función mejorada de scroll para alinear el borde superior con mayor margen
  // y resaltar mejor el elemento seleccionado
  const scrollToElement = (elementId) => {
    // Esperar un poco para asegurar que el DOM esté actualizado
    setTimeout(() => {
      // Buscar el elemento por su ID con y sin #
      let element = document.getElementById(elementId);
      if (!element) {
        element = document.getElementById(elementId.replace('#', ''));
      }
      
      if (element) {
        // Intentar abrir la pestaña correspondiente si está en otra sección
        // Buscar una fila de tabla que contiene el elementId
        const rows = document.querySelectorAll('tr');
        let targetRow = null;
        
        rows.forEach(row => {
          if (row.textContent.includes(elementId)) {
            targetRow = row;
          }
        });
        
        if (targetRow) {
          // Obtener coordenadas del elemento
          const rect = targetRow.getBoundingClientRect();
          
          // Calcular posición para alinear borde superior con margen
          const topMargin = 120;
          const scrollPosition = window.pageYOffset + rect.top - topMargin;
          
          // Realizar scroll
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
          
          // Destacar visualmente el elemento
          targetRow.classList.add('highlighted-row');
          targetRow.classList.add('super-highlight'); // Clase adicional para mayor resaltado
          
          // Añadir atributo tabindex para recibir focus
          targetRow.setAttribute('tabindex', '-1');
          targetRow.focus();
          
          // Eliminar la clase highlight después de un tiempo
          setTimeout(() => {
            targetRow.classList.remove('highlighted-row');
            targetRow.classList.remove('super-highlight');
          }, 3000); // Aumentamos a 3 segundos para mejor visibilidad
          
          return; // Salir de la función si encontramos la fila
        }
        
        // Si no encontramos una fila, intentar con el elemento original
        // Obtener coordenadas del elemento
        const rect = element.getBoundingClientRect();
        
        // Calcular posición para alinear borde superior con margen
        const topMargin = 120;
        const scrollPosition = window.pageYOffset + rect.top - topMargin;
        
        // Realizar scroll
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // Destacar visualmente el elemento
        element.classList.add('highlight-test');
        element.classList.add('super-highlight'); // Clase adicional para mayor resaltado
        
        // Añadir atributo tabindex para recibir focus
        element.setAttribute('tabindex', '-1');
        element.focus();
        
        // Buscar la fila que contiene el elemento para resaltarla también
        const containingRow = element.closest('tr');
        if (containingRow) {
          containingRow.classList.add('highlighted-row');
          containingRow.classList.add('super-highlight');
          
          // Eliminar la clase highlight después de un tiempo
          setTimeout(() => {
            containingRow.classList.remove('highlighted-row');
            containingRow.classList.remove('super-highlight');
            element.classList.remove('highlight-test');
            element.classList.remove('super-highlight');
          }, 3000);
        } else {
          setTimeout(() => {
            element.classList.remove('highlight-test');
            element.classList.remove('super-highlight');
          }, 3000);
        }
      } else {
        console.warn(`Elemento con ID ${elementId} no encontrado, buscando en el DOM...`);
        
        // Buscar el texto del ID en el contenido de la página
        const elements = document.querySelectorAll('td');
        elements.forEach(el => {
          if (el.textContent.includes(elementId)) {
            const row = el.closest('tr');
            if (row) {
              // Destacar la fila encontrada
              row.classList.add('highlighted-row');
              row.classList.add('super-highlight');
              
              // Scroll a la fila
              const rect = row.getBoundingClientRect();
              const topMargin = 120;
              const scrollPosition = window.pageYOffset + rect.top - topMargin;
              
              window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
              });
              
              // Añadir atributo tabindex para recibir focus
              row.setAttribute('tabindex', '-1');
              row.focus();
              
              // Eliminar después de un tiempo
              setTimeout(() => {
                row.classList.remove('highlighted-row');
                row.classList.remove('super-highlight');
              }, 3000);
              
              console.log(`Encontrado texto ${elementId} en elemento:`, row);
            }
          }
        });
      }
    }, 100);
  };
  
  // Realizar scroll cuando la tarjeta se expande
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      // Calcular posición para la tarjeta
      const rect = cardRef.current.getBoundingClientRect();
      const topMargin = 120;
      const scrollPosition = window.pageYOffset + rect.top - topMargin;
      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
      
      // Destacar la tarjeta
      cardRef.current.classList.add('highlight-card');
      setTimeout(() => {
        cardRef.current.classList.remove('highlight-card');
      }, 1500);
    }
  }, [isExpanded]);
  
  // Expandir por defecto si se activa
  useEffect(() => {
    if (isActive && hasRelatedTests && !isExpanded) {
      setIsExpanded(true);
    }
  }, [isActive, hasRelatedTests, isExpanded]);
  
  // Si no hay tests relacionados, no debería expandirse
  useEffect(() => {
    if (!hasRelatedTests) {
      setIsExpanded(false);
    }
  }, [hasRelatedTests]);
  
  // Manejar clic en la tarjeta principal - ahora abre/cierra
  const handleCardClick = (e) => {
    // Solo procesar si no se hizo clic en un elemento anidado
    if (e.target.closest('.related-bug-link') || e.target.closest('.related-item') || e.target.closest('.related-bug')) {
      return;
    }
    
    // Expandir/colapsar la tarjeta si tiene tests relacionados
    if (hasRelatedTests) {
      // Alternar entre expandido/colapsado
      setIsExpanded(!isExpanded);
      
      if (!isActive) {
        onActivate(storyId);
      } else if (isExpanded) {
        // Si ya está activa y expandida, al hacer clic se desactiva
        onActivate(null);
      }
      
      // Navegar a la historia de usuario
      scrollToElement(story.id);
    }
  };
  
  // Manejar navegación a un test específico
  const navigateToTest = (e, testId) => {
    e.stopPropagation();
    // Navegar directo al ID
    scrollToElement(testId);
    // Guardar como item activo
    setActiveItemId(testId);
    
    // Disparar un evento para que otros componentes sepan que se ha activado un item
    const event = new CustomEvent('activateItem', { 
      detail: { itemId: testId } 
    });
    document.dispatchEvent(event);
  };

  // Manejar clic en un item de prueba
  const handleItemClick = (e, item) => {
    e.stopPropagation();
    navigateToTest(e, item.ID);
  };

  return (
    <div 
      className={`user-story-card ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}`}
      ref={cardRef}
      id={story.id}
      onClick={handleCardClick}
    >
      <div className={`user-story-header ${hasRelatedTests ? 'clickable' : ''}`}>
        <div className="user-story-header-content">
          <div className="user-story-top">
            <span className="user-story-id">{story.id}</span>
            <span className="user-story-separator">-</span>
            <h4 className="user-story-title">{story.titulo}</h4>
          </div>
          
          <div className="user-story-desc-container">
            <p className="user-story-description">{story.descripcion}</p>
          </div>
        </div>
        {isExpanded && (
          <div className="card-indicator">
            <span className="card-indicator-text">Clic para cerrar</span>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className="user-story-content">
          {relatedTests.map((group, groupIndex) => (
            <div key={groupIndex} className="related-group">
              <h5 className="related-group-title">{group.type}</h5>
              <div className="related-items">
                {group.items.map((item, itemIndex) => {
                  const isActive = activeItemId === item.ID;
                  
                  return (
                    <div 
                      key={itemIndex} 
                      className={`related-item ${item.estado ? item.estado.toLowerCase() : ''} 
                                 ${item.isBug ? 'bug-item' : ''} 
                                 ${isActive ? 'active-item' : ''}`}
                      data-testid={item.ID}
                      id={`card-${item.ID}`}
                      onClick={(e) => handleItemClick(e, item)}
                    >
                      <div className="related-item-header">
                        <div className="related-item-header-content">
                          <span className={`related-item-id ${item.isBug ? 'bug-id' : ''}`}>{item.ID}</span>
                          <span className="related-item-title">{item.titulo}</span>
                          {item.estado && (
                            <span className={`related-item-status ${item.estado.toLowerCase()}`}>
                              {item.estado}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="related-item-desc-container">
                        <p className="related-item-desc">{item.descripcion}</p>
                      </div>
                      
                      {item.reporteBugId && (
                        <button 
                          className="related-bug-link"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToTest(e, item.reporteBugId);
                          }}
                        >
                          Bug: {item.reporteBugId}
                        </button>
                      )}
                      
                      {/* Mostrar bugs relacionados directamente */}
                      {item.relatedBugs && item.relatedBugs.length > 0 && (
                        <div className="nested-bugs">
                          <h6 className="nested-bugs-title">
                            {item.relatedBugs.length} {item.relatedBugs.length === 1 ? 'bug relacionado' : 'bugs relacionados'}
                          </h6>
                          {item.relatedBugs.map((bug, bugIndex) => {
                            const isBugActive = activeItemId === bug.ID;
                            
                            return (
                              <div 
                                key={bugIndex} 
                                className={`related-bug ${isBugActive ? 'active-bug' : ''}`}
                                id={`card-${bug.ID}`}
                                data-testid={`nested-${bug.ID}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateToTest(e, bug.ID);
                                }}
                              >
                                <div className="related-bug-header">
                                  <span className="related-bug-id">{bug.ID}</span>
                                  <span className="related-bug-title">{bug.titulo}</span>
                                </div>
                                <div className="related-bug-desc-container">
                                  <p className="related-bug-desc">{bug.descripcion}</p>
                                </div>
                                {bug.severityPriority && (
                                  <div className="related-bug-priority">
                                    <span>{bug.severityPriority}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserStoryCard;