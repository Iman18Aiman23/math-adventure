import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  dark: '#15803D',
  cd: '#16A34A',
  accent: '#22C55E',
};

export default function UkuranTopicPage({ primitive, onBack, language = 'bm' }) {
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
      learn={<MatematikExplore config={{ primitive }} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
