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
  primitive: 'compare',
  scoreId: 'banding-banyak-sedikit',
  data: {},
};

function KuizPlaceholder({ language }) {
  return (
    <div style={{
      textAlign: 'center', padding: '60px 20px',
      fontFamily: "'Fredoka', sans-serif", color: '#5B6B7B'
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🧩</div>
      <p style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: '#10243A' }}>
        {language === 'bm' ? 'Segera Hadir' : 'Coming Soon'}
      </p>
      <p style={{ fontSize: 14, margin: 0, lineHeight: 1.6 }}>
        {language === 'bm'
          ? 'Kuiz untuk topik ini akan ditambah dalam kemas kini akan datang. Sila gunakan mod Belajar buat masa ini.'
          : 'Quiz for this topic will be added in a future update. Please use the Learn mode for now.'}
      </p>
    </div>
  );
}

export default function BandingBanyakSedikit({ onBack, language = 'bm' }) {
  return (
    <MatematikTopicShell
      language={language}
      onBack={onBack}
      theme={THEME}
      emoji=""
      titleBM="Banyak, Sedikit, Lebih atau Kurang"
      titleEN="More, Less, Greater or Fewer"
      headerTitleBM="Pembelajaran Banyak atau Sedikit"
      headerTitleEN="Learning More or Less"
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
      quiz={<KuizPlaceholder language={language} />}
    />
  );
}
