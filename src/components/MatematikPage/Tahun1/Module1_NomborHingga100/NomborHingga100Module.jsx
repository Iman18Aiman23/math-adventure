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

const TOPIC_COLORS = ['#8B5CF6', '#8B5CF6', '#8B5CF6', '#8B5CF6', '#8B5CF6'];
const robotFor = (symbol, color = THEME.accent) => (
  <MatematikTopicRobot theme={THEME} badge={color} glow={color} symbol={symbol} />
);

const SCORE_KEY = 'mt_ld_m1_scores';

function loadScores() {
  if (typeof localStorage === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}'); }
  catch { return {}; }
}

function actionScore(actionId, scores) {
  const score = scores[actionId];
  if (!score) return { status: 'unplayed', label: 'Score 0/10' };
  const score10 = Math.max(0, Math.min(10, Math.round((score.best / score.total) * 10)));
  return {
    status: score.passed ? 'passed' : 'failed',
    label: `Score ${score10}/10`,
  };
}

const TOPICS = [
  {
    id: 'm1-kenali-nombor',
    pill: 'TOPIK 1.1',
    title: 'Kenali Nombor',
    desc: 'Mula dengan membanding kumpulan, membaca nombor kecil dan menulis nombor.',
    visual: robotFor('10', TOPIC_COLORS[0]),
    color: TOPIC_COLORS[0],
    actions: [
      { id: 'banding-banyak-sedikit', label: 'Banding Banyak Sedikit', icon: 'users' },
      { id: 'kenali-0-10', label: 'Kenali 0 Hingga 10', icon: 'type' },
      { id: 'kenali-11-20', label: 'Kenali 11 Hingga 20', icon: 'type' },
      { id: 'tulis-0-20', label: 'Tulis Nombor 0-20', icon: 'pencil' },
    ],
  },
  {
    id: 'm1-nombor-besar',
    pill: 'TOPIK 1.2',
    title: 'Nombor hingga 100',
    desc: 'Bina nombor besar, faham puluh dan sa, kemudian susun ikut tertib.',
    visual: robotFor('100', TOPIC_COLORS[1]),
    color: TOPIC_COLORS[1],
    actions: [
      { id: 'kenali-21-100', label: 'Kenali 21 Hingga 100', icon: 'calculator' },
      { id: 'nilai-tempat', label: 'Nilai Tempat dan Digit', icon: 'boxes' },
      { id: 'susunan-nombor', label: 'Susunan Nombor', icon: 'move' },
    ],
  },
  {
    id: 'm1-pola-anggar',
    pill: 'TOPIK 1.3',
    title: 'Pola, anggar dan bundar',
    desc: 'Cari corak nombor, buat anggaran dan bundarkan nombor kepada puluh terdekat.',
    visual: robotFor('~', TOPIC_COLORS[2]),
    color: TOPIC_COLORS[2],
    actions: [
      { id: 'pola-nombor', label: 'Sambung Pola Nombor', icon: 'repeat' },
      { id: 'anggar-bundar', label: 'Anggar dan Bundar', icon: 'sparkles' },
    ],
  },
  {
    id: 'm1-kombinasi',
    pill: 'TOPIK 1.4',
    title: 'Kombinasi nombor',
    desc: 'Cari pasangan nombor dan lengkapkan gabungan asas sebelum masuk Modul 2.',
    visual: robotFor('+', TOPIC_COLORS[3]),
    color: TOPIC_COLORS[3],
    actions: [
      { id: 'kombinasi-nombor', label: 'Pasangan Jadi 10', icon: 'link' },
    ],
  },
  {
    id: 'm1-cabaran',
    pill: 'CABARAN',
    title: 'Latihan dan cabaran',
    desc: 'Gunakan semua kemahiran nombor dalam latihan, cerita dan cabaran akhir.',
    visual: robotFor('?', TOPIC_COLORS[4]),
    color: TOPIC_COLORS[4],
    actions: [
      { id: 'selesaikan', label: 'Cerita Nombor', icon: 'book' },
      { id: 'latih-diri', label: 'Latihan Pantas', icon: 'calculator' },
      { id: 'cabar-minda', label: 'Cabaran Nombor', icon: 'trophy' },
    ],
  },
];

export default function NomborHingga100Module({ onSelectTopic, language = 'bm' }) {
  const scores = React.useMemo(loadScores, []);
  const topics = React.useMemo(() => TOPICS.map((topic) => ({
    ...topic,
    actions: topic.actions?.map((action) => ({
      ...action,
      score: actionScore(action.id, scores),
    })),
  })), [scores]);

  return (
    <Tahun1ModuleHubLayout
      moduleNum={1}
      moduleName="Nombor Hingga 100"
      moduleNameEn="Numbers to 100"
      theme={THEME}
      headerVariant="banner"
      layoutVariant="dashboard"
      bareStage
      topics={topics}
      onSelectTopic={onSelectTopic}
      language={language}
      dashboardLead={language === 'bm'
        ? 'Belajar nombor hingga 100 langkah demi langkah sebelum masuk tambah dan tolak.'
        : 'Learn numbers to 100 step by step before addition and subtraction.'}
    />
  );
}
