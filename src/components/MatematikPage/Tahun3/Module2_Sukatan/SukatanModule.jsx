import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT3 from '../../MatematikTopicRobotT3';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F0EBFB 0%,#C3ABF0 50%,#7A4FD0 100%)',
  dark: '#6D28D9',
  cd: '#7038D6',
  accent: '#A368F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#EBE2FB 0%,#B49EEE 55%,#7A4FD0 100%)',
  pillGradient: 'linear-gradient(180deg,#A368F0,#7038D6)',
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
    title: 'Ukuran',
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
