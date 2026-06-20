import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT3 from '../../MatematikTopicRobotT3';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)',
  dark: '#1A5A96',
  cd: '#1A78C7',
  accent: '#36A9F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#D5E9FA 0%,#7DB8ED 55%,#1E7AC9 100%)',
  pillGradient: 'linear-gradient(180deg,#36A9F0,#1A78C7)',
};

// Shared graduate robot-head icon — recolours from THEME so every topic matches.
const ROBOT = <MatematikTopicRobotT3 theme={THEME} />;

const TOPICS = [
  {
    id: '3-masa',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Baca waktu dalam minit dan saat, serta operasi melibatkan masa.',
    visual: ROBOT,
  },
  {
    id: '3-ukuran',
    pill: 'TOPIK 2.2',
    title: 'Ukuran (Panjang, Jisim & Cecair)',
    desc: 'Tukar unit panjang, jisim dan isi padu cecair antara unit metrik.',
    visual: ROBOT,
  },
  {
    id: '3-perimeter',
    pill: 'TOPIK 2.3',
    title: 'Luas dan Perimeter',
    desc: 'Kira luas menggunakan petak segi empat sama dan perimeter bentuk 2D.',
    visual: ROBOT,
  },
];

export default function SukatanModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Sukatan dan Geometri"
      moduleNameEn="Measurement and Geometry"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
