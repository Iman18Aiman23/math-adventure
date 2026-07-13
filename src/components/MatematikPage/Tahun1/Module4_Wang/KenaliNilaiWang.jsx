import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'radial-gradient(ellipse at 18% 12%,rgba(16,185,129,.38),transparent 55%),radial-gradient(ellipse at 86% 22%,rgba(52,211,153,.22),transparent 50%),linear-gradient(160deg,#022C22 0%,#064E3B 50%,#065F46 100%)',
  dark: '#047857',
  cd: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,rgba(16,185,129,.18) 0%,rgba(6,78,59,.7) 55%,#022C22 100%)',
  pillGradient: 'linear-gradient(135deg,#10B981,#047857)',
};

const EXPLORE_CONFIG = {
  primitive: 'kenali-nilai-wang',
};

export default function KenaliNilaiWang({ onBack, language = 'bm' }) {
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
