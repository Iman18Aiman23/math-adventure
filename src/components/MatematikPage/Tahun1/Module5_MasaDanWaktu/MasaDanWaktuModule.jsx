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
const SCORE_KEY = 'mt_ld_m5_scores';

function loadScores() {
  if (typeof localStorage === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}'); }
  catch { return {}; }
}

function actionScore(actionId, scores) {
  const total = actionId === 'latih-diri-masa' ? 15 : actionId === 'cabar-minda-masa' ? 30 : 10;
  const score = scores[actionId];
  if (!score) return { status: 'unplayed', label: `Score 0/${total}` };
  const best = Math.max(0, Math.min(total, score.best || 0));
  return {
    status: score.passed ? 'passed' : 'failed',
    label: `Score ${best}/${total}`,
  };
}

const TOPICS = [
  {
    id: 'm5-bulan-hari-masa',
    pill: 'TOPIK 5.1',
    title: 'Mengenali Masa dan Waktu',
    desc: 'Kenali nama bulan, urutan hari dan baca masa pada jam.',
    visual: ROBOT,
    color: THEME.accent,
    actions: [
      { id: 'mengenali-bulan', label: 'Mengenali Bulan', icon: 'type' },
      { id: 'mengenali-hari', label: 'Mengenali Hari', icon: 'repeat' },
      { id: 'mengenali-masa', label: 'Mengenali Masa', icon: 'calculator' },
    ],
  },
  {
    id: 'selesaikan-masa',
    pill: 'SELESAIKAN',
    title: 'Selesaikan',
    desc: 'Selesaikan latihan masa dan waktu.',
    visual: ROBOT,
    color: THEME.accent,
    actions: [
      { id: 'selesaikan-masa', label: 'Hari', icon: 'calculator' },
      { id: 'selesaikan-waktu', label: 'Waktu', icon: 'calculator' },
      { id: 'selesaikan-bulan', label: 'Bulan', icon: 'calculator' },
    ],
  },
  {
    id: 'latih-diri-masa',
    pill: 'LATIH DIRI',
    title: 'Latih Tubi',
    desc: 'Latihan pantas jam, hari dan bulan.',
    visual: ROBOT,
    color: THEME.accent,
  },
  {
    id: 'cabar-minda-masa',
    pill: 'UJIAN',
    title: 'Ujian',
    desc: '30 soalan daripada Mengenali dan Selesaikan.',
    visual: ROBOT,
    color: THEME.accent,
  },
];

export default function MasaDanWaktuModule({ onSelectTopic, language = 'bm' }) {
  const scores = React.useMemo(loadScores, []);
  const topics = React.useMemo(() => TOPICS.map((topic) => ({
    ...topic,
    actions: topic.actions?.map((action) => ({
      ...action,
      score: action.disabled ? undefined : actionScore(action.id, scores),
    })),
  })), [scores]);

  return (
    <Tahun1ModuleHubLayout
      moduleNum={5}
      moduleName="Masa dan Waktu"
      moduleNameEn="Time"
      theme={THEME}
      headerVariant="banner"
      layoutVariant="dashboard"
      bareStage
      topics={topics}
      onSelectTopic={onSelectTopic}
      language={language}
    />
  );
}
