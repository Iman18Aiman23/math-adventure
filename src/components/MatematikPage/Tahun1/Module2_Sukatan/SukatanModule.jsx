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

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'masa-t1',
    pill: 'TOPIK 2.1',
    title: 'Baca Jam',
    desc: 'Kenali pagi, petang dan malam, kemudian baca waktu pada jam.',
    visual: ROBOT,
  },
  {
    id: 'ukuran-t1-panjang',
    pill: 'TOPIK 2.2',
    title: 'Ukur Panjang',
    desc: 'Banding panjang objek guna jengkal, langkah dan pembaris.',
    visual: ROBOT,
  },
  {
    id: 'ukuran-t1-jisim',
    pill: 'TOPIK 2.2',
    title: 'Banding Berat',
    desc: 'Timbang objek dan lihat mana lebih berat atau lebih ringan.',
    visual: ROBOT,
  },
  {
    id: 'ukuran-t1-cecair',
    pill: 'TOPIK 2.2',
    title: 'Sukat Air',
    desc: 'Banding banyak air dalam cawan, botol dan bekas.',
    visual: ROBOT,
  },
  {
    id: 'ruang-t1',
    pill: 'TOPIK 2.3',
    title: 'Kenal Bentuk 3D',
    desc: 'Lihat kubus, silinder, kon dan bentuk pepejal lain.',
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
