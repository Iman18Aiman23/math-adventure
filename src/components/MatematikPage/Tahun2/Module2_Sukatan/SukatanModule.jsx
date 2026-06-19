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
    id: '2-masa',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Baca jam dalam minit dan fahami perkaitan unit masa.',
    visual: ROBOT,
  },
  {
    id: '2-ukuran-panjang',
    pill: 'TOPIK 2.2',
    title: 'Ukuran Panjang',
    desc: 'Gunakan meter dan sentimeter untuk mengukur panjang.',
    visual: ROBOT,
  },
  {
    id: '2-ukuran-jisim-cecair',
    pill: 'TOPIK 2.2',
    title: 'Jisim & Isi Padu Cecair',
    desc: 'Timbang jisim dalam kg dan g, sukat isi padu cecair dalam l dan ml.',
    visual: ROBOT,
  },
  {
    id: '2-geometri',
    pill: 'TOPIK 2.3',
    title: 'Ruang (Geometri)',
    desc: 'Kenali bentuk 2D dan 3D serta ciri-ciri seperti sisi, sudut dan bucu.',
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
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
