import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F7FEE7 0%,#DCFCE7 55%,#86EFAC 100%)',
  dark: '#15803D',
  cd: '#16A34A',
  accent: '#22C55E',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F7FEE7 0%,#BBF7D0 58%,#86EFAC 100%)',
  pillGradient: 'linear-gradient(180deg,#86EFAC,#22C55E)',
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
