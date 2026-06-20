import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT2 from '../../MatematikTopicRobotT2';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F0EBFB 0%,#C3ABF0 50%,#7A4FD0 100%)',
  dark: '#6D28D9',
  cd: '#7038D6',
  accent: '#A368F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#EBE2FB 0%,#B49EEE 55%,#7A4FD0 100%)',
  pillGradient: 'linear-gradient(180deg,#A368F0,#7038D6)',
};

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobotT2 theme={THEME} />;

const TOPICS = [
  {
    id: '2-data',
    pill: 'TOPIK 3.1',
    title: 'Pengurusan Data',
    desc: 'Baca, tafsir dan banding data daripada piktograf dan carta palang.',
    visual: ROBOT,
  },
];

export default function StatistikModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Statistik"
      moduleNameEn="Statistics"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
