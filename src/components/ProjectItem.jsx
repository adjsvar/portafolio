// src/components/ProjectItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectItem.css';

function ProjectItem({ id, titulo, descripcion, imagen }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projectdetail/${id}`);
  };

  return (
    <div className="projectitem-item" onClick={handleClick}>
      <div className="projectitem-img">
        {/* Usar la imagen proporcionada, o un placeholder si no hay imagen */}
        <img
          src={imagen || `https://picsum.photos/600/400?random=${id}`}
          alt={`Proyecto ${titulo}`}
        />
      </div>
      <div className="projectitem-desc">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}

export default ProjectItem;