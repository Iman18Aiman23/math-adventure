import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#E6F1FB 0%,#9FC9F2 50%,#1E7AC9 100%)',
  dark: '#1A5A96',
  cd: '#1A78C7',
  accent: '#36A9F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#D5E9FA 0%,#7DB8ED 55%,#1E7AC9 100%)',
  pillGradient: 'linear-gradient(180deg,#36A9F0,#1A78C7)',
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
        headerVariant="banner"
        bareStage
        topics={TOPICS}
        onSelectTopic={onSelectTopic}
        language={language}
      />
  );
}
