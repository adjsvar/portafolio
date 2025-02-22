// src/components/BugReport.jsx
import React, { useState, useEffect } from 'react';
import BugReportRow from './BugReportRow';
import BugReportColumn from './BugReportColumn';

function BugReport({ bugReports }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Por ejemplo: si el ancho es mayor o igual a 800px, se muestra el layout "row"
  return windowWidth >= 800 ? (
    <BugReportRow bugReports={bugReports} />
  ) : (
    <BugReportColumn bugReports={bugReports} />
  );
}

export default BugReport;
