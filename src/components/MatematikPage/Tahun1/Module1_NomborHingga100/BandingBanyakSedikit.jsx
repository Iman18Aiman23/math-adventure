import React from 'react';
import MatematikTopicShell from '../../_shared/MatematikTopicShell';
import MatematikExplore from '../../_shared/MatematikExplore';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFFBEB 0%,#FDE68A 50%,#D97706 100%)',
  dark: '#B45309',
  cd: '#D97706',
  accent: '#F59E0B',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEF3C7 0%,#FCD34D 55%,#D97706 100%)',
  pillGradient: 'linear-gradient(180deg,#F59E0B,#D97706)',
};

const EXPLORE_CONFIG = {
  primitive: 'compare',
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
      titleBM=""
      titleEN=""
      subtitleBM=""
      subtitleEN=""
      showToggle={false}
      showReadyCta={false}
      learn={<MatematikExplore config={EXPLORE_CONFIG} language={language} theme={THEME} onExit={onBack} />}
      quiz={<KuizPlaceholder language={language} />}
    />
  );
}
