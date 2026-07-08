import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F5F3FF 0%,#C4B5FD 50%,#7C3AED 100%)',
  dark: '#5B21B6',
  cd: '#7C3AED',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#EDE9FE 0%,#A78BFA 55%,#7C3AED 100%)',
  pillGradient: 'linear-gradient(180deg,#8B5CF6,#7C3AED)',
};

const EXPLORE_CONFIG = {
  primitive: 'selesaikan-cerita-m1',
};

export default function SelesaikanCeritaM1({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM="Selesaikan Cerita"
      titleEN="Solve Story Problems"
      headerTitleBM="Selesaikan Cerita"
      headerTitleEN="Solve Story Problems"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
