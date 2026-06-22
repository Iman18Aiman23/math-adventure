import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#EFF6FF 0%,#93C5FD 50%,#1D4ED8 100%)',
  dark: '#1E3A8A',
  cd: '#1D4ED8',
  accent: '#3B82F6',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#DBEAFE 0%,#60A5FA 55%,#1D4ED8 100%)',
  pillGradient: 'linear-gradient(180deg,#3B82F6,#1D4ED8)',
};

const ROBOT = <MatematikTopicRobot theme={THEME} />;

function FooterTrio({ language, theme }) {
  const isBM = language === 'bm';
  const items = [
    { id: 'selesaikan',  icon: '🧩', title: isBM ? 'Selesaikan' : 'Solve',        desc: isBM ? 'Penyelesaian masalah' : 'Problem solving' },
    { id: 'latih-diri',  icon: '⚡', title: isBM ? 'Latih Diri' : 'Self Drill',   desc: isBM ? 'Latih tubi bertahap' : 'Timed leveled drill' },
    { id: 'cabar-minda', icon: '🧠', title: isBM ? 'Cabar Minda' : 'Challenge',   desc: isBM ? 'Cabaran lebih sukar' : 'Harder challenge' },
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

const TOPICS = [
  {
    id: 'kenali-tambah',
    pill: 'KENALI TAMBAH',
    title: 'Kenali Tambah',
    desc: 'Kenali konsep tambah dan jumlah.',
    visual: ROBOT,
  },
  {
    id: 'latihan-tambah',
    pill: 'LATIHAN TAMBAH',
    title: 'Latihan Tambah',
    desc: 'Latih tambah tiga aras: mudah, sederhana, sukar.',
    visual: ROBOT,
  },
];

export default function TambahDanTolakModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Tambah dan Tolak"
      moduleNameEn="Addition & Subtraction"
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
