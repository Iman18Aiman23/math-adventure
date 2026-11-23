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
const AZLearningPage = React.lazy(() => import('./AZLearningPage'));
const KVLearningPage = React.lazy(() => import('./KVLearningPage'));
const KVKLearningPage = React.lazy(() => import('./KVKLearningPage'));
const ShortStoryPage = React.lazy(() => import('./ShortStoryPage'));
const ReadingJourney = React.lazy(() => import('./games/ReadingJourney'));

const HERO_ROBOT_ART = import.meta.env.BASE_URL + 'images/reading/HeroRobotIcon.webp';
const LEVEL_ART = {
  kv: `${import.meta.env.BASE_URL}images/reading/KV_Syllables.webp`,
  kvk: `${import.meta.env.BASE_URL}images/reading/KVK_Syllables.webp`,
  words: `${import.meta.env.BASE_URL}images/reading/Words.webp`,
  sentences: `${import.meta.env.BASE_URL}images/reading/Simple_Sentences.webp`,
  challenge: `${import.meta.env.BASE_URL}images/reading/Reading_Challenge.webp`,
  story: `${import.meta.env.BASE_URL}images/reading/short_story.webp`,
};

const ALPHABET_ICON_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="6" fill="#F59E0B"/><path d="M7 9l2.4 4.6 3.2-2.6 2.2 4.2" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" opacity=".92"/><circle cx="11" cy="10.6" r="1.4" fill="#FFFFFF" opacity=".9"/><circle cx="15" cy="12.4" r="1.4" fill="#FFFFFF" opacity=".9"/></svg>`;
const ALPHABET_ICON = `data:image/svg+xml;utf8,${encodeURIComponent(ALPHABET_ICON_SVG)}`;

export default function ReadingPage({ onBack, language = 'bm', selectedLevel = null, onSelectLevel: setSelectedLevel, onSelectTopic, ...accountProps }) {
  useBrowserBackHandler(selectedLevel ? () => setSelectedLevel(null) : onBack);
  const [isPending, startTransition] = useTransition();
  const gameState = useGameStateContext();
  const readingChallengeState = useGameState('reading-challenge').gameState;
  const bm = language === 'bm';
  const hasReadingProgress = readingChallengeState.unlockedItems.some(item => item.startsWith('reading-complete-'));

  // ── Route Tahap 0 → Abjad A–Z ───────────────────────────────────────────
  if (selectedLevel === 0) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <AZLearningPage {...accountProps} onBack={() => setSelectedLevel(null)} language={language} onSelectTopic={onSelectTopic} />
      </React.Suspense>
    );
  }

  if (selectedLevel === 1) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <KVLearningPage {...accountProps} onBack={() => setSelectedLevel(null)} language={language} />
      </React.Suspense>
    );
  }

  // ── Route Tahap 2 → dedicated KVK page ────────────────────────────────
  if (selectedLevel === 2) {
    return (
      <React.Suspense fallback={<LoadingSpinner />}>
        <KVKLearningPage {...accountProps} onBack={() => setSelectedLevel(null)} language={language} />
      </React.Suspense>
    );
  }

  // ── Route Tahap 3 → dedicated Kata page ────────────────────────────────
  if (selectedLevel === 3) {
    return <LearnWords {...accountProps} onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 4 → dedicated Ayat Panjang page ─────────────────────────
  if (selectedLevel === 4) {
    return <LongSentences {...accountProps} onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Handler ───────────────────────────────────────────────────────────
  if (selectedLevel === 5) {
    return <React.Suspense fallback={<LoadingSpinner />}>
      <ReadingJourney onBack={() => setSelectedLevel(null)} language={language} />
    </React.Suspense>;
  }

  if (selectedLevel === 6) {
    return <React.Suspense fallback={<LoadingSpinner />}>
      <ShortStoryPage {...accountProps} onBack={() => setSelectedLevel(null)} language={language} />
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
    { id: 0, title: bm ? 'Huruf Abjad A–Z' : 'Alphabet A–Z', subtitle: bm ? 'Kenali bunyi dan perkataan setiap huruf.' : 'Learn the sound and words for every letter.', iconSrc: ALPHABET_ICON },
    { id: 1, title: bm ? 'Belajar Suku Kata KV' : 'Learn KV Syllables', subtitle: bm ? 'Gabungkan dua huruf bersama-sama!' : 'Blend two letters together!', iconSrc: LEVEL_ART.kv },
    { id: 2, title: bm ? 'Bina Suku Kata KVK' : 'Build KVK Syllables', subtitle: bm ? 'Bunyikan perkataan tiga huruf!' : 'Sound out three-letter words!', iconSrc: LEVEL_ART.kvk },
    { id: 3, title: bm ? 'Baca Perkataan' : 'Read Words', subtitle: bm ? 'Baca perkataan pertama anda!' : 'Read your very first words!', iconSrc: LEVEL_ART.words },
    { id: 4, title: bm ? 'Tulis Ayat' : 'Write Sentences', subtitle: bm ? 'Gabungkan perkataan untuk membaca!' : 'Put words together to read!', iconSrc: LEVEL_ART.sentences },
    { id: 6, title: bm ? 'Cerita Pendek' : 'Short Story', subtitle: bm ? 'Membaca dan faham cerita' : 'Read and understand a story', iconSrc: LEVEL_ART.story },
    { id: 5, title: bm ? 'Sertai Cabaran Membaca' : 'Take the Challenge', subtitle: bm ? 'Uji kemahiran membaca baharu anda!' : 'Test your new reading skills!', iconSrc: LEVEL_ART.challenge },
  ];
  return <div className="rp-layout iman-layout rp-reading-page">
    <HomePageLayoutStyles />
    <SubjectMenuLayout
    sharedPageChrome
    {...accountProps} language={language} gameState={gameState} onBack={onBack} onHome={onBack}
    pending={isPending && <LoadingSpinner overlay />}
    title={bm ? 'Membaca' : 'Reading'}
    heroTheme="reading-nature"
    heroContent={<StandardHeroBanner
      headingLevel="h2"
      titlePrefix={bm ? 'Jom Belajar ' : "Let's Learn "}
      titleHighlight={bm ? 'Membaca!' : 'To Read!'}
      subtitle={bm ? 'Cantum bunyi, bina perkataan dan kuasai ayat langkah demi langkah.' : 'Blend sounds, build words, and master sentences step-by-step.'}
      ctaText={hasReadingProgress ? (bm ? 'Teruskan Kursus' : 'Continue Course') : (bm ? 'Mula Pelajaran 1' : 'Start Lesson 1')}
      ctaOnClick={handleHeroAction}
      mascotSrc={HERO_ROBOT_ART}
      className="rp-reading-hero blue-gradient-hero"
    />}
    sectionTitle={bm ? 'Pilih Topik' : 'Choose a Topic'}
    topicCardVariant="standard"
    topics={levels.map(({ id, title, subtitle, iconSrc }) => ({
      id,
      title,
      subtitle,
      iconSrc,
      badge: id === 5 ? (bm ? 'TAHAP BONUS' : 'BOSS LEVEL') : null,
      badgeClassName: id === 5 ? 'rp-level-ribbon' : '',
      onMouseEnter: playHoverSound,
    }))}
    onSelect={handleSelectLevel}
  />
  </div>;
}
