import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F5F3FF 0%,#EDE9FE 50%,#DDD6FE 100%)',
  dark: '#6D28D9',
  cd: '#5B21B6',
  accent: '#8B5CF6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F5F3FF 0%,#EDE9FE 55%,#DDD6FE 100%)',
  pillGradient: 'linear-gradient(180deg,#8B5CF6,#6D28D9)',
};

const EXPLORE_CONFIG = {
  primitive: 'cabar-minda-pecahan',
  scoreId: 'ujian-pecahan',
  data: {},
};

export default function CabarMindaPecahan({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM="Ujian Pecahan"
      titleEN="Fractions Exam"
      headerTitleBM="Ujian Pecahan"
      headerTitleEN="Fractions Exam"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      formalMode={true}
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
