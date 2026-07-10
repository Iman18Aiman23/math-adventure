import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'transparent',
  dark: '#6D28D9',
  cd: '#6D28D9',
  accent: '#8B5CF6',
  stageGradient: 'transparent',
  pillGradient: 'linear-gradient(180deg,#8B5CF6,#6D28D9)',
};

const ROBOT = <MatematikTopicRobot theme={THEME} />;

function FooterTrio({ language, theme }) {
  const isBM = language === 'bm';
  const items = [
    { id: 'selesaikan',  icon: '🧩', title: isBM ? 'Cerita Pecahan' : 'Fraction Stories', desc: isBM ? 'Guna pecahan dalam cerita' : 'Use fractions in stories' },
    { id: 'latih-diri',  icon: '⚡', title: isBM ? 'Latihan Pecahan' : 'Fraction Practice', desc: isBM ? 'Kenal bahagian sama besar' : 'Find equal parts' },
    { id: 'cabar-minda', icon: '🧠', title: isBM ? 'Cabaran Pecahan' : 'Fraction Challenge', desc: isBM ? 'Soalan pecahan lebih sukar' : 'Harder fraction questions' },
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
        <div key={item.id} className="mt-footer-trio-card">
          <span className="mt-footer-trio-icon">{item.icon}</span>
          <div className="mt-footer-trio-title">{item.title}</div>
          <div className="mt-footer-trio-desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

const ROBOT_HALF = <MatematikTopicRobot theme={THEME} symbol="½" badge={THEME.accent} glow={THEME.accent} />;
const ROBOT_QUARTER = <MatematikTopicRobot theme={THEME} symbol="¼" badge={THEME.accent} glow={THEME.accent} />;

const TOPICS = [
  {
    id: 'kenali-pecahan',
    pill: 'TOPIK 3.1',
    title: 'Kenali Pecahan',
    desc: 'Kenali setengah, suku, dua perempat dan tiga perempat.',
    visual: ROBOT_HALF,
    color: THEME.accent,
  },
  {
    id: 'placeholder-selesaikan',
    pill: 'SEGERA HADIR',
    title: 'Selesaikan Cerita Pecahan',
    desc: 'Akan datang: guna pecahan dalam cerita.',
    visual: ROBOT,
    disabled: true,
  },
  {
    id: 'placeholder-latih-diri',
    pill: 'SEGERA HADIR',
    title: 'Latih Diri Pecahan',
    desc: 'Akan datang: latih kendiri pecahan.',
    visual: ROBOT,
    disabled: true,
  },
  {
    id: 'placeholder-cabar-minda',
    pill: 'SEGERA HADIR',
    title: 'Cabaran Pecahan',
    desc: 'Akan datang: cabaran pecahan lebih sukar.',
    visual: ROBOT,
    disabled: true,
  },
];

export default function PecahanModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Pecahan"
      moduleNameEn="Fractions"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
      footer={<FooterTrio language={language} theme={THEME} />}
    />
  );
}
