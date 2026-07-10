import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at 18% 12%,rgba(139,92,246,.38),transparent 55%),radial-gradient(ellipse at 86% 22%,rgba(192,132,252,.22),transparent 50%),linear-gradient(160deg,#0A0826 0%,#0E0A2E 100%)',
  dark: '#6D28D9',
  cd: '#4C1D95',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,rgba(139,92,246,.18) 0%,rgba(20,18,52,.7) 55%,#08061E 100%)',
  pillGradient: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
};

const EXPLORE_CONFIG = {
  primitive: 'kenali-pecahan',
};

export default function KenaliPecahan({ onBack, language = 'bm' }) {
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
