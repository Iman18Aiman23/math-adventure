import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT2 from '../../MatematikTopicRobotT2';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)',
  dark: '#4338CA',
  accent: '#6366F1',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#E0E7FF 0%,#A5B4FC 55%,#4338CA 100%)',
  pillGradient: 'linear-gradient(180deg,#6366F1,#4338CA)',
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
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
