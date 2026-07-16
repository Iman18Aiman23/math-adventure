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
