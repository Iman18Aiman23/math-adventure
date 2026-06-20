import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT3 from '../../MatematikTopicRobotT3';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFF4E6 0%,#FACD94 50%,#E8821A 100%)',
  dark: '#C2410C',
  cd: '#FF6F00',
  accent: '#FF8F3D',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEE9C8 0%,#F5B76A 55%,#E8821A 100%)',
  pillGradient: 'linear-gradient(180deg,#FF8F3D,#FF6F00)',
};

// Shared graduate robot-head icon — recolours from THEME so every topic matches.
const ROBOT = <MatematikTopicRobotT3 theme={THEME} />;

const TOPICS = [
  {
    id: '3-nombor-10000',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 10,000',
    desc: 'Kenali nombor hingga 10,000 dengan nilai tempat dan bundaran.',
    visual: ROBOT,
  },
  {
    id: '3-darab',
    pill: 'TOPIK 1.2',
    title: 'Darab',
    desc: 'Darab nombor hingga empat digit dengan satu digit.',
    visual: ROBOT,
  },
  {
    id: '3-bahagi',
    pill: 'TOPIK 1.2',
    title: 'Bahagi',
    desc: 'Bahagi nombor hingga empat digit dengan satu digit.',
    visual: ROBOT,
  },
  {
    id: '3-operasi-bergabung',
    pill: 'TOPIK 1.2',
    title: 'Operasi Bergabung',
    desc: 'Gabung tambah, tolak, darab dan bahagi dalam satu soalan.',
    visual: ROBOT,
  },
  {
    id: '3-pecahan',
    pill: 'TOPIK 1.3',
    title: 'Pecahan',
    desc: 'Pecahan wajar, pecahan setara, tambah dan tolak pecahan.',
    visual: ROBOT,
  },
  {
    id: '3-perpuluhan',
    pill: 'TOPIK 1.3',
    title: 'Perpuluhan',
    desc: 'Baca, tulis dan banding nilai perpuluhan hingga dua tempat.',
    visual: ROBOT,
  },
  {
    id: '3-peratus',
    pill: 'TOPIK 1.3',
    title: 'Peratus',
    desc: 'Kenali peratus sebagai per-seratus dan kira peratus suatu kuantiti.',
    visual: ROBOT,
  },
  {
    id: '3-wang',
    pill: 'TOPIK 1.4',
    title: 'Wang hingga RM10,000',
    desc: 'Kira wang dan operasi dalam lingkungan nilai RM10,000.',
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
