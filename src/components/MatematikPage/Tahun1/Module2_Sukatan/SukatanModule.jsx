import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)',
  dark: '#4338CA',
  accent: '#6366F1',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#E0E7FF 0%,#A5B4FC 55%,#4338CA 100%)',
  pillGradient: 'linear-gradient(180deg,#6366F1,#4338CA)',
};

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'masa-t1',
    pill: 'TOPIK 2.1',
    title: 'Masa dan Waktu',
    desc: 'Belajar membaca jam dan memahami waktu dalam sehari.',
    visual: ROBOT,
  },
  {
    id: 'ukuran-t1-panjang',
    pill: 'TOPIK 2.2',
    title: 'Ukuran Panjang',
    desc: 'Ukur panjang menggunakan jengkal, langkah dan pembaris.',
    visual: ROBOT,
  },
  {
    id: 'ukuran-t1-jisim',
    pill: 'TOPIK 2.2',
    title: 'Ukuran Jisim',
    desc: 'Timbang objek dan bandingkan berat menggunakan unit bukan piawai.',
    visual: ROBOT,
  },
  {
    id: 'ukuran-t1-cecair',
    pill: 'TOPIK 2.2',
    title: 'Isi Padu Cecair',
    desc: 'Sukat isi padu cecair menggunakan cawan dan botol.',
    visual: ROBOT,
  },
  {
    id: 'ruang-t1',
    pill: 'TOPIK 2.3',
    title: 'Ruang (Bentuk 3D)',
    desc: 'Kenali bentuk 3D seperti kubus, silinder dan kon.',
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
