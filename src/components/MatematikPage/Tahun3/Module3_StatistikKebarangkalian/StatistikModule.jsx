import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobotT3 from '../../MatematikTopicRobotT3';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F0EBFB 0%,#C3ABF0 50%,#7A4FD0 100%)',
  dark: '#6D28D9',
  cd: '#7038D6',
  accent: '#A368F0',
  stageGradient: 'radial-gradient(ellipse at 50% 34%,#EBE2FB 0%,#B49EEE 55%,#7A4FD0 100%)',
  pillGradient: 'linear-gradient(180deg,#A368F0,#7038D6)',
};

// Shared graduate robot-head icon — recolours from THEME so every topic matches.
const ROBOT = <MatematikTopicRobotT3 theme={THEME} />;

const TOPICS = [
  {
    id: '3-data',
    pill: 'TOPIK 3.1',
    title: 'Pengurusan Data',
    desc: 'Baca dan tafsir data daripada carta palang, jadual dan jadual kekerapan.',
    visual: ROBOT,
  },
  {
    id: '3-kebarangkalian',
    pill: 'TOPIK 3.2',
    title: 'Kebarangkalian Asas',
    desc: 'Fahami konsep mesti, mungkin dan tidak mungkin berlaku.',
    visual: ROBOT,
  },
];

export default function StatistikModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={3}
      moduleName="Statistik dan Kebarangkalian"
      moduleNameEn="Statistics and Probability"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
