import React, { useEffect, useState, useRef } from 'react';
import '../styles/EvidenceViewer.css';

function EvidenceViewer({ src, alt, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  // Bloquear scroll en el body
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Cargar la imagen
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      setHasError(true);
      setLoaded(true);
    };
  }, [src]);

  // Cerrar al hacer clic en el overlay (fuera de la imagen)
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose && onClose();
    }
  };

  if (hasError) {
    return (
      <div className="ev-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="ev-centerbox">
          <p className="ev-error-text">No se pudo cargar la imagen.</p>
        </div>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="ev-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="ev-centerbox">
          <div className="ev-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="ev-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <img
        ref={imgRef}
        src={src}
        alt={alt || 'Evidencia'}
        className="ev-image"
      />
    </div>
  );
}

export default EvidenceViewer;