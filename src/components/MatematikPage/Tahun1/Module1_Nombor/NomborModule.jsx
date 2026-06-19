import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#FFF4E6 0%,#FACD94 50%,#E8821A 100%)',
  dark: '#C2410C',
  cd: '#FF6F00',
  accent: '#FF8F3D',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FEE9C8 0%,#F5B76A 55%,#E8821A 100%)',
  pillGradient: 'linear-gradient(180deg,#FF8F3D,#FF6F00)',
};

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'nombor-100',
    pill: 'TOPIK 1.1',
    title: 'Nombor Bulat hingga 100',
    desc: 'Kenali nombor 1 hingga 100, nilai tempat, dan pola nombor.',
    visual: ROBOT,
  },
  {
    id: 'tambah-tolak',
    pill: 'TOPIK 1.2',
    title: 'Operasi Tambah',
    desc: 'Belajar menambah nombor dalam lingkungan 100 dengan mudah.',
    visual: ROBOT,
  },
  {
    id: 'tambah-cerita',
    pill: 'TOPIK 1.2',
    title: 'Cerita Tolak',
    desc: 'Selesaikan masalah harian dengan operasi tolak.',
    visual: ROBOT,
  },
  {
    id: 'pecahan-asas',
    pill: 'TOPIK 1.3',
    title: 'Pecahan Asas',
    desc: 'Kenali pecahan 1/2, 1/4 dan 3/4 melalui bentuk dan gambar rajah.',
    visual: ROBOT,
  },
  {
    id: 'wang-t1',
    pill: 'TOPIK 1.4',
    title: 'Wang (Ringgit & Sen)',
    desc: 'Kenali wang Malaysia dan kira nilai ringgit dan sen.',
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
        topics={TOPICS}
        onSelectTopic={onSelectTopic}
        language={language}
      />
  );
}
