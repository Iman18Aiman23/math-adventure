import React from 'react';
import Tahun1ModuleHubLayout from '../../../PendidikanIslamPage/Tahun1/Tahun1ModuleHubLayout';
import MatematikTopicRobot from '../../MatematikTopicRobot';

const THEME = {
  pageGradient: 'transparent',
  dark: '#60A5FA',
  cd: '#2563EB',
  accent: '#3B82F6',
  stageGradient: 'transparent',
  pillGradient: 'linear-gradient(180deg,#3B82F6,#1D4ED8)',
};

const TOPICS = [
  {
    id: 'm2-latih-diri',
    title: 'Latih Diri',
    desc: 'Latih tubi bertahap',
    visual: <MatematikTopicRobot accent="#2DE2E6" dark="#0E7490" badge="#2DE2E6" symbol="▶" />,
  },
  {
    id: 'm2-selesaikan',
    title: 'Selesaikan',
    desc: 'Penyelesaian masalah',
    visual: <MatematikTopicRobot accent="#2DE2E6" dark="#0E7490" badge="#2DE2E6" symbol="✓" />,
  },
  {
    id: 'm2-cabar-minda',
    title: 'Cabar Minda',
    desc: 'Cabaran lebih sukar',
    visual: <MatematikTopicRobot accent="#2DE2E6" dark="#0E7490" badge="#2DE2E6" symbol="★" />,
  },
];

export default function TambahDanTolakModule({ onSelectTopic, language = 'bm' }) {
  return (
    <Tahun1ModuleHubLayout
      moduleNum={2}
      moduleName="Tambah dan Tolak"
      moduleNameEn="Addition & Subtraction"
      theme={THEME}
      headerVariant="banner"
      bareStage
      topics={TOPICS}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
