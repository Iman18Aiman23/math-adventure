import React, { useId, useTransition } from 'react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import LoadingSpinner from '../LoadingSpinner';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import { useBrowserBackHandler } from '../../hooks/useBrowserBack';
import LearnWords from './LearnWords';
import LongSentences from './LongSentences';
const KVLearningPage = React.lazy(() => import('./KVLearningPage'));
const KVKLearningPage = React.lazy(() => import('./KVKLearningPage'));

// Display the exact supplied artwork as SVG viewports, keeping all UI text and controls live.
const REFERENCE_ART = import.meta.env.BASE_URL + 'images/reading/membaca-reference.png';
const ART_BOUNDS = {
  robot: '535 108 448 371',
  kv: '71 579 187 128',
  kvk: '71 749 187 129',
  words: '71 905 187 130',
  sentences: '71 1079 187 131',
  challenge: '72 1250 184 122',
};
function ReadingArt({ name, className = '' }) {
  const clipId = useId();
  const [x, y, width, height] = ART_BOUNDS[name].split(' ');
  return <svg className={className} viewBox={ART_BOUNDS[name]} aria-hidden="true" focusable="false">
    <defs><clipPath id={clipId}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
    <image href={REFERENCE_ART} width="1024" height="1536" clipPath={`url(#${clipId})`} />
  </svg>;
}

export default function ReadingPage({ onBack, language = 'bm', selectedLevel = null, onSelectLevel: setSelectedLevel, ...accountProps }) {
  useBrowserBackHandler(selectedLevel ? () => setSelectedLevel(null) : onBack);
  const [isPending, startTransition] = useTransition();
  const gameState = useGameStateContext();
  const bm = language === 'bm';

  if (selectedLevel === 1) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <KVLearningPage onBack={() => setSelectedLevel(null)} language={language} />
      </React.Suspense>
    );
  }

  // ── Route Tahap 2 → dedicated KVK page ────────────────────────────────
  if (selectedLevel === 2) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <KVKLearningPage onBack={() => setSelectedLevel(null)} language={language} />
      </React.Suspense>
    );
  }

  // ── Route Tahap 3 → dedicated Kata page ────────────────────────────────
  if (selectedLevel === 3) {
    return <LearnWords onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 4 → dedicated Ayat Panjang page ─────────────────────────
  if (selectedLevel === 4) {
    return <LongSentences onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Handler ───────────────────────────────────────────────────────────
  const handleSelectLevel = (level) => {
    playHoverSound();
    startTransition(() => setSelectedLevel(level));
  };

  const levels = [
    [1, bm ? 'Suku Kata (KV)' : 'KV Syllables', bm ? 'Kenali dan baca suku kata mudah seperti ba, ca, da.' : 'Learn simple open syllables such as ba, ca, da.', 'kv'],
    [2, bm ? 'Suku Kata (KVK)' : 'KVK Syllables', bm ? 'Baca suku kata tertutup seperti kan, man, cat.' : 'Read closed syllables such as kan, man, cat.', 'kvk'],
    [3, bm ? 'Perkataan' : 'Words', bm ? 'Baca dan fahami perkataan seharian dengan mudah.' : 'Read and understand everyday words with ease.', 'words'],
    [4, bm ? 'Ayat Mudah' : 'Simple Sentences', bm ? 'Baca dan fahami ayat ringkas dalam kehidupan seharian.' : 'Read and understand sentences from everyday life.', 'sentences'],
    [5, bm ? 'Cabaran Membaca' : 'Reading Challenge', bm ? 'Uji kefahaman anda dengan pelbagai soalan dan naik tahap!' : 'Test your understanding with questions and level up!', 'challenge'],
  ];
  const cardThemes = ['blue', 'red', 'mint', 'purple', 'gold'];
  return <SubjectMenuLayout
    {...accountProps} language={language} gameState={gameState} onBack={onBack} onHome={onBack}
    pending={isPending && <LoadingSpinner overlay />}
    title={bm ? 'Membaca' : 'Reading'}
    eyebrow={bm ? 'MEMBACA' : 'READING'}
    heroTitle={bm ? 'Jom belajar Membaca!' : "Let's learn to read!"}
    description={bm ? 'Dari suku kata ke ayat penuh - satu langkah pada satu masa!' : 'From syllables to full sentences - one step at a time!'}
    encouragement={bm ? 'Baca dengan yakin, dunia lebih menarik!' : 'Read with confidence and discover more.'}
    mascot={<ReadingArt name="robot" />}
    sectionTitle={bm ? 'Pilih Tahap' : 'Choose a Level'}
    sectionDescription={bm ? 'Pilih tahap untuk mula belajar.' : 'Pick a level to start learning.'}
    topics={levels.map(([level, title, description, art]) => ({
      id: level, title, description, theme: cardThemes[level - 1],
      visual: <ReadingArt name={art} />, disabled: level === 5,
      onMouseEnter: level === 5 ? undefined : playHoverSound,
    }))}
    onSelect={handleSelectLevel}
  />;
}
