import React from 'react';
import GameMenu from './GameMenu';

export default function OpsLandingPage({ onStart, onBack, onHome, language }) {
  // Go directly to GameMenu for Operasi Matematik
  return (
    <GameMenu
      onStart={onStart}
      onBack={onBack}
      onHome={onHome}
      language={language}
    />
  );
}
