import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'transparent',
  dark: '#60A5FA',
  cd: '#2563EB',
  accent: '#3B82F6',
  stageGradient: 'transparent',
  pillGradient: 'linear-gradient(180deg,#3B82F6,#1D4ED8)',
};

const robotFor = (symbol, badge = '#FFB547') => (
  <MatematikTopicRobot theme={THEME} badge={badge} symbol={symbol} />
);

function FooterTrio({ language, theme, onSelectTopic }) {
  const isBM = language === 'bm';
  const items = [
    { id: 'selesaikan',  icon: '🧩', title: isBM ? 'Selesaikan' : 'Solve',        desc: isBM ? 'Penyelesaian masalah' : 'Problem solving', enabled: true },
    { id: 'latih-diri',  icon: '⚡', title: isBM ? 'Latih Diri' : 'Self Drill',   desc: isBM ? 'Latih tubi bertahap' : 'Timed leveled drill', enabled: true },
    { id: 'cabar-minda', icon: '🧠', title: isBM ? 'Cabar Minda' : 'Challenge',   desc: isBM ? 'Cabaran lebih sukar' : 'Harder challenge', enabled: true },
  ];
  return (
    <div className="mt-footer-trio">
      <style>{`
        .mt-footer-trio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 720px;
          margin: 0 auto;
        }
        .mt-footer-trio-card {
          background: #fff;
          border-radius: 20px;
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          border: 2px solid ${theme.accent}44;
          box-shadow: 0 6px 20px -10px ${theme.dark}30;
          opacity: 0.7;
          filter: grayscale(0.4);
          cursor: default;
          pointer-events: none;
          text-align: center;
        }
        .mt-footer-trio-card.is-enabled {
          opacity: 1;
          filter: none;
          cursor: pointer;
          pointer-events: auto;
          transition: transform .12s ease, box-shadow .12s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .mt-footer-trio-card.is-enabled:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 26px -10px ${theme.dark}55;
        }
        .mt-footer-trio-card.is-enabled:active { transform: translateY(0); }
        .mt-footer-trio-icon { font-size: 28px; }
        .mt-footer-trio-title {
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: ${theme.dark};
          margin: 0;
        }
        .mt-footer-trio-desc {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 11px;
          color: #5B6B7B;
          margin: 0;
        }
        @media (max-width: 560px) {
          .mt-footer-trio { grid-template-columns: 1fr; max-width: 300px; }
        }
      `}</style>
      {items.map(item => (
        <div
          key={item.id}
          className={`mt-footer-trio-card${item.enabled ? ' is-enabled' : ''}`}
          role={item.enabled ? 'button' : undefined}
          tabIndex={item.enabled ? 0 : undefined}
          onClick={item.enabled ? () => onSelectTopic?.(item.id) : undefined}
          onKeyDown={item.enabled ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectTopic?.(item.id); } } : undefined}
        >
          <span className="mt-footer-trio-icon">{item.icon}</span>
          <div className="mt-footer-trio-title">{item.title}</div>
          <div className="mt-footer-trio-desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

const TOPICS = [
  {
    id: 'banding-banyak-sedikit',
    pill: 'BANYAK DAN SEDIKIT',
    title: 'Banyak, Sedikit, Lebih atau Kurang',
    desc: 'Bandingkan banyak atau sedikit, lebih atau kurang.',
    visual: robotFor('<', '#22C55E'),
  },
  {
    id: 'kenali-0-10',
    pill: 'KENALI 0 HINGGA 10',
    title: 'Kenali 0 hingga 10',
    desc: 'Kenali nombor 0 hingga 10.',
    visual: robotFor('10', '#38BDF8'),
  },
  {
    id: 'kenali-11-20',
    pill: 'KENALI 11 HINGGA 20',
    title: 'Kenali 11 hingga 20',
    desc: 'Kenali nombor 11 hingga 20.',
    visual: robotFor('20', '#60A5FA'),
  },
  {
    id: 'tulis-0-20',
    pill: 'TULIS 0 HINGGA 20',
    title: 'Tulis 0 hingga 20',
    desc: 'Tulis nombor 0 hingga 20 dengan jari.',
    visual: robotFor('0', '#F97316'),
  },
  {
    id: 'kombinasi-nombor',
    pill: 'KOMBINASI NOMBOR',
    title: 'Kombinasi Nombor',
    desc: 'Gabungkan nombor untuk jadi 10.',
    visual: robotFor('+', '#FACC15'),
  },
  {
    id: 'kenali-21-100',
    pill: 'KENALI 21 HINGGA 100',
    title: 'Kenali 21 hingga 100',
    desc: 'Kenali nombor 21 hingga 100.',
    visual: robotFor('100', '#A78BFA'),
  },
  {
    id: 'nilai-tempat',
    pill: 'NILAI TEMPAT & NILAI DIGIT',
    title: 'Nilai Tempat & Nilai Digit',
    desc: 'Kenali nilai tempat dan nilai digit.',
    visual: robotFor('P', '#FB7185'),
  },
  {
    id: 'susunan-nombor',
    pill: 'SUSUNAN NOMBOR',
    title: 'Susunan Nombor',
    desc: 'Susun dan lengkapkan urutan nombor.',
    visual: robotFor('1-3', '#2DD4BF'),
  },
  {
    id: 'pola-nombor',
    pill: 'POLA NOMBOR',
    title: 'Pola Nombor',
    desc: 'Kenal pasti dan sambung pola nombor.',
    visual: robotFor('...', '#818CF8'),
  },
  {
    id: 'anggar-bundar',
    pill: 'ANGGAR & BUNDAR',
    title: 'Anggar & Bundar',
    desc: 'Anggar bilangan dan bundarkan kepada puluh.',
    visual: robotFor('~', '#F59E0B'),
  },
];

export default function NomborHingga100Module({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={1}
      moduleName="Nombor Hingga 100"
      moduleNameEn="Numbers to 100"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
      footer={<FooterTrio language={language} theme={THEME} onSelectTopic={onSelectTopic} />}
    />
  );
}
