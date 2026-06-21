import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFFBEB 0%,#FDE68A 50%,#D97706 100%)',
  dark: '#B45309',
  cd: '#D97706',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEF3C7 0%,#FCD34D 55%,#D97706 100%)',
  pillGradient: 'linear-gradient(180deg,#F59E0B,#D97706)',
};

const EXPLORE_CONFIG = {
  primitive: 'pola-nombor',
  data: {},
};

export default function PolaNombor({ onBack, language = 'bm' }) {
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
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
