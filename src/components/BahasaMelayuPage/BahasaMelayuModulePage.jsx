import React, { useEffect, useRef } from 'react';
import BahasaMelayuModuleNavBar from './BahasaMelayuModuleNavBar';
import { getModulesForYear } from './_shared/ModuleData';

export default function BahasaMelayuModulePage({ year, activeModule, onModuleChange, onBack, onSelectTopic, children, language }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeModule]);

  const modules = getModulesForYear(year);
  const stripped = activeModule.replace(/^\d-/, '');
  const activeMod = modules.find(m => m.id === stripped);
  const pageBg = activeMod?.theme?.background || '#fff';

  return (
    <div className="bm-module-page">
      <BahasaMelayuModuleNavBar
        year={year}
        activeModule={activeModule}
        onModuleChange={onModuleChange}
        onBack={onBack}
        language={language}
      />
      <div className="bm-module-content" ref={contentRef}>
        {React.isValidElement(children)
          ? React.cloneElement(children, { language, onSelectTopic })
          : children}
      </div>
      <style>{`
        .bm-module-page {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 0;
          background: ${pageBg};
        }
        .bm-module-content {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
        }
        .bm-module-content .pi-mhub-page { margin: 0 !important; }
      `}</style>
    </div>
  );
}
