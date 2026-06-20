import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT2 from '../../MatematikTopicRobotT2';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)',
  dark: '#1A5A96',
  cd: '#1A78C7',
  accent: '#36A9F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#D5E9FA 0%,#7DB8ED 55%,#1E7AC9 100%)',
  pillGradient: 'linear-gradient(180deg,#36A9F0,#1A78C7)',
};

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobotT2 theme={THEME} />;

const TOPICS = [
  {
    id: '2-nombor-1000',
    pill: 'TOPIK 1.1',
    title: 'Belajar 1-1,000',
    desc: 'Kenali nombor 1 hingga 1,000 dengan nilai tempat dan bundaran.',
    visual: ROBOT,
  },
  {
    id: '2-tambah',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tambah',
    desc: 'Tambah nombor hingga tiga digit dengan pelbagai kaedah.',
    visual: ROBOT,
  },
  {
    id: '2-tolak',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tolak',
    desc: 'Tolak nombor hingga tiga digit dengan mudah.',
    visual: ROBOT,
  },
  {
    id: '2-darab',
    pill: 'TOPIK 1.3',
    title: 'Darab',
    desc: 'Pelajari konsep darab dengan sifir 2 hingga 10.',
    visual: ROBOT,
  },
  {
    id: '2-bahagi',
    pill: 'TOPIK 1.3',
    title: 'Bahagi',
    desc: 'Bahagi nombor dalam lingkungan 100 dengan konsep kumpulan sama banyak.',
    visual: ROBOT,
  },
  {
    id: '2-pecahan',
    pill: 'TOPIK 1.4',
    title: 'Pecahan',
    desc: 'Kenali pecahan wajar dan bandingkan nilai pecahan.',
    visual: ROBOT,
  },
  {
    id: '2-perpuluhan',
    pill: 'TOPIK 1.4',
    title: 'Perpuluhan',
    desc: 'Kenali perpuluhan 0.1 hingga 0.9 menggunakan visual grid.',
    visual: ROBOT,
  },
  {
    id: '2-wang',
    pill: 'TOPIK 1.5',
    title: 'Wang',
    desc: 'Kira wang dan lakukan operasi tambah tolak dalam lingkungan RM100.',
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
