import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'transparent',
  dark: '#047857',
  cd: '#047857',
  accent: '#10B981',
  stageGradient: 'transparent',
  pillGradient: 'linear-gradient(180deg,#10B981,#047857)',
};

const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'kenali-nilai-wang',
    pill: 'KENALI & NILAI WANG',
    title: 'Kenali & Nilai Wang',
    desc: 'Kenali syiling, wang kertas dan nilai wang Malaysia.',
    visual: ROBOT,
  },
  {
    id: 'tukar-wang',
    pill: 'TUKAR WANG',
    title: 'Tukar Wang',
    desc: 'Tukar wang dengan nilai yang sama dalam bentuk berbeza.',
    visual: ROBOT,
  },
  {
    id: 'dapat-catat-wang',
    pill: 'DAPAT & CATAT WANG',
    title: 'Dapat & Catat Wang',
    desc: 'Dapat wang dan catat jumlah dengan betul.',
    visual: ROBOT,
  },
  {
    id: 'selesaikan-wang',
    pill: 'SELESAIKAN',
    title: 'Selesaikan Wang',
    desc: 'Selesaikan masalah wang, harga dan baki.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'latih-diri-wang',
    pill: 'LATIH DIRI',
    title: 'Latih Diri Wang',
    desc: 'Latihan pantas kenal, hitung dan tukar wang.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'cabar-minda-wang',
    pill: 'CABAR MINDA',
    title: 'Ujian Wang',
    desc: '30 soalan cabaran daripada Modul Wang.',
    visual: ROBOT,
    color: THEME.accent,
  },
];

export default function WangModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={4}
      moduleName="Wang"
      moduleNameEn="Money"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
