import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'transparent',
  dark: '#6D28D9',
  cd: '#6D28D9',
  accent: '#8B5CF6',
  stageGradient: 'transparent',
  pillGradient: 'linear-gradient(180deg,#8B5CF6,#6D28D9)',
};

// Shared robot icon — recolours from THEME so every topic in this module matches.
const robot = (symbol, badge, glow) => (
  <MatematikTopicRobot theme={THEME} symbol={symbol} badge={badge} glow={glow} />
);

const TOPICS = [
  {
    id: 'nombor-100',
    pill: 'TOPIK 1.1',
    title: 'Nombor 1 hingga 100',
    desc: 'Belajar sebut, baca, susun dan faham nilai nombor hingga 100.',
    visual: robot('N', '#14B8A6', '#14B8A6'),
  },
  {
    id: 'tambah-tolak',
    pill: 'TOPIK 1.2',
    title: 'Tambah Nombor',
    desc: 'Gabungkan dua nombor dan cari jumlah dengan langkah mudah.',
    visual: robot('+', '#FF9600', '#FF9600'),
  },
  {
    id: 'tambah-cerita',
    pill: 'TOPIK 1.2',
    title: 'Tolak Dalam Cerita',
    desc: 'Baca cerita pendek, pilih nombor penting, kemudian cari baki.',
    visual: robot('−', '#F43F5E', '#F43F5E'),
  },
  {
    id: 'pecahan-asas',
    pill: 'TOPIK 1.3',
    title: 'Separuh dan Suku',
    desc: 'Kenali bahagian sama besar seperti separuh, suku dan tiga suku.',
    visual: robot('½', '#8B5CF6', '#8B5CF6'),
  },
  {
    id: 'wang-t1',
    pill: 'TOPIK 1.4',
    title: 'Kenal dan Kira Wang',
    desc: 'Kenali duit Malaysia, kira sen dan ringgit dalam situasi mudah.',
    visual: robot('RM', '#10B981', '#10B981'),
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
