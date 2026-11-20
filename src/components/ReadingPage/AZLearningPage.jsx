import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SpeechManager from '../../services/SpeechManager';
import { playHoverSound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { PageHeader } from '../_shared/PageHeaderHero';
import './AZLearningPage.css';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const PREMIUM_HUES = [
  { color: '#3B82F6', tint: '#EFF6FF', deep: '#1D4ED8', ink: '#2563EB' },
  { color: '#10B981', tint: '#F0FDF4', deep: '#15803D', ink: '#16A34A' },
  { color: '#EF4444', tint: '#FEF2F2', deep: '#B91C1C', ink: '#DC2626' },
  { color: '#F59E0B', tint: '#FFFBEB', deep: '#B45309', ink: '#D97706' },
  { color: '#8B5CF6', tint: '#FAF5FF', deep: '#6D28D9', ink: '#9333EA' },
];

const WORDS = {
  A: { bm: 'Ayam', en: 'Chicken', bmSentence: 'Ayam bertelur di kandang.', enSentence: 'The chicken lays eggs in the coop.' },
  B: { bm: 'Beruang', en: 'Bear', bmSentence: 'Beruang besar dan berbulu.', enSentence: 'The bear is big and furry.' },
  C: { bm: 'Cicak', en: 'Lizard', bmSentence: 'Cicak di dinding rumah.', enSentence: 'The lizard is on the wall.' },
  D: { bm: 'Domba', en: 'Sheep', bmSentence: 'Domba bertulu halba.', enSentence: 'The sheep has thick wool.' },
  E: { bm: 'Elang', en: 'Eagle', bmSentence: 'Elang terbang tinggi di langit.', enSentence: 'The eagle flies high in the sky.' },
  F: { bm: 'Flamingo', en: 'Flamingo', bmSentence: 'Flamingo berwarna merah jambu.', enSentence: 'The flamingo is pink.' },
  G: { bm: 'Gajah', en: 'Elephant', bmSentence: 'Gajah memiliki trisok.', enSentence: 'The elephant has a trunk.' },
  H: { bm: 'Harimau', en: 'Tiger', bmSentence: 'Harimau bertopang belang.', enSentence: 'The tiger has stripes.' },
  I: { bm: 'Ikan', en: 'Fish', bmSentence: 'Ikan berenang dalam air.', enSentence: 'The fish swims in water.' },
  J: { bm: 'Jerapah', en: 'Giraffe', bmSentence: 'Jerapah lehernya sangat panjang.', enSentence: 'The giraffe has a long neck.' },
  K: { bm: 'Kucing', en: 'Cat', bmSentence: 'Kucing suka mengejar tikus.', enSentence: 'The cat likes to chase mice.' },
  L: { bm: 'Lembu', en: 'Cow', bmSentence: 'Lembu menghasilkan susu.', enSentence: 'The cow produces milk.' },
  M: { bm: 'Monyet', en: 'Monkey', bmSentence: 'Monyet liat di atas pokok.', enSentence: 'The monkey climbs the tree.' },
  N: { bm: 'Nuri', en: 'Parrot', bmSentence: 'Nuri berbisu warna-warni.', enSentence: 'The parrot has colourful feathers.' },
  O: { bm: 'Orang Utan', en: 'Orangutan', bmSentence: 'Orang utan tinggal di hutan.', enSentence: 'The orangutan lives in the forest.' },
  P: { bm: 'Panda', en: 'Panda', bmSentence: 'Panda makan bambu.', enSentence: 'The panda eats bamboo.' },
  Q: { bm: 'Puyuh', en: 'Quail', bmSentence: 'Puyuh bertelur kecil.', enSentence: 'The quail lays small eggs.' },
  R: { bm: 'Rusa', en: 'Deer', bmSentence: 'Rusa bertanduk indah.', enSentence: 'The deer has beautiful antlers.' },
  S: { bm: 'Singa', en: 'Lion', bmSentence: 'Singa adalah raja hutan.', enSentence: 'The lion is the king of the jungle.' },
  T: { bm: 'Tikus', en: 'Mouse', bmSentence: 'Tikus kecil dan ketakutan.', enSentence: 'The mouse is small and timid.' },
  U: { bm: 'Ular', en: 'Snake', bmSentence: 'Ular merayap di tanah.', enSentence: 'The snake crawls on the ground.' },
  V: { bm: 'Vultur', en: 'Vulture', bmSentence: 'Vultur terbang di atas.', enSentence: 'The vulture flies above.' },
  W: { bm: 'Walrus', en: 'Walrus', bmSentence: 'Walrus gadingnya panjang.', enSentence: 'The walrus has long tusks.' },
  X: { bm: 'Xenopus', en: 'Frog', bmSentence: 'Xenopus adalah katak.', enSentence: 'Xenopus is a frog.' },
  Y: { bm: 'Yak', en: 'Yak', bmSentence: 'Yak bulunya tebal.', enSentence: 'The yak has thick fur.' },
  Z: { bm: 'Zebra', en: 'Zebra', bmSentence: 'Zebra bertopang belang hitam putih.', enSentence: 'The zebra has black and white stripes.' },
};

const PALETTE = Object.fromEntries(
  ALPHABET.map((letter, i) => [letter, PREMIUM_HUES[i % PREMIUM_HUES.length]])
);

const EMOJI = {
  A: '🐔', B: '🐻', C: '🦎', D: '🐑', E: '🦅', F: '🦩',
  G: '🐘', H: '🐯', I: '🐟', J: '🦒', K: '🐱', L: '🐮',
  M: '🐵', N: '🦜', O: '🦧', P: '🐼', Q: '🐦', R: '🦌',
  S: '🦁', T: '🐭', U: '🐍', V: '🦅', W: '🦭', X: '🐸',
  Y: '🐃', Z: '🦓',
};

function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 9v6h4l5 4V5L7 9H3Z" fill="currentColor" />
      <path d="M15 9a4 4 0 0 1 0 6M17.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" />
    </svg>
  );
}

