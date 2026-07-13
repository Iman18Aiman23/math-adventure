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
    id: 'placeholder-selesaikan',
    pill: 'SEGERA HADIR',
    title: 'Selesaikan',
    desc: 'Kandungan akan ditambah tidak lama lagi.',
    visual: ROBOT,
    disabled: true,
  },
  {
    id: 'placeholder-latih-diri',
    pill: 'SEGERA HADIR',
    title: 'Latih Diri',
    desc: 'Kandungan akan ditambah tidak lama lagi.',
    visual: ROBOT,
    disabled: true,
  },
  {
    id: 'placeholder-cabar-minda',
    pill: 'SEGERA HADIR',
    title: 'Cabar Minda',
    desc: 'Kandungan akan ditambah tidak lama lagi.',
    visual: ROBOT,
    disabled: true,
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
