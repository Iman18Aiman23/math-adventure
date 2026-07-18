import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  dark: '#15803D',
  cd: '#16A34A',
  accent: '#22C55E',
};

const EXPLORE_CONFIG = { primitive: 'cabar-minda-masa' };

export default function CabarMindaMasa({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM="Ujian Masa"
      titleEN="Time Exam"
      headerTitleBM="Ujian Masa"
      headerTitleEN="Time Exam"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      formalMode
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
