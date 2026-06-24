import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#EFF6FF 0%,#93C5FD 50%,#1D4ED8 100%)',
  dark: '#1E3A8A',
  cd: '#1D4ED8',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#60A5FA 55%,#1D4ED8 100%)',
  pillGradient: 'linear-gradient(180deg,#3B82F6,#1D4ED8)',
};

const EXPLORE_CONFIG = {
  primitive: 'tambah-berulang',
};

export default function TambahBerulang({ onBack, language = 'bm' }) {
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