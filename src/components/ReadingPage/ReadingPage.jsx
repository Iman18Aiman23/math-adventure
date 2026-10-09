import React, { useTransition } from 'react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import LoadingSpinner from '../LoadingSpinner';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import { HomePageLayoutStyles } from '../HomePage';
import { useBrowserBackHandler } from '../../hooks/useBrowserBack';
import LearnWords from './LearnWords';
import LongSentences from './LongSentences';
import './ReadingPage.css';
const KVLearningPage = React.lazy(() => import('./KVLearningPage'));
const KVKLearningPage = React.lazy(() => import('./KVKLearningPage'));
const ReadingJourney = React.lazy(() => import('./games/ReadingJourney'));

const HERO_ROBOT_ART = import.meta.env.BASE_URL + 'images/reading/HeroRobotIcon.webp';
const LEVEL_ART = {
  kv: 'SukuKata KV.webp',
  kvk: 'SukuKata KVK.webp',
  words: 'Ayat Pendek.webp',
  sentences: 'Ayat Panjang.webp',
  challenge: 'Trophy.webp',
};
function ReadingArt({ name }) {
  return <img src={`${import.meta.env.BASE_URL}images/reading/${encodeURIComponent(LEVEL_ART[name])}`} alt="" />;
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
  if (selectedLevel === 5) {
    return <React.Suspense fallback={<LoadingSpinner />}>
      <ReadingJourney onBack={() => setSelectedLevel(null)} language={language} />
    </React.Suspense>;
  }

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
  return <div className="rp-layout iman-layout">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} language={language} gameState={gameState} onBack={onBack} onHome={onBack}
    pending={isPending && <LoadingSpinner overlay />}
    title={bm ? 'Membaca' : 'Reading'}
    eyebrow={bm ? 'MEMBACA' : 'READING'}
    heroTitle={bm ? 'Jom belajar Membaca!' : "Let's learn to read!"}
    description={bm ? 'Dari suku kata ke ayat penuh - satu langkah pada satu masa!' : 'From syllables to full sentences - one step at a time!'}
    encouragement={bm ? 'Baca dengan yakin, dunia lebih menarik!' : 'Read with confidence and discover more.'}
    mascot={<img className="rp-hero-robot" src={HERO_ROBOT_ART} width="424" height="370" alt="" />}
    sectionTitle={bm ? 'Pilih Tahap' : 'Choose a Level'}
    sectionDescription={bm ? 'Pilih tahap untuk mula belajar.' : 'Pick a level to start learning.'}
    topics={levels.map(([level, title, description, art]) => ({
      id: level, title, description, theme: cardThemes[level - 1],
      visual: <ReadingArt name={art} />,
      onMouseEnter: playHoverSound,
    }))}
    onSelect={handleSelectLevel}
  />
  </div>;
}
