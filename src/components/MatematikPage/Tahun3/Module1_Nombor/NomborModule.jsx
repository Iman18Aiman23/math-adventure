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
    id: '3-nombor-10000',
    pill: 'TOPIK 1.1',
    title: 'Nombor hingga 10,000',
    desc: 'Baca, cerakinkan, susun dan bundarkan nombor besar.',
    visual: ROBOT,
  },
  {
    id: '3-darab',
    pill: 'TOPIK 1.2',
    title: 'Darab Nombor Besar',
    desc: 'Darab nombor hingga empat digit dengan satu digit secara tersusun.',
    visual: ROBOT,
  },
  {
    id: '3-bahagi',
    pill: 'TOPIK 1.2',
    title: 'Bahagi Nombor Besar',
    desc: 'Bahagi nombor besar kepada kumpulan sama banyak langkah demi langkah.',
    visual: ROBOT,
  },
  {
    id: '3-operasi-bergabung',
    pill: 'TOPIK 1.2',
    title: 'Campur Operasi',
    desc: 'Selesaikan soalan yang ada tambah, tolak, darab atau bahagi bersama.',
    visual: ROBOT,
  },
  {
    id: '3-pecahan',
    pill: 'TOPIK 1.3',
    title: 'Pecahan Lanjutan',
    desc: 'Banding pecahan, cari pecahan setara, tambah dan tolak pecahan.',
    visual: ROBOT,
  },
  {
    id: '3-perpuluhan',
    pill: 'TOPIK 1.3',
    title: 'Perpuluhan 2 Tempat',
    desc: 'Baca, tulis dan banding nilai seperti 0.25 dan 0.70.',
    visual: ROBOT,
  },
  {
    id: '3-peratus',
    pill: 'TOPIK 1.3',
    title: 'Faham Peratus',
    desc: 'Kenali peratus sebagai daripada 100 dan guna dalam soalan mudah.',
    visual: ROBOT,
  },
  {
    id: '3-wang',
    pill: 'TOPIK 1.4',
    title: 'Kira Wang Besar',
    desc: 'Tambah, tolak, darab dan bahagi wang hingga RM10,000.',
    visual: ROBOT,
  },
];

export default function NomborModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={1}
      moduleName="Nombor dan Operasi"
      moduleNameEn="Numbers and Operations"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
