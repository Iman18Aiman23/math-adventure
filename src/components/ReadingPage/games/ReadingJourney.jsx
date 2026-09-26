import React, { useEffect, useRef, useState, useTransition } from 'react';
import { Lock, Check, Play } from 'lucide-react';
import { useGameState } from '../../../hooks/useGameState';
import { useBrowserBackHandler } from '../../../hooks/useBrowserBack';
import LoadingSpinner from '../../LoadingSpinner';
import BMHeader from '../../BahasaMelayuPage/_shared/BMHeader';
import ReadingJourneyArt from './ReadingJourneyArt';
import { readingLevels, readingWorlds } from './readingContent';
import './ReadingGame.css';
import './ReadingJourney.css';

const ReadingGame = React.lazy(() => import('./ReadingGame'));
// Temporarily allow every level while the reading games are being reviewed.
const UNLOCK_ALL_FOR_REVIEW = true;

const WORLD_ART = ['sprout', 'star', 'medal', 'diamond', 'trophy'];
const LEVEL_ART = ['abc', 'lock', 'puzzle', 'blocks', 'cards', 'kvk', 'missing', 'shirt', 'blocks', 'book', 'sentence', 'story', 'missing', 'puzzle', 'trophy'];
const DESCRIPTIONS = [
  ['Kenali bunyi suku kata.', 'Recognise syllable sounds.'],
  ['Cari suku kata yang sama.', 'Find the matching syllable.'],
  ['Padankan bunyi dan suku kata.', 'Match sounds to syllables.'],
  ['Gabungkan huruf menjadi suku kata.', 'Build syllables with letters.'],
  ['Padankan KV dengan pantas.', 'Match open syllables fluently.'],
  ['Bina suku kata KVK.', 'Build closed syllables.'],
  ['Lengkapkan huruf yang hilang.', 'Find the missing letter.'],
  ['Kenali perkataan melalui gambar.', 'Match pictures to words.'],
  ['Susun suku kata menjadi perkataan.', 'Build words from syllables.'],
  ['Baca perkataan, cari gambarnya.', 'Read a word and find its picture.'],
  ['Susun perkataan menjadi ayat.', 'Put words into a sentence.'],
  ['Baca ayat dan padankan gambar.', 'Match a sentence to its picture.'],
  ['Pilih perkataan yang sesuai.', 'Choose the word that fits.'],
  ['Baca, lihat dan tentukan jawapan.', 'Read, look and decide.'],
  ['Baca cerita dan fahami maknanya.', 'Read and understand a story.'],
];

export default function ReadingJourney({ onBack, language = 'bm' }) {
  const { gameState } = useGameState('reading-challenge');
  const [level, setLevel] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [pending, startTransition] = useTransition();
  const heading = useRef(null);
  const bm = language === 'bm';
  const completed = id => gameState.unlockedItems.includes(`reading-complete-${id}`);
  const goBack = () => level ? setLevel(null) : onBack();
  useBrowserBackHandler(goBack);
  useEffect(() => {
    if (!level) heading.current?.focus({ preventScroll: true });
    const container = document.querySelector('.view-container');
    if (container) container.scrollTop = 0;
  }, [level]);
  function open(id) {
    if (id < 1 || id > 15 || (!UNLOCK_ALL_FOR_REVIEW && id > 1 && !completed(id - 1))) return;
    startTransition(() => { setAttempt(n => n + 1); setLevel(id); });
  }
  if (level) return <React.Suspense fallback={<LoadingSpinner />}>
    <ReadingGame key={`${level}-${attempt}`} levelId={level} language={language} onBack={goBack}
      onComplete={() => gameState.unlockItem(`reading-complete-${level}`)}
      onReplay={() => setAttempt(n => n + 1)} onNext={() => open(level + 1)} onHome={onBack} />
  </React.Suspense>;
  return <div className="rg-journey rg-journey-clay">
    <BMHeader onBack={onBack} language={language} title={bm ? 'Cabaran Membaca' : 'Reading Challenge'} />
    <div className="rg-journey-wrap">
      <section className="rg-journey-hero" aria-labelledby="reading-journey-title">
        <div className="rg-hero-copy">
        <h1 id="reading-journey-title" ref={heading} tabIndex={-1}><span>{bm ? 'Cabaran' : 'Reading'}</span> <span>{bm ? 'Membaca' : 'Challenge'}</span></h1>
        <p>{bm ? 'Dari bunyi pertama hingga cerita sendiri.' : 'From your first sound to reading a story.'}</p>
        </div>
        <ReadingJourneyArt name="book" className="rg-hero-art" />
      </section>
      <main className="rg-journey-body" aria-label={bm ? 'Dunia membaca' : 'Reading worlds'}>
      {readingWorlds.map(([, title, desc, descEn], i) => <section className={`rg-world rg-world-${i + 1}`} key={title} aria-labelledby={`world-${i}`}>
        <div className="rg-world-heading"><ReadingJourneyArt name={WORLD_ART[i]} className="rg-world-art" /><div><small>{bm ? 'DUNIA' : 'WORLD'} {i + 1}</small><h2 id={`world-${i}`}>{title}</h2><p>{bm ? desc : descEn}</p></div></div>
        <div className="rg-levels">{readingLevels.filter(l => l.world === i + 1).map(l => {
          const done = completed(l.id);
          const locked = !UNLOCK_ALL_FOR_REVIEW && l.id > 1 && !completed(l.id - 1);
          return <button type="button" key={l.id} className={`rg-level ${done ? 'is-done' : ''} ${locked ? 'is-locked' : 'is-available'}`} disabled={locked || pending} onClick={() => open(l.id)}>
            <span className="rg-level-number">{l.id}</span>
            <ReadingJourneyArt name={l.id === 2 && !locked ? 'cards' : LEVEL_ART[l.id - 1]} className="rg-level-art" />
            <strong>{l.title}</strong>
            <span className="rg-level-description">{DESCRIPTIONS[l.id - 1][bm ? 0 : 1]}</span>
            <span className="rg-level-status">{locked ? <Lock size={16} /> : done ? <Check size={19} /> : <Play size={19} fill="currentColor" />} {locked ? (bm ? `Selesaikan tahap ${l.id - 1}` : `Complete level ${l.id - 1}`) : done ? (bm ? 'Main lagi' : 'Play again') : (bm ? 'Mula' : 'Start')}</span>
          </button>;
        })}</div>
      </section>)}
      <p className="rg-journey-progress"><Check size={18} aria-hidden="true" /> {readingLevels.filter(l => completed(l.id)).length}/15 {bm ? 'tahap selesai' : 'levels completed'}</p>
      </main>
    </div>
  </div>;
}
