// src/components/TestCases.jsx
import React, { useState, useEffect } from 'react';
import TestRow from './TestRow';
import TestColumn from './TestColumn';

function TestCases({ testCases }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Usamos TestRow para anchos mayores o iguales a 1150px
  // y TestColumn para anchos menores a 1150px.
  return windowWidth >= 1150 ? (
    <TestRow testCases={testCases} />
  ) : (
    <TestColumn testCases={testCases} />
  );
}

export default TestCases;
