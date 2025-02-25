// src/components/ProjectItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectItem.css';

function ProjectItem({ id, titulo, descripcion }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projectdetail/${id}`);
  };

  return (
    <div className="projectitem-item" onClick={handleClick}>
      <div className="projectitem-img">
        {/* Si en el futuro quieres usar una imagen específica 
            podrías incluirla aquí, por ahora usamos un fallback. */}
        <img
          src={`https://picsum.photos/600/400?random=${id}`}
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
