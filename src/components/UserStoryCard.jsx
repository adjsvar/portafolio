import React, { useState, useEffect } from 'react';
import '../styles/UserStoryCard.css';

const UserStoryCard = ({ story, tests = [], isActive, onActivate, storyId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

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
  
  // Manejar clic en toda la tarjeta
  const handleCardClick = () => {
    if (hasRelatedTests) {
      setIsExpanded(!isExpanded);
      if (!isActive) {
        onActivate(storyId);
      }
    }
  };
  
  // Manejar expansión de elementos individuales con stopPropagation
  const toggleItemExpand = (e, groupIndex, itemIndex) => {
    e.stopPropagation(); // Esto es clave - evita que el clic se propague al card principal
    const key = `${groupIndex}-${itemIndex}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Si no hay tests relacionados, no debería expandirse
  useEffect(() => {
    if (!hasRelatedTests) {
      setIsExpanded(false);
    }
  }, [hasRelatedTests]);

  return (
    <div 
      className={`user-story-card ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}`}
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
        
        {hasRelatedTests && (
          <span className="expand-button">
            {isExpanded ? '−' : '+'}
          </span>
        )}
      </div>
      
      {isExpanded && (
        <div className="user-story-content">
          {relatedTests.map((group, groupIndex) => (
            <div key={groupIndex} className="related-group">
              <h5 className="related-group-title">{group.type}</h5>
              <div className="related-items">
                {group.items.map((item, itemIndex) => {
                  const itemKey = `${groupIndex}-${itemIndex}`;
                  const isItemExpanded = expandedItems[itemKey];
                  const canExpand = item.relatedBugs && item.relatedBugs.length > 0;
                  
                  return (
                    <div 
                      key={itemIndex} 
                      className={`related-item ${item.estado ? item.estado.toLowerCase() : ''} ${item.isBug ? 'bug-item' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canExpand) {
                          toggleItemExpand(e, groupIndex, itemIndex);
                        }
                      }}
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
                        
                        {canExpand && (
                          <span className="expand-button item-expand-button">
                            {isItemExpanded ? '−' : '+'}
                          </span>
                        )}
                      </div>
                      
                      <div className="related-item-desc-container">
                        <p className="related-item-desc">{item.descripcion}</p>
                      </div>
                      
                      {item.reporteBugId && !isItemExpanded && (
                        <a href={`#${item.reporteBugId}`} className="related-bug-link">
                          Bug: {item.reporteBugId}
                        </a>
                      )}
                      
                      {/* Mostrar bugs relacionados como elementos anidados */}
                      {item.relatedBugs && item.relatedBugs.length > 0 && isItemExpanded && (
                        <div className="nested-bugs">
                          <h6 className="nested-bugs-title">
                            {item.relatedBugs.length} {item.relatedBugs.length === 1 ? 'bug relacionado' : 'bugs relacionados'}
                          </h6>
                          {item.relatedBugs.map((bug, bugIndex) => (
                            <div key={bugIndex} className="related-bug" id={bug.ID}>
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
                          ))}
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