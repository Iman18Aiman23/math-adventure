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
    title: 'Nombor 1 hingga 1,000',
    desc: 'Baca, susun dan faham nilai tempat hingga ratus.',
    visual: ROBOT,
  },
  {
    id: '2-tambah',
    pill: 'TOPIK 1.2',
    title: 'Tambah 3 Digit',
    desc: 'Tambah nombor besar langkah demi langkah, dengan atau tanpa kumpul semula.',
    visual: ROBOT,
  },
  {
    id: '2-tolak',
    pill: 'TOPIK 1.2',
    title: 'Tolak 3 Digit',
    desc: 'Cari baki nombor besar dengan susun tempat sa, puluh dan ratus.',
    visual: ROBOT,
  },
  {
    id: '2-darab',
    pill: 'TOPIK 1.3',
    title: 'Darab Mudah',
    desc: 'Faham darab sebagai kumpulan sama banyak dan latih sifir asas.',
    visual: ROBOT,
  },
  {
    id: '2-bahagi',
    pill: 'TOPIK 1.3',
    title: 'Bahagi Sama Rata',
    desc: 'Bahagikan objek kepada kumpulan sama banyak dan cari jawapan.',
    visual: ROBOT,
  },
  {
    id: '2-pecahan',
    pill: 'TOPIK 1.4',
    title: 'Pecahan Mudah',
    desc: 'Lihat bahagian sama besar dan bandingkan pecahan yang lebih besar.',
    visual: ROBOT,
  },
  {
    id: '2-perpuluhan',
    pill: 'TOPIK 1.4',
    title: 'Nombor Perpuluhan',
    desc: 'Kenali nilai 0.1 hingga 0.9 dengan petak dan garis nombor.',
    visual: ROBOT,
  },
  {
    id: '2-wang',
    pill: 'TOPIK 1.5',
    title: 'Kira Wang hingga RM100',
    desc: 'Tambah, tolak dan banding jumlah wang dalam situasi membeli-belah.',
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
