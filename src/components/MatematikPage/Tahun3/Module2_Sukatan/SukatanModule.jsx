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
    title: 'Masa, Minit dan Saat',
    desc: 'Baca waktu tepat dan kira tempoh menggunakan jam, minit dan saat.',
    visual: ROBOT,
  },
  {
    id: '3-ukuran',
    pill: 'TOPIK 2.2',
    title: 'Tukar Unit Ukuran',
    desc: 'Tukar antara m, cm, kg, g, l dan ml dalam soalan harian.',
    visual: ROBOT,
  },
  {
    id: '3-perimeter',
    pill: 'TOPIK 2.3',
    title: 'Luas dan Keliling',
    desc: 'Kira ruang dalam bentuk dan jumlah panjang di sekelilingnya.',
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
