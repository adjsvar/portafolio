// src/components/ProjectItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectItem.css';

function ProjectItem({ id, title, briefDescription, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projectdetail/${id}`);
  };

  return (
    <div className="projectitem-item" onClick={handleClick}>
      <div className="projectitem-img">
        <img
          src={image ? image : `https://picsum.photos/600/400?random=${id}`}
          alt={`Proyecto ${title}`}
        />
      </div>
      <div className="projectitem-desc">
        <h3>{title}</h3>
        <p>{briefDescription}</p>
      </div>
    </div>
  );
}

export default ProjectItem;
