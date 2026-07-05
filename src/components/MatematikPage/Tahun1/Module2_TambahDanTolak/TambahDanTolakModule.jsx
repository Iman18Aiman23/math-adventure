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

const robot = (symbol, badge, glow) => <MatematikTopicRobot theme={THEME} symbol={symbol} badge={badge} glow={glow || badge} />;
const drill = (id) => `m2-drill-${id}`;
const SCORE_KEY = 'mt_ld_m2_scores';

function loadScores() {
  if (typeof localStorage === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(SCORE_KEY) || '{}'); }
  catch { return {}; }
}

function actionScore(actionId, scores) {
  const typeId = actionId.replace('m2-drill-', '');
  const score = scores[typeId];
  if (!score) return { status: 'unplayed', label: 'Score 0/10' };
  const score10 = Math.max(0, Math.min(10, Math.round((score.best / score.total) * 10)));
  const status = score.passed ? 'passed' : 'failed';
  return {
    status,
    label: `Score ${score10}/10`,
  };
}

const TOPICS = [
  {
    id: 'm2-kenali-tambah',
    pill: 'TOPIK 2.1',
    title: 'Kenali Tambah',
    desc: 'Fahami maksud tambah melalui kumpulan, garis nombor dan ayat mudah.',
    visual: robot('+', '#FBBF24'),
    color: '#FBBF24',
    actions: [
      { id: drill('kt-gabung'), label: 'Gabung Kumpulan', icon: 'users' },
      { id: drill('kt-garis'), label: 'Garis Nombor', icon: 'move' },
      { id: drill('kt-perkataan'), label: 'Pilih Perkataan', icon: 'type' },
      { id: drill('kt-ayat'), label: 'Lengkapkan Ayat', icon: 'pencil' },
    ],
  },
  {
    id: 'm2-latihan-tambah',
    pill: 'TOPIK 2.2',
    title: 'Latihan Tambah',
    desc: 'Kira tambah daripada fakta asas hingga soalan bentuk lazim.',
    visual: robot('+', '#22C55E'),
    color: '#22C55E',
    actions: [
      { id: drill('lt-mudah-m1'), label: 'Mudah Tambah', icon: 'calculator' },
      { id: drill('lt-warnai'), label: 'Warnai Tambah', icon: 'palette' },
      { id: drill('lt-padankan'), label: 'Padankan Tambah', icon: 'puzzle' },
      { id: drill('lt-bond'), label: 'Ikatan Nombor', icon: 'link' },
      { id: drill('lt-abacus'), label: 'Bina Blok', icon: 'boxes' },
      { id: drill('lt-sederhana-s1'), label: 'Tambah Tanpa Kumpul', icon: 'calculator' },
      { id: drill('lt-sukar-k1'), label: 'Tambah Dengan Kumpul', icon: 'calculator' },
    ],
  },
  {
    id: 'm2-kenali-tolak',
    pill: 'TOPIK 2.3',
    title: 'Kenali Tolak',
    desc: 'Fahami tolak sebagai buang, undur, baki dan beza.',
    visual: robot('-', '#F97316'),
    color: '#F97316',
    actions: [
      { id: drill('kt-buang'), label: 'Buang Kumpulan', icon: 'minus' },
      { id: drill('kt-garis-sub'), label: 'Garis Nombor', icon: 'move' },
      { id: drill('kt-perkataan-tolak'), label: 'Pilih Perkataan', icon: 'type' },
      { id: drill('kt-ayat-tolak'), label: 'Lengkapkan Ayat', icon: 'pencil' },
    ],
  },
  {
    id: 'm2-latihan-tolak',
    pill: 'TOPIK 2.4',
    title: 'Latihan Tolak',
    desc: 'Kira tolak daripada fakta asas hingga soalan bentuk lazim.',
    visual: robot('-', '#8B5CF6'),
    color: '#8B5CF6',
    actions: [
      { id: drill('lt-tolak-mudah-m1'), label: 'Mudah Tolak', icon: 'calculator' },
      { id: drill('lt-tolak-warnai'), label: 'Warnai Tolak', icon: 'palette' },
      { id: drill('lt-tolak-padankan'), label: 'Padankan Tolak', icon: 'puzzle' },
      { id: drill('lt-tolak-bond'), label: 'Ikatan Nombor', icon: 'link' },
      { id: drill('lt-tolak-blok'), label: 'Bina Blok', icon: 'boxes' },
      { id: drill('lt-tolak-sederhana-s1'), label: 'Tolak Tanpa Pinjam', icon: 'minus' },
      { id: drill('lt-tolak-sukar-k1'), label: 'Tolak Dengan Pinjam', icon: 'minus' },
    ],
  },
  {
    id: 'm2-cerita',
    pill: 'TOPIK 2.5',
    title: 'Cerita Tambah Tolak',
    desc: 'Baca cerita nombor dan pilih kiraan yang sesuai.',
    visual: robot('+-', '#0EA5E9'),
    color: '#0EA5E9',
    actions: [
      { id: drill('ctt-tambah'), label: 'Cerita Tambah', icon: 'book' },
      { id: drill('ctt-tolak'), label: 'Cerita Tolak', icon: 'book' },
      { id: drill('ctt-operasi'), label: 'Pilih Operasi', icon: 'sparkles' },
      { id: drill('ctt-ayat'), label: 'Ayat Matematik', icon: 'pencil' },
    ],
  },
  {
    id: 'm2-berulang',
    pill: 'TOPIK 2.6',
    title: 'Tambah Tolak Berulang',
    desc: 'Latih kira berulang dengan kumpulan dan garis nombor.',
    color: '#14B8A6',
    visual: robot('↻', '#14B8A6'),
    actions: [
      { id: drill('tb-add-groups'), label: 'Kira Kumpulan', icon: 'users' },
      { id: drill('tb-add-line'), label: 'Garis Tambah', icon: 'move' },
      { id: drill('tb-add-complete'), label: 'Lengkapkan Ayat', icon: 'pencil' },
      { id: drill('tb-sub-groups'), label: 'Tolak Berturut', icon: 'repeat' },
      { id: drill('tb-sub-line'), label: 'Garis Tolak', icon: 'move' },
    ],
  },
  {
    id: 'm2-selesaikan',
    pill: 'CABARAN',
    title: 'Selesaikan Cerita',
    desc: 'Selesaikan enam soalan cerita pada roda nombor.',
    visual: robot('?', '#F59E0B'),
    color: '#F59E0B',
    icon: 'trophy',
  },
  {
    id: 'm2-cabar-minda',
    pill: 'CABARAN',
    title: 'Cabaran Campur',
    desc: 'Uji semua kemahiran tambah dan tolak dalam satu cabaran.',
    color: '#A855F7',
    visual: robot('★', '#A855F7'),
    icon: 'sparkles',
  },
];

export default function TambahDanTolakModule({ onSelectTopic, language = 'bm' }) {
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
      moduleNum={2}
      moduleName="Tambah dan Tolak"
      moduleNameEn="Addition & Subtraction"
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
