import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)',
  dark: '#7E22CE',
  accent: '#A855F7',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#F3E8FF 0%,#D8B4FE 55%,#7E22CE 100%)',
  pillGradient: 'linear-gradient(180deg,#A855F7,#7E22CE)',
};

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'data-t1',
    pill: 'TOPIK 3.1',
    title: 'Pengurusan Data',
    desc: 'Kumpul dan baca data daripada piktograf dengan mudah.',
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
        topics={TOPICS}
        onSelectTopic={onSelectTopic}
        language={language}
      />
  );
}
