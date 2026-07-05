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

export default function LatihDiriM2({ onBack, language = 'bm', initialType }) {
  const exploreConfig = {
    primitive: 'latih-diri-m2',
    data: { initialType },
  };

  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM="Latihan Tambah Tolak"
      titleEN="Addition and Subtraction Practice"
      headerTitleBM="Latihan Tambah Tolak"
      headerTitleEN="Addition and Subtraction Practice"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      learn={<MatematikExplore config={exploreConfig} language={language} theme={THEME} onExit={onBack} />}
    />
  );
}
