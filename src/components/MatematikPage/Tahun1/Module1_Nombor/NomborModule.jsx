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
    visual: robot('1/2', '#16A34A', '#16A34A'),
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
