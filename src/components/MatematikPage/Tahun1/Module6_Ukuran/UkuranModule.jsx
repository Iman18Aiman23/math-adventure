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

const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'm6-ukur-topik',
    pill: 'TOPIK 6.1',
    title: 'Panjang, Jisim & Isi Padu',
    desc: 'Kenali ukuran objek, berat dan cecair.',
    visual: ROBOT,
    color: THEME.accent,
    actions: [
      { id: 'kenali-ukur-objek', label: 'Kenali Alat', icon: 'calculator' },
      { id: 'ukur-banding-panjang', label: 'Kenali Panjang dan Jarak', icon: 'repeat' },
      { id: 'kenali-jisim', label: 'Kenali Jisim Objek', icon: 'type' },
      { id: 'kenali-isi-padu', label: 'Kenali Isi Padu dan Banding', icon: 'calculator' },
    ],
  },
  {
    id: 'selesaikan-ukuran',
    pill: 'SELESAIKAN',
    title: 'Selesaikan',
    desc: 'Latihan masalah ukuran harian.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'latih-diri-ukuran',
    pill: 'LATIH DIRI',
    title: 'Latih Tubi',
    desc: 'Latihan pantas panjang, jisim dan cecair.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'cabar-minda-ukuran',
    pill: 'UJIAN',
    title: 'Ujian',
    desc: '30 soalan daripada Modul Ukuran.',
    visual: ROBOT,
    color: THEME.accent,
  },
];

export default function UkuranModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={6}
      moduleName="Panjang, Jisim dan Isi Padu Cecair"
      moduleNameEn="Length, Mass and Liquid Volume"
      theme={THEME}
      headerVariant="banner"
      layoutVariant="dashboard"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
