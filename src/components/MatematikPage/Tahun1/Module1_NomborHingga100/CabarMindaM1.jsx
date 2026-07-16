import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F7FEE7 0%,#DCFCE7 55%,#86EFAC 100%)',
  dark: '#15803D',
  cd: '#16A34A',
  accent: '#22C55E',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F7FEE7 0%,#BBF7D0 58%,#86EFAC 100%)',
  pillGradient: 'linear-gradient(180deg,#86EFAC,#22C55E)',
};

const EXPLORE_CONFIG = {
  primitive: 'cabar-minda-m1',
  scoreId: 'cabar-minda-m1',
};

export default function CabarMindaM1({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM="Cabaran"
      titleEN="Challenge"
      headerTitleBM="Cabaran Modul 1"
      headerTitleEN="Module 1 Challenge"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      formalMode={true}
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
