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
    title: 'Belajar 1-10,000',
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
    title: 'Wang',
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
