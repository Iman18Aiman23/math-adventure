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

const ROBOT = <MatematikTopicRobot theme={THEME} />;
const ROBOT_HALF = <MatematikTopicRobot theme={THEME} symbol="1/2" badge={THEME.accent} glow={THEME.accent} />;

const TOPICS = [
  {
    id: 'kenali-pecahan',
    pill: 'TOPIK 3.1',
    title: 'Kenali Pecahan',
    desc: 'Kenali setengah, suku, dua perempat dan tiga perempat.',
    visual: ROBOT_HALF,
    color: THEME.accent,
  },
  {
    id: 'selesaikan-pecahan',
    pill: 'SELESAIKAN',
    title: 'Jawab Pecahan',
    desc: 'Jawab soalan pecahan melalui pilihan jawapan dan lorekan gambar.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'latih-diri-pecahan',
    pill: 'LATIH TUBI',
    title: 'Latih Tubi Pecahan',
    desc: 'Kenal pasti bahagian sama besar.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'cabar-minda-pecahan',
    pill: 'UJIAN',
    title: 'Ujian Pecahan',
    desc: '30 soalan daripada Kenali Pecahan dan Jawab Pecahan.',
    visual: ROBOT,
    color: THEME.accent,
  },
];

export default function PecahanModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Pecahan"
      moduleNameEn="Fractions"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
