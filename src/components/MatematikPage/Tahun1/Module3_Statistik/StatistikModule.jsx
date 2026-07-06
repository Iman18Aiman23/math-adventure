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

// Shared robot icon — recolours from THEME so every topic in this module matches.
const ROBOT = <MatematikTopicRobot theme={THEME} />;

const TOPICS = [
  {
    id: 'data-t1',
    pill: 'TOPIK 3.1',
    title: 'Baca Carta Gambar',
    desc: 'Kira gambar dalam piktograf dan jawab soalan tentang data.',
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