export default function AZLearningPage({ onBack, language = 'bm', ...accountProps }) {
  const bm = language === 'bm';
  const uiLang = bm ? 'ms-MY' : 'en-US';
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [flipDirection, setFlipDirection] = useState(null);
  const [seriesComplete, setSeriesComplete] = useState(false);

  const currentWord = WORDS[selectedLetter] ?? null;
  const currentLetterIdx = ALPHABET.indexOf(selectedLetter);
  const hasPrev = currentLetterIdx > 0;
  const hasNext = currentLetterIdx < ALPHABET.length - 1;

  const speakText = useCallback((text) => {
    if (text) SpeechManager.speak(text, uiLang);
  }, [uiLang]);

  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setFlipDirection(null);
    setSeriesComplete(false);
  };

  const handleNext = () => {
    if (!hasNext) {
      setSeriesComplete(true);
      return;
    }
    setFlipDirection('next');
    setSelectedLetter(ALPHABET[currentLetterIdx + 1]);
  };

  const handlePrev = () => {
    if (!hasPrev) return;
    setFlipDirection('previous');
    setSelectedLetter(ALPHABET[currentLetterIdx - 1]);
  };

  const handleBackToPicker = () => {
    setSelectedLetter(null);
    setSeriesComplete(false);
    setFlipDirection(null);
  };

  useEffect(() => {
    if (!selectedLetter) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleBackToPicker();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedLetter]);

  useEffect(() => {
    if (!seriesComplete) return;
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    playHoverSound();
  }, [seriesComplete]);

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
  const mainWord = cap(bm ? currentWord?.bm : currentWord?.en);
  const transWord = (bm ? currentWord?.en : currentWord?.bm)?.toLowerCase();
  const mainSentence = bm ? currentWord?.bmSentence : currentWord?.enSentence;

  const flashcard = (
    <article
      className={`az-flashcard${flipDirection ? ` az-flashcard--flip-${flipDirection}` : ''}`}
      aria-label={mainWord}
    >
      <div className="az-flashcard-body">
        <div className="az-letter-card-icon">
          <span className="az-card-emoji">{EMOJI[selectedLetter]}</span>
        </div>
        <div className="az-letters-display">
          {selectedLetter}
          <small>{selectedLetter?.toLowerCase()}</small>
        </div>
        <div className="az-word-card">
          <span className="az-word-main">{mainWord}</span>
          <span className="az-word-translation">({transWord})</span>
          <button type="button" className="az-audio-button" onClick={() => speakText(mainWord)} aria-label={bm ? `Dengar ${mainWord}` : `Listen to ${mainWord}`}>
            <SpeakerIcon />
          </button>
        </div>
        {mainSentence && (
          <div className="az-sentence-example">
            <span className="az-sentence-label">{bm ? 'Contoh ayat' : 'Example sentence'}</span>
            <span className="az-sentence-text">{mainSentence}</span>
          </div>
        )}
      </div>
      <nav className="az-nav" aria-label={bm ? 'Navigasi huruf' : 'Letter navigation'}>
        <button type="button" className="az-prev" onClick={handlePrev} disabled={!hasPrev} aria-label={bm ? 'Sebelumnya' : 'Previous'}>
          <ChevronLeft size={20} aria-hidden="true" />
          <span>{bm ? 'Sebelum' : 'Prev'}</span>
        </button>
        <button type="button" className="az-next" onClick={handleNext} aria-label={bm ? 'Seterusnya' : 'Next'}>
          <span>{bm ? 'Seterusnya' : 'Next'}</span>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </nav>
    </article>
  );

  return (
    <main className="mh-screen page-layout-root az-learning az-picker iman-layout" aria-label={bm ? 'Belajar Huruf' : 'Learn Alphabet'}>
      <div className="mh-wrap page-container az-picker-wrap">
        {!selectedLetter && (
          <PageHeader
            {...accountProps}
            onBack={onBack}
            language={bm ? 'bm' : 'en'}
            backOnly
            showProgress={false}
          />
        )}
        <div className="az-picker-body">
          <div className="az-picker-intro">
            <div>
              <span className="az-picker-eyebrow">{bm ? 'Huruf Abjad' : 'Alphabet A–Z'}</span>
              <h1>{bm ? 'Pilih Huruf' : 'Choose a Letter'}</h1>
              <p>{bm ? 'Ketik huruf untuk belajar bunyi dan perkataan.' : 'Tap a letter to learn its sound and words.'}</p>
            </div>
            <span className="az-picker-count">{ALPHABET.length} {bm ? 'huruf' : 'letters'}</span>
          </div>
          <div className="az-picker-grid">
            {ALPHABET.map((letter, index) => {
              const p = PALETTE[letter];
              return (
                <button
                  key={letter}
                  type="button"
                  className="az-letter-tile"
                  onMouseEnter={playHoverSound}
                  onClick={() => handleSelectLetter(letter)}
                  style={{
                    '--tile-surface': p.tint,
                    '--tile-border': p.color,
                    '--tile-border-hover': p.color,
                    '--tile-ink': p.ink,
                    animationDelay: `${0.04 + index * 0.02}s`,
                  }}
                >
                  <span className="az-tile-letter">{letter}<small>{letter.toLowerCase()}</small></span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedLetter && (
        <div
          className="az-modal-overlay"
          role="presentation"
          onClick={(event) => { if (event.target === event.currentTarget) handleBackToPicker(); }}
        >
          <div className="az-modal-content" role="dialog" aria-modal="true" aria-label={mainWord || 'Alphabet'}>
            <div className="az-modal-bar">
              <button type="button" className="az-modal-close" onClick={handleBackToPicker} aria-label={bm ? 'Tutup' : 'Close'}>
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <div className="az-modal-body">
              <main className="az-learning-body">{flashcard}</main>
            </div>
          </div>
        </div>
      )}

      {seriesComplete && (
        <div className="az-completion" role="dialog" aria-modal="true" aria-label={bm ? 'Tamat' : 'Complete'}>
          <div className="az-completion-copy">
            <div className="az-completion-art" aria-hidden="true">🎉</div>
            <h2>{bm ? 'Syabas!' : 'Well done!'}</h2>
            <p>{bm ? 'Anda telah belajar semua huruf A–Z.' : 'You have learned all letters A–Z.'}</p>
            <button type="button" className="az-completion-return" onClick={handleBackToPicker}>
              {bm ? 'Mula Lagi' : 'Start Again'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
