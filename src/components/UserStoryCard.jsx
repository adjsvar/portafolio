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
  
  // Manejar clic en la tarjeta principal
  const handleCardClick = (e) => {
    // Solo procesar si no se hizo clic en un elemento anidado
    if (e.target.closest('.related-bug-link') || e.target.closest('.related-item') || e.target.closest('.related-bug')) {
      return;
    }
    
    // Expandir/colapsar la tarjeta si tiene tests relacionados
    if (hasRelatedTests) {
      setIsExpanded(!isExpanded);
      
      if (!isActive) {
        onActivate(storyId);
      } else if (isExpanded) {
        onActivate(null);
      }
    }
  };
  
  // Método para navegar a test específico - simplificado
  const navigateToTest = (e, testId) => {
    if (e) e.stopPropagation();
    setActiveItemId(testId);
    
    // Emitir evento para que TestTables lo maneje
    const event = new CustomEvent('activateItem', { 
      detail: { itemId: testId } 
    });
    document.dispatchEvent(event);
  };

  // Manejar clic en un item de prueba
  const handleItemClick = (e, item) => {
    e.stopPropagation();
    // Solo navega al caso de prueba, no a su bug relacionado
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
                      
                      {/* Botón de bug como un elemento separado */}
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
                      
                      {/* Bugs relacionados */}
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