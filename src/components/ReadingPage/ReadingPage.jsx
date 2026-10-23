import React, { useTransition } from 'react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import { useGameState } from '../../hooks/useGameState';
import LoadingSpinner from '../LoadingSpinner';
import SubjectMenuLayout from '../_shared/SubjectMenuLayout';
import StandardHeroBanner from '../_shared/StandardHeroBanner';
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
  kv: `${import.meta.env.BASE_URL}images/reading/KV_Syllables.webp`,
  kvk: `${import.meta.env.BASE_URL}images/reading/KVK_Syllables.webp`,
  words: `${import.meta.env.BASE_URL}images/reading/Words.webp`,
  sentences: `${import.meta.env.BASE_URL}images/reading/Simple_Sentences.webp`,
  challenge: `${import.meta.env.BASE_URL}images/reading/Reading_Challenge.webp`,
};

export default function ReadingPage({ onBack, language = 'bm', selectedLevel = null, onSelectLevel: setSelectedLevel, ...accountProps }) {
  useBrowserBackHandler(selectedLevel ? () => setSelectedLevel(null) : onBack);
  const [isPending, startTransition] = useTransition();
  const gameState = useGameStateContext();
  const readingChallengeState = useGameState('reading-challenge').gameState;
  const bm = language === 'bm';
  const hasReadingProgress = readingChallengeState.unlockedItems.some(item => item.startsWith('reading-complete-'));

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

  const handleHeroAction = () => {
    playHoverSound();
    startTransition(() => setSelectedLevel(hasReadingProgress ? 5 : 1));
  };

  const levels = [
    { id: 1, title: bm ? 'Belajar Suku Kata KV' : 'Learn KV Syllables', subtitle: bm ? 'Gabungkan dua huruf bersama-sama!' : 'Blend two letters together!', art: 'kv' },
    { id: 2, title: bm ? 'Bina Suku Kata KVK' : 'Build KVK Syllables', subtitle: bm ? 'Bunyikan perkataan tiga huruf!' : 'Sound out three-letter words!', art: 'kvk' },
    { id: 3, title: bm ? 'Baca Perkataan' : 'Read Words', subtitle: bm ? 'Baca perkataan pertama anda!' : 'Read your very first words!', art: 'words' },
    { id: 4, title: bm ? 'Tulis Ayat' : 'Write Sentences', subtitle: bm ? 'Gabungkan perkataan untuk membaca!' : 'Put words together to read!', art: 'sentences' },
    { id: 5, title: bm ? 'Sertai Cabaran Membaca' : 'Take the Challenge', subtitle: bm ? 'Uji kemahiran membaca baharu anda!' : 'Test your new reading skills!', art: 'challenge' },
  ];
  return <div className="rp-layout iman-layout rp-reading-page">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} language={language} gameState={gameState} onBack={onBack} onHome={onBack}
    pending={isPending && <LoadingSpinner overlay />}
    title={bm ? 'Membaca' : 'Reading'}
    heroContent={<StandardHeroBanner
      headingLevel="h2"
      titlePrefix={bm ? 'Jom Belajar ' : "Let's Learn "}
      titleHighlight={bm ? 'Membaca!' : 'To Read!'}
      subtitle={bm ? 'Cantum bunyi, bina perkataan dan kuasai ayat langkah demi langkah.' : 'Blend sounds, build words, and master sentences step-by-step.'}
      ctaText={hasReadingProgress ? (bm ? 'Teruskan Kursus' : 'Continue Course') : (bm ? 'Mula Pelajaran 1' : 'Start Lesson 1')}
      ctaOnClick={handleHeroAction}
      mascotSrc={HERO_ROBOT_ART}
      className="rp-reading-hero"
    />}
    sectionTitle={bm ? 'Pilih Tahap' : 'Choose a Level'}
    sectionDescription={bm ? 'Pilih tahap untuk mula belajar.' : 'Pick a level to start learning.'}
    topicCardVariant="standard"
    topics={levels.map(({ id, title, subtitle, art }) => ({
      id,
      title,
      subtitle,
      iconSrc: LEVEL_ART[art],
      badge: id === 5 ? (bm ? 'TAHAP BONUS' : 'BOSS LEVEL') : null,
      badgeClassName: id === 5 ? 'rp-level-ribbon' : '',
      onMouseEnter: playHoverSound,
    }))}
    onSelect={handleSelectLevel}
  />
  </div>;
}
