import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';
import SpaceBackground from '../../_shared/SpaceBackground';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at 18% 12%,rgba(124,77,238,.38),transparent 55%),radial-gradient(ellipse at 86% 22%,rgba(255,79,216,.22),transparent 50%),linear-gradient(160deg,#0A0826 0%,#0E0A2E 100%)',
  dark: '#7C4DEE',
  cd: '#5B21B6',
  accent: '#2DE2E6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,rgba(45,226,230,.18) 0%,rgba(20,18,52,.7) 55%,#08061E 100%)',
  pillGradient: 'linear-gradient(135deg,#2DE2E6,#FF4FD8)',
};

const EXPLORE_CONFIG = {
  primitive: 'latih-diri-m2',
};

export default function LatihDiriM2({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM=""
      titleEN=""
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      background={<SpaceBackground />}
      darkChrome
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
