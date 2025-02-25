import React, { useEffect, useState, useRef } from 'react';
import '../styles/EvidenceViewer.css';

function EvidenceViewer({ src, alt, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');

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

  // Al hacer clic en la imagen:
  // 1) Si estaba con zoom, la regresa a tamaño normal.
  // 2) Si no tenía zoom, primero ajusta el transform-origin,
  //    luego hace zoom en un setTimeout para evitar saltos.
  const handleImageClick = (e) => {
    if (zoom) {
      // Regresar a estado normal
      setZoom(false);
      setTransformOrigin('50% 50%');
    } else {
      // Calcular transform-origin según el punto de clic
      const rect = imgRef.current?.getBoundingClientRect();
      if (rect) {
        const xLocal = e.clientX - rect.left;
        const yLocal = e.clientY - rect.top;
        const xPercent = (xLocal / rect.width) * 100;
        const yPercent = (yLocal / rect.height) * 100;
        setTransformOrigin(`${xPercent}% ${yPercent}%`);
      }

      // Esperar un "tick" para que el DOM aplique el transform-origin...
      setTimeout(() => {
        setZoom(true);
      }, 0);
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
          <p className="ev-spinner-text">Cargando imagen...</p>
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
        // Aplicamos una clase para cuando haya zoom
        className={`ev-image ${zoom ? 'ev-zoom' : ''}`}
        // Sólo el transform-origin se deja en style inline
        // para que cambie dinámicamente sin sobreescribirlo en CSS.
        style={{ transformOrigin }}
        onClick={handleImageClick}
      />
    </div>
  );
}

export default EvidenceViewer;
