// src/components/ApiTests.jsx
import React, { useState, useEffect } from 'react';
import ApiTestsRow from './ApiTestsRow';
import ApiTestsColumn from './ApiTestsColumn';

function ApiTests({ apiTests }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth >= 800 ? (
    <ApiTestsRow apiTests={apiTests} />
  ) : (
    <ApiTestsColumn apiTests={apiTests} />
  );
}

export default ApiTests;
